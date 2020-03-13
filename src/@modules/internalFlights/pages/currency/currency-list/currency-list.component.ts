import { Component, ViewEncapsulation } from '@angular/core';
import { NotifierService } from 'angular-notifier';
import { Currency } from 'internalFlightsModels/ViewModel/Currency';
import { State, process } from '@progress/kendo-data-query';
import { GridDataResult, DataStateChangeEvent } from '@progress/kendo-angular-grid';
import { CurrencyService } from 'internalFlightsServices/currency/currency.service';

@Component({
  selector: 'app-currency-list',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './currency-list.component.html',
  styleUrls: ['./currency-list.component.scss']
})
export class CurrencyListComponent {

  currencies: Currency[] = [];
  public gridData: GridDataResult;
  public gridState: State = {
      skip: 0,
      take: 10,
      // Initial filter descriptor
      filter: {
        logic: 'and',
        filters: [{ field: 'name', operator: 'contains', value: '' }]
      }
  };

  constructor(private currencieservice: CurrencyService, private notifier: NotifierService) {
      this.currencieservice.GetAll(this.gridState).subscribe(response => {
          this.currencies = response.Data.Data;
          this.gridData = process(this.currencies, this.gridState);
      });
   }

  public dataStateChange(newgridState: DataStateChangeEvent): void {
      this.gridState = newgridState;
      this.currencies.length = 0;
      this.currencieservice.GetAll(this.gridState).subscribe(response => {
        this.currencies = response.Data.Data;
        this.gridData = process(this.currencies, this.gridState);
    });
  }
}
