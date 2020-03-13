import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { OperationStatus } from 'app/common/models/Base/OperationStatus';
import { SpecialServiceRequestService } from 'internalFlightsServices/SpecialServiceRequest/special-service-request.service';
import { SpecialServiceRequest } from 'internalFlightsModels/ViewModel/SpecialServiceRequest';

@Component({
  selector: 'app-special-service-request-manage',
  templateUrl: './special-service-request-manage.component.html',
  styleUrls: ['./special-service-request-manage.component.scss']
})
export class SpecialServiceRequestManageComponent {
  form = new FormGroup({
    Id: new FormControl('0', Validators.required),
    Code: new FormControl('', [Validators.required, Validators.maxLength(20)]),
    Name: new FormControl('', [Validators.required, Validators.maxLength(200)]),
    LatinName: new FormControl('', [Validators.maxLength(200)]),
  });

  constructor(private specialServiceRequestService: SpecialServiceRequestService, private route: ActivatedRoute,
    private notifier: NotifierService) {
      this.route.paramMap.subscribe(params => {
        if (+params.get('id') > 0) {
          this.specialServiceRequestService.Get(+params.get('id'))
          .subscribe(response => {
              const data = response.Data;
              this.form.patchValue({Id: data['Id']});
              this.form.patchValue({Code: data['Code']});
              this.form.patchValue({Name: data['Name']});
              this.form.patchValue({LatinName: data['LatinName']});
          });
        }
    });
  }

  public Create() {
    const specialServiceRequest: SpecialServiceRequest = {
      Id: this.form.get('Id').value,
      Code: this.form.get('Code').value,
      Name: this.form.get('Name').value,
      LatinName: this.form.get('LatinName').value
    };
    this.specialServiceRequestService.Create(specialServiceRequest).subscribe( response => {
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
}
