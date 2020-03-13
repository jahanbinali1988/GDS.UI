import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CurrencyService } from 'internalFlightsServices/currency/currency.service';
import { NotifierService } from 'angular-notifier';
import { ActivatedRoute } from '@angular/router';
import { Currency } from 'internalFlightsModels/ViewModel/Currency';
import { OperationStatus } from 'app/common/models/Base/OperationStatus';

@Component({
  selector: 'app-currency-manage',
  templateUrl: './currency-manage.component.html',
  styleUrls: ['./currency-manage.component.scss']
})
export class CurrencyManageComponent {

  form = new FormGroup({
    Id: new FormControl('0', Validators.required),
    Name: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    Code: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(3)]),
    Symbol: new FormControl('', Validators.maxLength(5)),
    SymbolNative: new FormControl('', Validators.maxLength(20)),
    DecimalDigits: new FormControl('0'),
    NamePlural: new FormControl('', Validators.maxLength(50))
  });

  constructor(private currencyService: CurrencyService, private route: ActivatedRoute, private notifier: NotifierService) {
      this.route.paramMap.subscribe(params => {
        if (+params.get('id') > 0) {
          this.currencyService.Get(+params.get('id'))
          .subscribe(response => {
              const data = response.Data;
              this.form.patchValue({Id: data['Id']});
              this.form.patchValue({Code: data['Code']});
              this.form.patchValue({Name: data['Name']});
              this.form.patchValue({Symbol: data['Symbol']});
              this.form.patchValue({SymbolNative: data['SymbolNative']});
              this.form.patchValue({DecimalDigits: data['DecimalDigits']});
              this.form.patchValue({NamePlural: data['NamePlural']});
          });
        }
    });
  }

  public Create() {
    const currency: Currency = {
      Id: this.form.get('Id').value,
      Code: this.form.get('Code').value,
      Name: this.form.get('Name').value,
      Symbol: this.form.get('Symbol').value,
      SymbolNative: this.form.get('SymbolNative').value,
      DecimalDigits: this.form.get('DecimalDigits').value,
      NamePlural: this.form.get('NamePlural').value
    };
    this.currencyService.Create(currency).subscribe( response => {
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
  get Symbol() {
    return this.form.get('Symbol');
  }
  get DecimalDigits() {
    if (this.form.get('DecimalDigits').value == null) {
      return this.form.get('DecimalDigits').value;
    } else {
      return 0;
    }
  }
  get SymbolNative() {
  return this.form.get('SymbolNative');
  }
  get NamePlural() {
    return this.form.get('NamePlural');
  }
}
