import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { OperationStatus } from 'app/common/models/Base/OperationStatus';
import { FlightStatus } from 'internalFlightsModels/ViewModel/FlightStatus';
import { FlightStatusService } from 'internalFlightsServices/flightStatus/flight-status.service';

@Component({
  selector: 'app-flight-status-manage',
  templateUrl: './flight-status-manage.component.html',
  styleUrls: ['./flight-status-manage.component.scss']
})
export class FlightStatusManageComponent {

  form = new FormGroup({
    Id: new FormControl('0', Validators.required),
    Name: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    LatinName: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    AllowReservation: new FormControl('false', [Validators.required])
  });

  constructor(private flightStatusService: FlightStatusService, private route: ActivatedRoute, private notifier: NotifierService) {
      this.route.paramMap.subscribe(params => {
        if (+params.get('id') > 0) {
          this.flightStatusService.Get(+params.get('id'))
          .subscribe(response => {
              const data = response.Data;
              this.form.patchValue({Id: data['Id']});
              this.form.patchValue({Name: data['Name']});
              this.form.patchValue({LatinName: data['LatinName']});
              this.form.patchValue({AllowReservation: data['AllowReservation']});
          });
        }
    });
  }

  public Create() {
    const flightStatus: FlightStatus = {
      Id: this.form.get('Id').value,
      Name: this.form.get('Name').value,
      LatinName: this.form.get('LatinName').value,
      AllowReservation: this.form.get('AllowReservation').value
    };
    this.flightStatusService.Create(flightStatus).subscribe( response => {
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
  get AllowReservation() {
    return this.form.get('AllowReservation');
  }
}
