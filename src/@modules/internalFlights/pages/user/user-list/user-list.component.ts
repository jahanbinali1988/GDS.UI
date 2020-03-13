import { Component, ViewEncapsulation } from '@angular/core';
import { UserService } from 'internalFlightsServices/user/user.service';
import { NotifierService } from 'angular-notifier';
import { User } from 'internalFlightsModels/ViewModel/User';
import { GridDataResult, DataStateChangeEvent } from '@progress/kendo-angular-grid';
import { State, process } from '@progress/kendo-data-query';
import { OperationStatus } from 'app/common/models/Base/OperationStatus';

@Component({
  selector: 'app-user-list',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent {
  users: User[] = [];
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

  constructor(private userService: UserService, private notifier: NotifierService) {
      this.userService.GetAll(this.gridState).subscribe(response => {
            this.users = response.Data.Data;
            this.gridData = process(this.users, this.gridState);
      });
   }

  public dataStateChange(newGridState: DataStateChangeEvent): void {
      this.gridState = newGridState;
      this.users.length = 0;
      this.userService.GetAll(this.gridState).subscribe(response => {
        this.users = response.Data.Data;
        this.gridData = process(this.users, this.gridState);
    });
  }

  public Remove(id) {
      this.userService.Remove(id).subscribe( response => {
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

  public Lock(id) {
        this.userService.Lock(id).subscribe( response => {
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

  public Disable(id) {
      this.userService.Disable(id).subscribe( response => {
          const result: OperationStatus = response;
          if (result.Status === true) {
              this.gridData.data.find(f => {
                  if (f.Id === id) {
                      f.IsDisabled = !f.IsDisabled;
                  }
                  return null;
              });
              this.notifier.notify( 'success',  result.Message );
          } else {
            this.notifier.notify( 'warning',  result.Message );
          }
      });
  }

  public IsLocked(id) {
    this.userService.Disable(id).subscribe( response => {
        const result: OperationStatus = response;
        if (result.Status === true) {
            this.gridData.data.find(f => {
                if (f.Id === id) {
                    f.IsLocked = !f.IsLocked;
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
