import { Component, ViewEncapsulation } from '@angular/core';
import { State, process } from '@progress/kendo-data-query';
import { GridDataResult, DataStateChangeEvent } from '@progress/kendo-angular-grid';
import { FlightsSchedule } from 'internalFlightsModels/ViewModel/FlightsSchedule';
import { NotifierService } from 'angular-notifier';
import { FlightScheduleService } from 'internalFlightsServices/flightsSchedule/flight-schedule.service';
import { ActivatedRoute } from '@angular/router';
import { OperationStatus } from 'app/common/models/Base/OperationStatus';

@Component({
  selector: 'app-flight-schedule-list',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './flight-schedule-list.component.html',
  styleUrls: ['./flight-schedule-list.component.scss']
})
export class FlightScheduleListComponent {
  airlineRouteId: number;
  flightsSchedules: FlightsSchedule[] = [];
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

  constructor(private flightScheduleService: FlightScheduleService, private route: ActivatedRoute, private notifier: NotifierService) {
        this.route.paramMap.subscribe(params => {
        this.airlineRouteId = +params.get('airlineRouteId');
        if (this.airlineRouteId > 0) {
            this.flightScheduleService.GetAll(this.gridState, this.airlineRouteId).subscribe(response => {
                    this.flightsSchedules = response.Data.Data;
                    this.gridData = process(this.flightsSchedules, this.gridState);
            });
        }
        });
   }

  public dataStateChange(newGridState: DataStateChangeEvent): void {
      this.gridState = newGridState;
      this.flightsSchedules.length = 0;
      this.flightScheduleService.GetAll(this.gridState, this.airlineRouteId).subscribe(response => {
        this.flightsSchedules = response.Data.Data;
        this.gridData = process(this.flightsSchedules, this.gridState);
    });
  }

  public Remove(id) {
    this.flightScheduleService.Remove(id).subscribe( response => {
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
    this.flightScheduleService.Disable(id).subscribe( response => {
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
