import { Component, ViewEncapsulation } from '@angular/core';
import { CabinClassActionType } from 'internalFlightsModels/ViewModel/CabinClassActionType';
import { GridDataResult, DataStateChangeEvent } from '@progress/kendo-angular-grid';
import { State, process } from '@progress/kendo-data-query';
import { CabinClassActionTypeService } from 'internalFlightsServices/CabinClassActionType/cabin-class-action-type.service';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-cabin-class-action-type-list',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './cabin-class-action-type-list.component.html',
  styleUrls: ['./cabin-class-action-type-list.component.scss']
})
export class CabinClassActionTypeListComponent  {
  cabinClassActionTypes: CabinClassActionType[] = [];
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

  constructor(private cabinClassActionTypeService: CabinClassActionTypeService, private notifier: NotifierService) {
      this.cabinClassActionTypeService.GetAll(this.gridState).subscribe(response => {
          this.cabinClassActionTypes = response.Data.Data;
          this.gridData = process(this.cabinClassActionTypes, this.gridState);
      });
   }

  public dataStateChange(newgridState: DataStateChangeEvent): void {
      this.gridState = newgridState;
      this.cabinClassActionTypes.length = 0;
      this.cabinClassActionTypeService.GetAll(this.gridState).subscribe(response => {
        this.cabinClassActionTypes = response.Data.Data;
        this.gridData = process(this.cabinClassActionTypes, this.gridState);
    });
  }
}
