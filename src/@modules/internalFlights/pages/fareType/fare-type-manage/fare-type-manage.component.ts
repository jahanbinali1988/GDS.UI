import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FareTypeService } from 'internalFlightsServices/fareType/fare-type.service';
import { ActivatedRoute } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { FareType } from 'internalFlightsModels/ViewModel/FareType';
import { OperationStatus } from 'app/common/models/Base/OperationStatus';

@Component({
  selector: 'app-fare-type-manage',
  templateUrl: './fare-type-manage.component.html',
  styleUrls: ['./fare-type-manage.component.scss']
})
export class FareTypeManageComponent {
  form = new FormGroup({
    Id: new FormControl('0', Validators.required),
    Name: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    LatinName: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    Additive: new FormControl('false', [Validators.required])
  });

  constructor(private fareTypeService: FareTypeService, private route: ActivatedRoute, private notifier: NotifierService) {
      this.route.paramMap.subscribe(params => {
        if (+params.get('id') > 0) {
          this.fareTypeService.Get(+params.get('id'))
          .subscribe(response => {
              const data = response.Data;
              this.form.patchValue({Id: data['Id']});
              this.form.patchValue({Name: data['Name']});
              this.form.patchValue({LatinName: data['LatinName']});
              this.form.patchValue({Additive: data['Additive']});
          });
        }
    });
  }

  public Create() {
    const fareType: FareType = {
      Id: this.form.get('Id').value,
      Name: this.form.get('Name').value,
      LatinName: this.form.get('LatinName').value,
      Additive: this.form.get('Additive').value
    };
    this.fareTypeService.Create(fareType).subscribe( response => {
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
  get Additive() {
  return this.form.get('Additive');
  }
}
