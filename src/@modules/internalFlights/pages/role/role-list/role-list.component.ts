import { Component, ViewEncapsulation } from '@angular/core';
import { Role } from 'internalFlightsModels/ViewModel/Role';
import { GridDataResult, DataStateChangeEvent } from '@progress/kendo-angular-grid';
import { State, process } from '@progress/kendo-data-query';
import { NotifierService } from 'angular-notifier';
import { RoleService } from 'internalFlightsServices/role/role.service';

@Component({
  selector: 'app-role-list',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './role-list.component.html',
  styleUrls: ['./role-list.component.scss']
})
export class RoleListComponent {
  roles: Role[] = [];
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

  constructor(private roleService: RoleService, private notifier: NotifierService) {
      this.roleService.GetAll(this.gridState).subscribe(response => {
            this.roles = response.Data.Data;
            this.gridData = process(this.roles, this.gridState);
      });
   }

  public dataStateChange(newGridState: DataStateChangeEvent): void {
      this.gridState = newGridState;
      this.roles.length = 0;
      this.roleService.GetAll(this.gridState).subscribe(response => {
        this.roles = response.Data.Data;
        this.gridData = process(this.roles, this.gridState);
    });
  }
}
