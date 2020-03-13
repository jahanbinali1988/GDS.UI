import { Component, ViewEncapsulation } from '@angular/core';
import { GridDataResult, DataStateChangeEvent } from '@progress/kendo-angular-grid';
import { State, process } from '@progress/kendo-data-query';
import { NotifierService } from 'angular-notifier';
import { Meal } from 'internalFlightsModels/ViewModel/Meal';
import { OperationStatus } from 'app/common/models/Base/OperationStatus';
import { MealService } from 'internalFlightsServices/meal/meal.service';

@Component({
  selector: 'app-meal-list',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './meal-list.component.html',
  styleUrls: ['./meal-list.component.scss']
})
export class MealListComponent {
  meals: Meal[] = [];
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

  constructor(private mealService: MealService, private notifier: NotifierService) {
      this.mealService.GetAll(this.gridState).subscribe(response => {
            this.meals = response.Data.Data;
            this.gridData = process(this.meals, this.gridState);
      });
   }

  public dataStateChange(newGridState: DataStateChangeEvent): void {
      this.gridState = newGridState;
      this.meals.length = 0;
      this.mealService.GetAll(this.gridState).subscribe(response => {
        this.meals = response.Data.Data;
        this.gridData = process(this.meals, this.gridState);
    });
  }

  public Remove(id) {
      this.mealService.Remove(id).subscribe( response => {
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
