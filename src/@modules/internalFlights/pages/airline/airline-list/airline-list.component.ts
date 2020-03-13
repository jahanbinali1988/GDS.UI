import { Component, ViewEncapsulation } from '@angular/core';
import { Airline } from 'internalFlightsModels/ViewModel/Airline';
import { GridDataResult, DataStateChangeEvent } from '@progress/kendo-angular-grid';
import { process, State } from '@progress/kendo-data-query';
import { NotifierService } from 'angular-notifier';
import { AirlineService } from 'internalFlightsServices/airline/airline.service';

@Component({
  selector: 'app-airline-list',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './airline-list.component.html',
  styleUrls: ['./airline-list.component.scss']
})
export class AirlineListComponent {
  airlines: Airline[] = [];
  public gridData: GridDataResult;
  public gridState: State = {
      skip: 0,
      take: 10,
      // Initial filter descriptor
      filter: {
        logic: 'and',
        filters: [{ field: 'name', operator: 'contains', value: '' }]
      }
  };

  constructor(private airlineService: AirlineService, private notifier: NotifierService) {
      this.airlineService.GetAll(this.gridState).subscribe(response => {
            this.airlines = response.Data.Data;
            this.gridData = process(this.airlines, this.gridState);
      });
   }

  public dataStateChange(newGridState: DataStateChangeEvent): void {
      this.gridState = newGridState;
      this.airlines.length = 0;
      this.airlineService.GetAll(this.gridState).subscribe(response => {
        this.airlines = response.Data.Data;
        this.gridData = process(this.airlines, this.gridState);
    });
  }

  public Remove(id) {
      this.airlineService.Remove(id).subscribe( response => {
          const result: any = response;
          if (result.Status === true) {
              this.gridData.data.find(f => {
                  if (f.Id === id) {
                      f.IsDeleted = !f.IsDeleted;
                  }
                  return null;
              });
              this.notifier.notify( 'success',  result.Message );
          } else {
            this.notifier.notify( 'warning',  result.Message );
          }
      });
  }

  public Disable(id) {
      this.airlineService.Disable(id).subscribe( response => {
          const result: any = response;
          if (result.Status === true) {
              this.gridData.data.find(f => {
                  if (f.Id === id) {
                      f.IsDisabled = !f.IsDisabled;
                  }
                  return null;
              });
              this.notifier.notify( 'success',  result.Message );
          } else {
            this.notifier.notify( 'warning',  result.Message );
          }
      });
  }
}
