import { Component, ViewEncapsulation } from '@angular/core';
import { NotifierService } from 'angular-notifier';
import { Aircraft } from 'internalFlightsModels/ViewModel/Aircraft';
import { GridDataResult, DataStateChangeEvent } from '@progress/kendo-angular-grid';
import { State, process } from '@progress/kendo-data-query';
import { AircraftService } from 'internalFlightsServices/aircraft/aircraft.service';
import { OperationStatus } from 'app/common/models/Base/OperationStatus';

@Component({
  selector: 'app-aircraft-list',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './aircraft-list.component.html',
  styleUrls: ['./aircraft-list.component.scss']
})
export class AircraftListComponent {
  aircrafts: Aircraft[] = [];
  public gridData: GridDataResult;
  public gridState: State = {
      skip: 0,
      take: 10,
      sort: null,
      // Initial filter descriptor
      filter: {
        logic: 'and',
        filters: [{ field: 'name', operator: 'contains', value: '' }]
      }
  };

  constructor(private aircraftService: AircraftService, private notifier: NotifierService) {
      this.aircraftService.GetAll(this.gridState).subscribe(response => {
            this.aircrafts = response.Data.Data;
            this.gridData = process(this.aircrafts, this.gridState);
      });
   }

  public dataStateChange(newGridState: DataStateChangeEvent): void {
      this.gridState = newGridState;
      this.aircrafts.length = 0;
      this.aircraftService.GetAll(this.gridState).subscribe(response => {
        this.aircrafts = response.Data.Data;
        this.gridData = process(this.aircrafts, this.gridState);
    });
  }

  public Remove(id) {
      this.aircraftService.Remove(id).subscribe( response => {
          const result: OperationStatus = response;
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
      this.aircraftService.Disable(id).subscribe( response => {
          const result: OperationStatus = response;
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
