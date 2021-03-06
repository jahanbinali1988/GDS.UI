import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CabinClassActionTypeService } from 'internalFlightsServices/CabinClassActionType/cabin-class-action-type.service';
import { NotifierService } from 'angular-notifier';
import { OperationStatus } from 'app/common/models/Base/OperationStatus';
import { CabinClassActionType } from 'internalFlightsModels/ViewModel/CabinClassActionType';

@Component({
  selector: 'app-cabin-class-action-type-manage',
  templateUrl: './cabin-class-action-type-manage.component.html',
  styleUrls: ['./cabin-class-action-type-manage.component.scss']
})
export class CabinClassActionTypeManageComponent {
  form = new FormGroup({
    Id: new FormControl('0', Validators.required),
    Name: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    LatinName: new FormControl('', [Validators.required, Validators.maxLength(50)])
  });

  constructor(private cabinClassActionTypeService: CabinClassActionTypeService,
    private route: ActivatedRoute, private notifier: NotifierService) {
      this.route.paramMap.subscribe(params => {
        if (+params.get('id') > 0) {
          this.cabinClassActionTypeService.Get(+params.get('id'))
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
    const cabinClassActionType: CabinClassActionType = {
      Id: this.form.get('Id').value,
      Name: this.form.get('Name').value,
      LatinName: this.form.get('LatinName').value
    };
    this.cabinClassActionTypeService.Create(cabinClassActionType).subscribe( response => {
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
