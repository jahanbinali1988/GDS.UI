import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { OperationStatus } from 'app/common/models/Base/OperationStatus';
import { Meal } from 'internalFlightsModels/ViewModel/Meal';
import { MealService } from 'internalFlightsServices/meal/meal.service';

@Component({
  selector: 'app-meal-manage',
  templateUrl: './meal-manage.component.html',
  styleUrls: ['./meal-manage.component.scss']
})
export class MealManageComponent {
  form = new FormGroup({
    Id: new FormControl('0', Validators.required),
    Name: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    LatinName: new FormControl('', Validators.maxLength(50)),
  });

  constructor(private mealService: MealService, private route: ActivatedRoute, private notifier: NotifierService) {
      this.route.paramMap.subscribe(params => {
        if (+params.get('id') > 0) {
          this.mealService.Get(+params.get('id'))
          .subscribe(response => {
              const data = response.Data;
              this.form.patchValue({Id: data['Id']});
              this.form.patchValue({Name: data['Name']});
              this.form.patchValue({LatinName: data['LatinName']});
          });
        }
    });
  }

  public Create() {
    const meal: Meal = {
      Id: this.form.get('Id').value,
      Name: this.form.get('Name').value,
      LatinName: this.form.get('LatinName').value
    };
    this.mealService.Create(meal).subscribe( response => {
      const result: OperationStatus = response;
      if (result.Status === true) {
        this.notifier.notify( 'success',  result.Message );
      } else {
        this.notifier.notify( 'warning',  result.Message );
      }
    });
  }

  get Id() {
    if (this.form.get('Id').value == null) {
      return this.form.get('Id').value;
    } else {
      return 0;
    }
  }

  get Name() {
      return this.form.get('Name');
  }


  get LatinName() {
  return this.form.get('LatinName');
  }
}
