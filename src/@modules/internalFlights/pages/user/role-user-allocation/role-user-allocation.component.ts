import { Component, OnInit } from '@angular/core';
import { ValueText } from 'app/common/models/Base/ValueText';
import { NotifierService } from 'angular-notifier';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { startWith, map } from 'rxjs/operators';
import { UserRoleService } from 'internalFlightsServices/userRole/user-role.service';

@Component({
  selector: 'app-role-user-allocation',
  templateUrl: './role-user-allocation.component.html',
  styleUrls: ['./role-user-allocation.component.scss']
})
export class RoleUserAllocationComponent implements OnInit {
  users: ValueText[] = [];
  roles: ValueText[] = [];
  public selectedUser = 0;

  form = new FormGroup({
    Id: new FormControl('0', Validators.required),
    RoleId: new FormControl('0'),
    UserId: new FormControl('0'),
    UserCaption: new FormControl(''),
    RoleCaption: new FormControl('')
  });

  constructor(private userRoleService: UserRoleService,
    private route: ActivatedRoute, private notifier: NotifierService) {
      this.roles.length = 0;
      this.route.paramMap.subscribe(params => {
        if (+params.get('id') > 0) {
          this.selectedUser = +params.get('id');
          this.form.patchValue({UserId: +params.get('id')});
        }
      });
}

  ngOnInit() {
    this.users.length = 0;
    this.form.controls.UserCaption.valueChanges.pipe(
       startWith(''),
       map(value => {
         this._filter(value);
       })
     ).subscribe(response => {
       return response;
     });
   }

   autoCompleteOnChange(text) {
    this.form.patchValue({UserId: this.users.find(c => c.Text === text).Value});
  }

  private _filter(value: string): ValueText[] {
    const items: ValueText[] = [];
    this.userRoleService.Search_User(value).subscribe(response => {
      for (const key in response.Data) {
        if (response.Data.hasOwnProperty(key)) {
          this.selectedUser = response.Data[key].Value;
          items.push({Value: response.Data[key].Value, Text: response.Data[key].Text});
          this.userRoleService.Read_Roles(this.selectedUser).subscribe(result => {
            if (result.Status === true) {
              this.roles.length = 0;
              for (const role of result.Data) {
                this.roles.push(role);
              }
            } else {
              this.notifier.notify( 'warning',  result.Message );
            }
          });
        }
      }
    });
    this.users = items;
    return items;
  }

  updateRole(roleItemText: string) {
    this.userRoleService.UpdateRole(this.selectedUser, roleItemText).subscribe(result => {
      if (result.Status === true) {
        this.notifier.notify( 'success',  result.Message );
      } else {
        this.notifier.notify( 'warning',  result.Message );
      }
    });
  }
}
