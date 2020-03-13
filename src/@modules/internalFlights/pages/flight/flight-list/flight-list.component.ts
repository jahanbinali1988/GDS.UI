import { Component, ViewEncapsulation } from '@angular/core';
import { GridDataResult, DataStateChangeEvent } from '@progress/kendo-angular-grid';
import { State, process } from '@progress/kendo-data-query';
import { NotifierService } from 'angular-notifier';
import { Flight } from 'internalFlightsModels/ViewModel/Flight';
import { FlightService } from 'internalFlightsServices/flight/flight.service';

@Component({
  selector: 'app-flight-list',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './flight-list.component.html',
  styleUrls: ['./flight-list.component.scss']
})
export class FlightListComponent {
  flights: Flight[] = [];
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

  constructor(private flightService: FlightService, private notifier: NotifierService) {
      this.flightService.GetAll(this.gridState).subscribe(response => {
          this.flights = response.Data.Data;
          this.gridData = process(this.flights, this.gridState);
      });
   }

  public dataStateChange(newGridState: DataStateChangeEvent): void {
      this.gridState = newGridState;
      this.flights.length = 0;
      this.flightService.GetAll(this.gridState).subscribe(response => {
        this.flights = response.Data.Data;
        this.gridData = process(this.flights, this.gridState);
    });
  }
}
