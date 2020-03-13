import { Component, ViewEncapsulation } from '@angular/core';
import { State, process } from '@progress/kendo-data-query';
import { GridDataResult, DataStateChangeEvent } from '@progress/kendo-angular-grid';
import { CabinClassType } from 'internalFlightsModels/ViewModel/CabinClassType';
import { CabinClassTypeService } from 'internalFlightsServices/cabinClassType/cabin-class-type.service';
import { NotifierService } from 'angular-notifier';
import { OperationStatus } from 'app/common/models/Base/OperationStatus';

@Component({
  selector: 'app-cabin-class-type-list',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './cabin-class-type-list.component.html',
  styleUrls: ['./cabin-class-type-list.component.scss']
})
export class CabinClassTypeListComponent {
  cabinClassTypes: CabinClassType[] = [];
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

  constructor(private cabinClassTypeService: CabinClassTypeService, private notifier: NotifierService) {
      this.cabinClassTypeService.GetAll(this.gridState).subscribe(response => {

            this.cabinClassTypes = response.Data.Data;
            this.gridData = process(this.cabinClassTypes, this.gridState);
      });
   }

  public dataStateChange(newGridState: DataStateChangeEvent): void {
      this.gridState = newGridState;
      this.cabinClassTypes.length = 0;
      this.cabinClassTypeService.GetAll(this.gridState).subscribe(response => {
        this.cabinClassTypes = response.Data.Data;
        this.gridData = process(this.cabinClassTypes, this.gridState);
    });
  }

  public Remove(id) {
      this.cabinClassTypeService.Remove(id).subscribe( response => {
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
