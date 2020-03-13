import { Component, ViewEncapsulation } from '@angular/core';
import { FareTypeService } from 'internalFlightsServices/fareType/fare-type.service';
import { NotifierService } from 'angular-notifier';
import { FareType } from 'internalFlightsModels/ViewModel/FareType';
import { GridDataResult, DataStateChangeEvent } from '@progress/kendo-angular-grid';
import { State, process } from '@progress/kendo-data-query';
import { OperationStatus } from 'app/common/models/Base/OperationStatus';

@Component({
  selector: 'app-fare-type-list',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './fare-type-list.component.html',
  styleUrls: ['./fare-type-list.component.scss']
})
export class FareTypeListComponent {
  fareTypes: FareType[] = [];
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

  constructor(private fareTypeService: FareTypeService, private notifier: NotifierService) {
      this.fareTypeService.GetAll(this.gridState).subscribe(response => {

            this.fareTypes = response.Data.Data;
            this.gridData = process(this.fareTypes, this.gridState);
      });
   }

  public dataStateChange(newgridState: DataStateChangeEvent): void {
    this.fareTypes.length = 0;
      this.gridState = newgridState;
      this.fareTypeService.GetAll(this.gridState).subscribe(response => {
        this.fareTypes = response.Data.Data;
        this.gridData = process(this.fareTypes, this.gridState);
    });
  }

  public Additive(id) {
      this.fareTypeService.Additive(id).subscribe( response => {
          const result: OperationStatus = response;
          if (result.Status === true) {
              this.gridData.data.find(f => {
                  if (f.Id === id) {
                      f.Additive = !f.Additive;
                  }
                  return null;
              });
              this.notifier.notify( 'success',  result.Message );
          } else {
            this.notifier.notify( 'warning',  result.Message );
          }
      });
  }
}
