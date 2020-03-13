import { Component } from '@angular/core';
import { OperationStatus } from 'app/common/models/Base/OperationStatus';
import { BaggageUnit } from 'internalFlightsModels/ViewModel/BaggageUnit';
import { BaggageUnitService } from 'internalFlightsServices/BaggageUnit/baggage-unit.service';
import { NotifierService } from 'angular-notifier';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-baggage-unit-manage',
  templateUrl: './baggage-unit-manage.component.html',
  styleUrls: ['./baggage-unit-manage.component.scss']
})
export class BaggageUnitManageComponent {
  form = new FormGroup({
    Id: new FormControl('0', Validators.required),
    Name: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    LatinName: new FormControl('', Validators.maxLength(50)),
    UnitName: new FormControl('', [Validators.required, Validators.maxLength(20)])
  });

  constructor(private baggageUnitService: BaggageUnitService,
     private route: ActivatedRoute, private notifier: NotifierService) {
      this.route.paramMap.subscribe(params => {
        if (+params.get('id') > 0) {
          this.baggageUnitService.Get(+params.get('id'))
          .subscribe(response => {
              const data = response.Data;
              this.form.patchValue({Id: data['Id']});
              this.form.patchValue({Name: data['Name']});
              this.form.patchValue({LatinName: data['LatinName']});
              this.form.patchValue({UnitName: data['UnitName']});
          });
        }
    });
  }

  public Create() {
    const currency: BaggageUnit = {
      Id: this.form.get('Id').value,
      Name: this.form.get('Name').value,
      LatinName: this.form.get('LatinName').value,
      UnitName: this.form.get('UnitName').value
    };
    this.baggageUnitService.Create(currency).subscribe( response => {
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
  get UnitName() {
    return this.form.get('UnitName');
  }
}
