import { Component, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TravellerTypeService } from 'internalFlightsServices/travellerType/traveller-type.service';
import { ActivatedRoute } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { TravellerType } from 'internalFlightsModels/ViewModel/TravellerType';
import { OperationStatus } from 'app/common/models/Base/OperationStatus';

@Component({
  selector: 'app-traveller-type-manage',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './traveller-type-manage.component.html',
  styleUrls: ['./traveller-type-manage.component.scss']
})
export class TravellerTypeManageComponent {
  form = new FormGroup({
    Id: new FormControl('0', Validators.required),
    Code: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(3)]),
    Name: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    LatinName: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    StartAgeInHour: new FormControl('', Validators.required),
    EndAgeInHour: new FormControl('', Validators.required),
  });

  constructor(private travellerTypeService: TravellerTypeService, private route: ActivatedRoute, private notifier: NotifierService) {
      this.route.paramMap.subscribe(params => {
        if (+params.get('id') > 0) {
          this.travellerTypeService.Get(+params.get('id'))
          .subscribe(response => {
              const data = response.Data;
              this.form.patchValue({Id: data['Id']});
              this.form.patchValue({Code: data['Code']});
              this.form.patchValue({Name: data['Name']});
              this.form.patchValue({LatinName: data['LatinName']});
              this.form.patchValue({StartAgeInHour: data['StartAgeInHour']});
              this.form.patchValue({EndAgeInHour: data['EndAgeInHour']});
          });
        }
    });
  }

  public Create() {
    const travellerType: TravellerType = {
      Id: this.form.get('Id').value,
      Code: this.form.get('Code').value,
      Name: this.form.get('Name').value,
      LatinName: this.form.get('LatinName').value,
      StartAgeInHour: this.form.get('StartAgeInHour').value,
      EndAgeInHour: this.form.get('EndAgeInHour').value
    };
    this.travellerTypeService.Create(travellerType).subscribe( response => {
      const result: OperationStatus = response;
      if (result.Status === true) {
        this.notifier.notify( 'success',  result.Message );
      } else {
        this.notifier.notify( 'warning',  result.Message );
      }
    });
  }

  get Code() {
    return this.form.get('Code');
  }
  get Name() {
    return this.form.get('Name');
  }
  get LatinName() {
    return this.form.get('LatinName');
  }
  get StartAgeInHour() {
    if (this.form.get('StartAgeInHour').value == null) {
      return this.form.get('StartAgeInHour').value;
    } else {
      return 0;
    }
  }
  get EndAgeInHour() {
    if (this.form.get('EndAgeInHour').value == null) {
      return this.form.get('EndAgeInHour').value;
    } else {
      return 0;
    }
  }
  get Description() {
  return this.form.get('Description');
  }
}
