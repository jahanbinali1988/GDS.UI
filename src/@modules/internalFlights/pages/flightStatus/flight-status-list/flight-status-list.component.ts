import { Component, ViewEncapsulation } from '@angular/core';
import { NotifierService } from 'angular-notifier';
import { FlightStatus } from 'internalFlightsModels/ViewModel/FlightStatus';
import { GridDataResult, DataStateChangeEvent } from '@progress/kendo-angular-grid';
import { State, process } from '@progress/kendo-data-query';
import { OperationStatus } from 'app/common/models/Base/OperationStatus';
import { FlightStatusService } from 'internalFlightsServices/flightStatus/flight-status.service';

@Component({
  selector: 'app-flight-status-list',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './flight-status-list.component.html',
  styleUrls: ['./flight-status-list.component.scss']
})
export class FlightStatusListComponent {

  flightStatuses: FlightStatus[] = [];
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

  constructor(private flightStatusService: FlightStatusService, private notifier: NotifierService) {
      this.flightStatusService.GetAll(this.gridState).subscribe(response => {
            this.flightStatuses = response.Data.Data;
            this.gridData = process(this.flightStatuses, this.gridState);
      });
   }

  public dataStateChange(newgridState: DataStateChangeEvent): void {
    this.flightStatuses.length = 0;
      this.gridState = newgridState;
      this.flightStatusService.GetAll(this.gridState).subscribe(response => {
        this.flightStatuses = response.Data.Data;
        this.gridData = process(this.flightStatuses, this.gridState);
    });
  }

  public AllowReservation(id) {
      this.flightStatusService.AllowReservation(id).subscribe( response => {
          const result: OperationStatus = response;
          if (result.Status === true) {
              this.gridData.data.find(f => {
                  if (f.Id === id) {
                      f.AllowReservation = !f.AllowReservation;
                  }
                  return null;
              });
              this.notifier.notify( 'success',  result.Message );
          } else {
            this.notifier.notify( 'warning',  result.Message );
          }
      });
  }

  public Remove(id) {
    this.flightStatusService.Remove(id).subscribe( response => {
        const result: OperationStatus = response;
        if (result.Status === true) {
          const index = this.gridData.data.findIndex(finder => {
              if (finder.Id === id) {
                  return finder;
              }
          });
          if (index > -1) {
              this.gridData.data.splice(index, 1);
          }
          this.notifier.notify( 'success',  result.Message );
        } else {
          this.notifier.notify( 'warning',  result.Message );
        }
    });
}
}
