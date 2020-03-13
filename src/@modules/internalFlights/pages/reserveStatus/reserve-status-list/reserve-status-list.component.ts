import { Component, ViewEncapsulation } from '@angular/core';
import { GridDataResult, DataStateChangeEvent } from '@progress/kendo-angular-grid';
import { State, process } from '@progress/kendo-data-query';
import { NotifierService } from 'angular-notifier';
import { ReserveStatus } from 'internalFlightsModels/ViewModel/ReserveStatus';
import { OperationStatus } from 'app/common/models/Base/OperationStatus';
import { ReserveStatusService } from 'internalFlightsServices/ReserveStatus/reserve-status.service';

@Component({
  selector: 'app-reserve-status-list',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './reserve-status-list.component.html',
  styleUrls: ['./reserve-status-list.component.scss']
})
export class ReserveStatusListComponent {

  reserveStatuses: ReserveStatus[] = [];
  public gridData: GridDataResult;
  public gridState: State = {
      skip: 0,
      take: 10,
      sort: null,
      // Initial filter descriptor
      filter: {
        logic: 'and',
        filters: [{ field: 'name', operator: 'contains', value: '' }]
      }
  };

  constructor(private reserveStatusService: ReserveStatusService, private notifier: NotifierService) {
      this.reserveStatusService.GetAll(this.gridState).subscribe(response => {
            this.reserveStatuses = response.Data.Data;
            this.gridData = process(this.reserveStatuses, this.gridState);
      });
   }

  public dataStateChange(newGridState: DataStateChangeEvent): void {
      this.gridState = newGridState;
      this.reserveStatuses.length = 0;
      this.reserveStatusService.GetAll(this.gridState).subscribe(response => {
        this.reserveStatuses = response.Data.Data;
        this.gridData = process(this.reserveStatuses, this.gridState);
    });
  }

  public Remove(id) {
      this.reserveStatusService.Remove(id).subscribe( response => {
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
