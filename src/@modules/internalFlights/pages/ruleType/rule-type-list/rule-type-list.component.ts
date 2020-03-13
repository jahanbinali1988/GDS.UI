import { Component, OnInit } from '@angular/core';
import { RuleType } from 'internalFlightsModels/ViewModel/RuleType';
import { RuleTypeService } from 'internalFlightsServices/ruleType/rule-type.service';
import { OperationStatus } from 'app/common/models/Base/OperationStatus';
import { NotifierService } from 'angular-notifier';
import { GridDataResult, DataStateChangeEvent } from '@progress/kendo-angular-grid';
import { State, process } from '@progress/kendo-data-query';

@Component({
  selector: 'app-rule-type-list',
  templateUrl: './rule-type-list.component.html',
  styleUrls: ['./rule-type-list.component.scss']
})
export class RuleTypeListComponent {

  ruleTypes: RuleType[] = [];
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

  constructor(private ruleTypeService: RuleTypeService, private notifier: NotifierService) {
      this.ruleTypeService.GetAll(this.gridState).subscribe(response => {
            this.ruleTypes = response.Data.Data;
            this.gridData = process(this.ruleTypes, this.gridState);
      });
   }

  public dataStateChange(newGridState: DataStateChangeEvent): void {
      this.gridState = newGridState;
      this.ruleTypes.length = 0;
      this.ruleTypeService.GetAll(this.gridState).subscribe(response => {
        this.ruleTypes = response.Data.Data;
        this.gridData = process(this.ruleTypes, this.gridState);
    });
  }

  public Remove(id) {
      this.ruleTypeService.Remove(id).subscribe( response => {
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
