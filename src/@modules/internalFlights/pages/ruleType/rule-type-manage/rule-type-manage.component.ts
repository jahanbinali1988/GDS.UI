import { Component } from '@angular/core';
import { OperationStatus } from 'app/common/models/Base/OperationStatus';
import { RuleType } from 'internalFlightsModels/ViewModel/RuleType';
import { ActivatedRoute } from '@angular/router';
import { RuleTypeService } from 'internalFlightsServices/ruleType/rule-type.service';
import { NotifierService } from 'angular-notifier';
import { Validators, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-rule-type-manage',
  templateUrl: './rule-type-manage.component.html',
  styleUrls: ['./rule-type-manage.component.scss']
})
export class RuleTypeManageComponent {
  form = new FormGroup({
    Id: new FormControl('0', Validators.required),
    Name: new FormControl('', [Validators.required, Validators.maxLength(200)]),
    LatinName: new FormControl('', [Validators.required, Validators.maxLength(200)]),
  });

  constructor(private ruleTypeService: RuleTypeService, private route: ActivatedRoute, private notifier: NotifierService) {
      this.route.paramMap.subscribe(params => {
        if (+params.get('id') > 0) {
          this.ruleTypeService.Get(+params.get('id'))
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
    const ruleType: RuleType = {
      Id: this.form.get('Id').value,
      Name: this.form.get('Name').value,
      LatinName: this.form.get('LatinName').value
    };
    this.ruleTypeService.Create(ruleType).subscribe( response => {
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
