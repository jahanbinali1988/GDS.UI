import { Component } from '@angular/core';
import { of } from 'rxjs/observable/of';
import { CheckableSettings, TreeItemLookup } from '@progress/kendo-angular-treeview';
import { TreeModel } from '../../../../../app/common/models/Base/TreeModel';
import { ValueText } from 'app/common/models/Base/ValueText';
import { NotifierService } from 'angular-notifier';
import { ActivatedRoute } from '@angular/router';
import { RoleAllocationService } from 'internalFlightsServices/role/role-allocation.service';

@Component({
  selector: 'app-role-alocation',
  templateUrl: './role-allocation.component.html',
  styleUrls: ['./role-allocation.component.scss']
})
export class RoleAlocationComponent {
  roles: ValueText[] = [];
  public selectedRole = 0;
  public checkedItems: ValueText[] = [];
  public checkedKeys: any[] = [];
  public treeData: TreeModel[] = [];
  public x = 0;
  public y = 0;

  public enableCheck = true;
  public checkChildren = false;
  public checkParents = false;
  public checkMode: any = 'multiple';
  public selectionMode: any = 'single';

  constructor(private _roleAllocationService: RoleAllocationService,
    private route: ActivatedRoute, private notifier: NotifierService) {
      this._roleAllocationService.Search_Role('').subscribe(response => {
        if (response.Status === true) {
          for (const roleItem of response.Data) {
            this.roles.push(roleItem);
          }
        } else {
          this.notifier.notify( 'warning',  response.Message );
        }
      });

      this.route.paramMap.subscribe(params => {
        if (+params.get('id') > 0) {
          this.selectedRole = +params.get('id');
        }
      });
  }

  public get checkableSettings(): CheckableSettings {
    return {
        checkChildren: this.checkChildren,
        checkParents: this.checkParents,
        enabled: this.enableCheck,
        mode: this.checkMode
    };
}

  public isItemChecked = (_: any, index: string) => {
    const result = this.checkedKeys.indexOf(index) > -1 ? 'checked' : 'none';
    return result;
  }

  // used for update
  public handleChecking(itemLookup: TreeItemLookup): void {
    this.update(itemLookup.item.index);
    this.checkedKeys = [itemLookup.item.index];
  }

  public children = (dataItem: any): any => of(dataItem.items);
  public hasChildren = (dataItem: any): boolean => !!dataItem.items;

  update(index: string) {
    let caption = '';
    for (const entry of this.treeData) {
      if (entry.index === index) {
        caption = entry.text;
      }
      for (const subEntry of entry.items) {
        if (subEntry.index === index) {
          caption = entry.text + '/' + subEntry.text;
        }
      }
    }
    this._roleAllocationService.updateTreeNode(caption, this.selectedRole).subscribe(response => {
      if (response.Status === true) {
        this.notifier.notify( 'success',  response.Message );
      } else {
        this.notifier.notify( 'warning',  response.Message );
      }
    });
  }

  Click() {
    this.treeData.length = 0;
    this.checkedItems.length = 0;
    this.checkedKeys.length = 0;
    this._roleAllocationService.Read_ControllerTree_action(this.selectedRole).subscribe(response => {
      if (response.Status === true) {
        for (const entry of response.Data.items) {
          if (entry.permissioned) {
            this.checkedKeys.push(this.x.toString());
          }
          const obj = new TreeModel();
          obj.text = entry.text;
          obj.items = [];
          for (const subEntry of entry.items) {
            if (subEntry.permissioned) {
              const checkedObject = new ValueText();
              checkedObject.Text = entry.text;
              checkedObject.Value = subEntry.text;
              this.checkedItems.push(checkedObject);
              this.checkedKeys.push(this.x + '_' + this.y);
            }
            const subItems = new TreeModel();
            subItems.index = this.x + '_' + this.y;
            subItems.text = subEntry.text;
            obj.items.push(subItems);
            this.y += 1;
            obj.index = this.x.toString();
          }
          this.treeData.push(obj);
          this.x += 1;
          this.y = 0;
        }
      } else {
        this.notifier.notify( 'warning',  response.Message );
      }
    });
  }
}
