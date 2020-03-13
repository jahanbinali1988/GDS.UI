import { Component, ViewEncapsulation } from '@angular/core';
import { GridDataResult, DataStateChangeEvent } from '@progress/kendo-angular-grid';
import { State, process } from '@progress/kendo-data-query';
import { NotifierService } from 'angular-notifier';
import { TravellerType } from 'internalFlightsModels/ViewModel/TravellerType';
import { TravellerTypeService } from 'internalFlightsServices/travellerType/traveller-type.service';
import { OperationStatus } from 'app/common/models/Base/OperationStatus';

@Component({
  selector: 'app-traveller-type-list',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './traveller-type-list.component.html',
  styleUrls: ['./traveller-type-list.component.scss']
})
export class TravellerTypeListComponent {
  travellerTypes: TravellerType[] = [];
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

  constructor(private travellerTypeService: TravellerTypeService, private notifier: NotifierService) {
      this.travellerTypeService.GetAll(this.gridState).subscribe(response => {
            this.travellerTypes = response.Data.Data;
            this.gridData = process(this.travellerTypes, this.gridState);
      });
   }

  public dataStateChange(newGridState: DataStateChangeEvent): void {
      this.gridState = newGridState;
      this.travellerTypes.length = 0;
      this.travellerTypeService.GetAll(this.gridState).subscribe(response => {
        this.travellerTypes = response.Data.Data;
        this.gridData = process(this.travellerTypes, this.gridState);
    });
  }

  public Remove(id) {
      this.travellerTypeService.Remove(id).subscribe( response => {
          const result: OperationStatus = response;
          if (result.Status === true) {
              this.gridData.data.find(f => {
                  if (f.Id === id) {
                      f.IsDeleted = !f.IsDeleted;
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
