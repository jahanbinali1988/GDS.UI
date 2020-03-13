import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AirlineHolderService } from 'internalFlightsServices/airlineHolder/airline-holder.service';
import { ActivatedRoute } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { AirlineHolder } from 'internalFlightsModels/ViewModel/AirlineHolder';
import { OperationStatus } from 'app/common/models/Base/OperationStatus';

@Component({
  selector: 'app-airline-holder-manage',
  templateUrl: './airline-holder-manage.component.html',
  styleUrls: ['./airline-holder-manage.component.scss']
})
export class AirlineHolderManageComponent {
  form = new FormGroup({
    Id: new FormControl('0', Validators.required),
    Name: new FormControl('', [Validators.required, Validators.maxLength(200)]),
    IsDisabled: new FormControl('false', Validators.required),
    IsDeleted: new FormControl('false', Validators.required),
  });

  constructor(private airlineHolderService: AirlineHolderService, private route: ActivatedRoute, private notifier: NotifierService) {
    this.route.paramMap.subscribe(params => {
        if (+params.get('id') > 0) {
          this.airlineHolderService.Get(+params.get('id'))
          .subscribe(response => {
              const data = response.Data;
              this.form.patchValue({Id: data['Id']});
              this.form.patchValue({Name: data['Name']});
              this.form.patchValue({IsDisabled: data['IsDisabled']});
              this.form.patchValue({IsDeleted: data['IsDeleted']});
          });
        }
    });
   }

  public Create() {
    const airlineHolder: AirlineHolder = {Id: this.form.get('Id').value, Name: this.form.get('Name').value,
     IsDisabled: this.form.get('IsDisabled').value, IsDeleted: this.form.get('IsDeleted').value};
    this.airlineHolderService.Create(airlineHolder).subscribe( response => {
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
  get IsDisabled() {
    if (this.form.get('IsDisabled').value == null) {
      return this.form.get('IsDisabled').value;
    } else {
      return false;
    }
  }
  get IsDeleted() {
    if (this.form.get('IsDeleted').value == null) {
      return this.form.get('IsDeleted').value;
    } else {
      return false;
    }
  }
}
