import { Component, ViewEncapsulation } from '@angular/core';
import { AirlineFareType } from 'internalFlightsModels/ViewModel/AirlineFareType';
import { GridDataResult, DataStateChangeEvent } from '@progress/kendo-angular-grid';
import { State, process } from '@progress/kendo-data-query';
import { AirlineFareTypeService } from 'internalFlightsServices/airlineFareType/airline-fare-type.service';
import { NotifierService } from 'angular-notifier';
import { OperationStatus } from 'app/common/models/Base/OperationStatus';

@Component({
  selector: 'app-airline-fare-type-list',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './airline-fare-type-list.component.html',
  styleUrls: ['./airline-fare-type-list.component.scss']
})
export class AirlineFareTypeListComponent {
  airlineFareTypes: AirlineFareType[] = [];
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

  constructor(private airlineFareTypeService: AirlineFareTypeService, private notifier: NotifierService) {
      this.airlineFareTypeService.GetAll(this.gridState).subscribe(response => {
            this.airlineFareTypes = response.Data.Data;
            this.gridData = process(this.airlineFareTypes, this.gridState);
      });
   }

  public dataStateChange(newGridState: DataStateChangeEvent): void {
      this.gridState = newGridState;
      this.airlineFareTypes.length = 0;
      this.airlineFareTypeService.GetAll(this.gridState).subscribe(response => {
        this.airlineFareTypes = response.Data.Data;
        this.gridData = process(this.airlineFareTypes, this.gridState);
        this.gridData = process(this.airlineFareTypes, null);
    });
  }

  public Remove(id) {
      this.airlineFareTypeService.Remove(id).subscribe( response => {
          const result: OperationStatus = response;
          if (result.Status === true) {
            const index = this.gridData.data.findIndex(finder => {
                if (finder.Id === id) {
                    return finder;
                }
            });
            if (index > -1) {
                this.gridData.data.splice(index, 1);
            }
            this.notifier.notify( 'success',  result.Message );
          } else {
            this.notifier.notify( 'warning',  result.Message );
          }
      });
  }
}
