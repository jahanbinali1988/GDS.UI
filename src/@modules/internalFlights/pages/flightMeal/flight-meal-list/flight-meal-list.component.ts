import { Component } from '@angular/core';
import { FlightMealService } from 'internalFlightsServices/flightMeal/flight-meal.service';
import { NotifierService } from 'angular-notifier';
import { FlightMeal } from 'internalFlightsModels/ViewModel/FlightMeal';
import { GridDataResult, DataStateChangeEvent } from '@progress/kendo-angular-grid';
import { State, process } from '@progress/kendo-data-query';

@Component({
  selector: 'app-flight-meal-list',
  templateUrl: './flight-meal-list.component.html',
  styleUrls: ['./flight-meal-list.component.scss']
})
export class FlightMealListComponent {

  flightMeal: FlightMeal[] = [];
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

  constructor(private flightMealService: FlightMealService, private notifier: NotifierService) {
      this.flightMealService.GetAll(this.gridState).subscribe(response => {
            this.flightMeal = response.Data.Data;
            this.gridData = process(this.flightMeal, this.gridState);
      });
   }

  public dataStateChange(newGridState: DataStateChangeEvent): void {
      this.gridState = newGridState;
      this.flightMeal.length = 0;
      this.flightMealService.GetAll(this.gridState).subscribe(response => {
        this.flightMeal = response.Data.Data;
        this.gridData = process(this.flightMeal, this.gridState);
    });
  }

  public Remove(id) {
      this.flightMealService.Remove(id).subscribe( response => {
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
}
