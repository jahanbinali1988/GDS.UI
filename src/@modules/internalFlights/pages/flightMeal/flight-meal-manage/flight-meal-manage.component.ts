import { Component, OnInit } from '@angular/core';
import { FlightMeal } from 'internalFlightsModels/ViewModel/FlightMeal';
import { ValueText } from 'app/common/models/Base/ValueText';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FlightMealService } from 'internalFlightsServices/flightMeal/flight-meal.service';
import { ActivatedRoute } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { OperationStatus } from 'app/common/models/Base/OperationStatus';
import { startWith, map } from 'rxjs/operators';

@Component({
  selector: 'app-flight-meal-manage',
  templateUrl: './flight-meal-manage.component.html',
  styleUrls: ['./flight-meal-manage.component.scss']
})
export class FlightMealManageComponent implements OnInit {
  MealItems: ValueText[] = [];
  FlightItems: ValueText[] = [];

  form = new FormGroup({
    Id: new FormControl('0', Validators.required),
    FlightId: new FormControl('', Validators.required),
    MealId: new FormControl('', Validators.required),

    FlightCaption: new FormControl(''),
    MealCaption: new FormControl(''),
  });

  constructor(private flightMealService: FlightMealService, private route: ActivatedRoute, private notifier: NotifierService) {
      this.route.paramMap.subscribe(params => {
        if (+params.get('id') > 0) {
          this.flightMealService.Get(+params.get('id'))
          .subscribe(response => {
              const data = response.Data;
              this.form.patchValue({Id: data['Id']});
              this.form.patchValue({FlightId: data['FlightId']});
              this.form.patchValue({MealId: data['MealId']});
              this.form.patchValue({FlightCaption: data['FlightCaption']});
              this.form.patchValue({MealCaption: data['MealCaption']});
          });
        }
    });
  }

  ngOnInit() {
   this.form.controls.FlightCaption.valueChanges.pipe(
      startWith(''),
      map(value => {
        this._filterFLight(value);
      })
    ).subscribe(response => {
      return response;
    });

    this.form.controls.MealCaption.valueChanges.pipe(
      startWith(''),
      map(value => {
        this._filterMeal(value);
      })
    ).subscribe(response => {
      return response;
    });
  }

  flightAutoCompleteOnChange(text) {
    this.form.patchValue({FlightId:
      this.FlightItems.find(c => c.Text === text).Value});
  }

  mealAutoCompleteOnChange(text) {
    this.form.patchValue({MealId:
      this.MealItems.find(c => c.Text === text).Value});
  }


  public Create() {
    const flightMeal: FlightMeal = {
      Id: this.form.get('Id').value,
      FlightId: this.form.get('FlightId').value,
      MealId: this.form.get('MealId').value,
      FlightCaption: this.form.get('FlightCaption').value,
      MealCaption: this.form.get('MealCaption').value
    };
    this.flightMealService.Create(flightMeal).subscribe( response => {
      const result: OperationStatus = response;
      if (result.Status === true) {
        this.notifier.notify( 'success',  result.Message );
      } else {
        this.notifier.notify( 'warning',  result.Message );
      }
    });
  }

  private _filterFLight(value: string): ValueText[] {
    const items: ValueText[] = [];
    this.flightMealService.Search_Flight(value).subscribe(response => {
      for (const key in response.Data) {
        if (response.Data.hasOwnProperty(key)) {
          items.push({Value: response.Data[key].Value, Text: response.Data[key].Text});
        }
      }
    });
    this.FlightItems = items;
    return items;
  }

  private _filterMeal(value: string): ValueText[] {
    const items: ValueText[] = [];
    this.flightMealService.Search_Meal(value).subscribe(response => {
      for (const key in response.Data) {
        if (response.Data.hasOwnProperty(key)) {
          items.push({Value: response.Data[key].Value, Text: response.Data[key].Text});
        }
      }
    });
    this.MealItems = items;
    return items;
  }

  get Id() {
    if (this.form.get('Id').value == null) {
      return this.form.get('Id').value;
    } else {
      return 0;
    }
  }
  get FlightId() {
    if (this.form.get('FlightId').value == null) {
      return this.form.get('FlightId').value;
    } else {
      return 0;
    }
  }
  get FlightCaption() {
    return this.form.get('FlightCaption');
  }
  get MealId() {
    if (this.form.get('MealId').value == null) {
      return this.form.get('MealId').value;
    } else {
      return 0;
    }
  }
  get MealCaption() {
    return this.form.get('MealCaption');
  }
}
