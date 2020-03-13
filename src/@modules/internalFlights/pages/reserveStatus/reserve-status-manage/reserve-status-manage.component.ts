import { OperationStatus } from 'app/common/models/Base/OperationStatus';
import { ReserveStatusService } from 'internalFlightsServices/reserveStatus/reserve-status.service';
import { ReserveStatus } from 'internalFlightsModels/ViewModel/ReserveStatus';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ViewEncapsulation, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-reserve-status-manage',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './reserve-status-manage.component.html',
  styleUrls: ['./reserve-status-manage.component.scss']
})
export class ReserveStatusManageComponent {
  form = new FormGroup({
    Id: new FormControl('0', Validators.required),
    Name: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    LatinName: new FormControl('', [Validators.required, Validators.maxLength(50)]),
  });

  constructor(private reserveStatusService: ReserveStatusService, private route: ActivatedRoute, private notifier: NotifierService) {
      this.route.paramMap.subscribe(params => {
        if (+params.get('id') > 0) {
          this.reserveStatusService.Get(+params.get('id'))
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
    const reserveStatus: ReserveStatus = {
      Id: this.form.get('Id').value,
      Name: this.form.get('Name').value,
      LatinName: this.form.get('LatinName').value,
    };
    this.reserveStatusService.Create(reserveStatus).subscribe( response => {
      const result: OperationStatus = response;
      if (result.Status === true) {
        this.notifier.notify( 'success',  result.Message );
      } else {
        this.notifier.notify( 'warning',  result.Message );
      }
    });
  }

  get Name() {
    return this.form.get('Name');
  }
  get LatinName() {
    return this.form.get('LatinName');
  }
}
