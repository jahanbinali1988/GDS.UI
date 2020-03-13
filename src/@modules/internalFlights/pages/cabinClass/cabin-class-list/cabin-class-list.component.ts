import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CabinClass } from 'internalFlightsModels/ViewModel/CabinClass';
import { GridDataResult, DataStateChangeEvent } from '@progress/kendo-angular-grid';
import { State, process } from '@progress/kendo-data-query';
import { CabinClassService } from 'internalFlightsServices/cabinClass/cabin-class.service';
import { NotifierService } from 'angular-notifier';
import { OperationStatus } from 'app/common/models/Base/OperationStatus';

@Component({
  selector: 'app-cabin-class-list',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './cabin-class-list.component.html',
  styleUrls: ['./cabin-class-list.component.scss']
})
export class CabinClassListComponent {
  cabinClasses: CabinClass[] = [];
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

  constructor(private cabinClassServioce: CabinClassService, private notifier: NotifierService) {
      this.cabinClassServioce.GetAll(this.gridState).subscribe(response => {
            this.cabinClasses = response.Data.Data;
            this.gridData = process(this.cabinClasses, this.gridState);
      });
   }

  public dataStateChange(newGridState: DataStateChangeEvent): void {
      this.gridState = newGridState;
      this.cabinClasses.length = 0;
      this.cabinClassServioce.GetAll(this.gridState).subscribe(response => {
        this.cabinClasses = response.Data.Data;
        this.gridData = process(this.cabinClasses, this.gridState);
    });
  }

  public Remove(id) {
      this.cabinClassServioce.Remove(id).subscribe( response => {
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
