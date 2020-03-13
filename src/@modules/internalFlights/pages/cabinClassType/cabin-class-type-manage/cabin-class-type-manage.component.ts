import { Component } from '@angular/core';
import { CabinClassTypeService } from 'internalFlightsServices/cabinClassType/cabin-class-type.service';
import { NotifierService } from 'angular-notifier';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CabinClassType } from 'internalFlightsModels/ViewModel/CabinClassType';
import { OperationStatus } from 'app/common/models/Base/OperationStatus';

@Component({
  selector: 'app-cabin-class-type-manage',
  templateUrl: './cabin-class-type-manage.component.html',
  styleUrls: ['./cabin-class-type-manage.component.scss']
})
export class CabinClassTypeManageComponent {
  form = new FormGroup({
    Id: new FormControl('0', Validators.required),
    Code: new FormControl('', [Validators.required, Validators.maxLength(3)]),
    Name: new FormControl('', Validators.maxLength(50)),
    Description: new FormControl('', Validators.maxLength(50)),
  });

  constructor(private cabinClassTypeService: CabinClassTypeService, private route: ActivatedRoute, private notifier: NotifierService) {
      this.route.paramMap.subscribe(params => {
        if (+params.get('id') > 0) {
          this.cabinClassTypeService.Get(+params.get('id'))
          .subscribe(response => {
              const data = response.Data;
              this.form.patchValue({Id: data['Id']});
              this.form.patchValue({Code: data['Code']});
              this.form.patchValue({Name: data['Name']});
              this.form.patchValue({Description: data['Description']});
          });
        }
    });
  }

  public Create() {
    const cabinClassType: CabinClassType = {
      Id: this.form.get('Id').value,
      Code: this.form.get('Code').value,
      Name: this.form.get('Name').value,
      Description: this.form.get('Description').value,
    };
    this.cabinClassTypeService.Create(cabinClassType).subscribe( response => {
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
  get Code() {
    return this.form.get('Code');
  }
  get Name() {
    return this.form.get('Name');
  }
  get Description() {
    return this.form.get('Description');
  }
}
