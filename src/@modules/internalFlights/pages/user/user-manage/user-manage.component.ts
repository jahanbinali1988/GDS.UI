import { Component, OnInit } from '@angular/core';
import { ValueText } from 'app/common/models/Base/ValueText';
import { Observable } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from 'internalFlightsServices/user/user.service';
import { ActivatedRoute } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { User } from 'internalFlightsModels/ViewModel/User';
import { OperationStatus } from 'app/common/models/Base/OperationStatus';
import { Guid } from 'guid-typescript';

@Component({
  selector: 'app-user-manage',
  templateUrl: './user-manage.component.html',
  styleUrls: ['./user-manage.component.scss']
})
export class UserManageComponent implements OnInit {
  UserTypes: ValueText[] = [];
  filteredOptions: Observable<ValueText[]>;
  form = new FormGroup({
    Id: new FormControl('0', Validators.required),
    Username: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    Password: new FormControl('', [Validators.required, Validators.maxLength(200)]),
    Salt: new FormControl('', [Validators.required, Validators.maxLength(100)]),
    UserTypeId: new FormControl('', Validators.required),
    IsLocked: new FormControl('false', Validators.required),
    LockoutEndDateUtc: new FormControl(''),
    IsDisabled: new FormControl('false', Validators.required),
    IsDeleted: new FormControl('false', Validators.required),

    HashedPassword: new FormControl(''),
    LockoutEndDateUtcCaption: new FormControl(''),
    UserTypeCaption: new FormControl('', Validators.required)
  });

  ngOnInit () {
  }

  constructor(private userService: UserService, private route: ActivatedRoute, private notifier: NotifierService) {
      this.UserTypes.length = 0;
      this.route.paramMap.subscribe(params => {
        if (+params.get('id') > 0) {
          this.userService.Get(+params.get('id'))
          .subscribe(response => {
              const data = response.Data;
              this.form.patchValue({Id: data['Id']});
              this.form.patchValue({Username: data['Username']});
              this.form.patchValue({Password: data['Password']});
              this.form.patchValue({Salt: data['Salt']});
              this.form.patchValue({UserTypeId: data['UserTypeId']});
              this.form.patchValue({IsLocked: data['IsLocked']});
              this.form.patchValue({LockoutEndDateUtc: data['LockoutEndDateUtc']});
              this.form.patchValue({IsDisabled: data['IsDisabled']});
              this.form.patchValue({IsDeleted: data['IsDeleted']});

              this.form.patchValue({HashedPassword: data['HashedPassword']});
              this.form.patchValue({LockoutEndDateUtcCaption: data['LockoutEndDateUtcCaption']});
              this.form.patchValue({UserTypeCaption: data['UserTypeCaption']});
          });
        }  else {
          this.form.patchValue({Salt: Guid.create().toString()});
        }
    });

      this.userService.Search_UserType()
      .subscribe(response => {
        for (const key in response.Data) {
          if (response.Data.hasOwnProperty(key)) {
            this.UserTypes.push({Value: response.Data[key].Value, Text: response.Data[key].Text} );
          }
        }
      });
  }

  public Create() {
    const user: User = {
      Id: this.form.get('Id').value,
      Username: this.form.get('Username').value,
      Password: this.form.get('Password').value,
      Salt: this.form.get('Salt').value,
      UserTypeId: this.form.get('UserTypeId').value,
      IsLocked: this.form.get('IsLocked').value,
      LockoutEndDateUtc: this.form.get('LockoutEndDateUtc').value,
      IsDisabled: this.form.get('IsDisabled').value,
      IsDeleted: this.form.get('IsDeleted').value,
      UserTypeCaption: this.form.get('UserTypeCaption').value,
      LockoutEndDateUtcCaption: this.form.get('LockoutEndDateUtcCaption').value,
      HashedPassword: this.form.get('HashedPassword').value
    };
    this.userService.Create(user).subscribe( response => {
      const result: OperationStatus = response;
      if (result.Status === true) {
        this.notifier.notify( 'success',  result.Message );
      } else {
        this.notifier.notify( 'warning',  result.Message );
      }
    });
  }

  get Id() {
    if (this.form.get('Id').value == null) {
      return this.form.get('Id').value;
    } else {
      return 0;
    }
  }
  get Username() {
    return this.form.get('Username');
  }
  get Password() {
    return this.form.get('Password');
  }
  get LockoutEndDateUtc() {
    return this.form.get('LockoutEndDateUtc');
  }
  get Salt() {
    return this.form.get('Salt');
  }
  get UserTypeId() {
    if (this.form.get('UserTypeId').value == null) {
      return this.form.get('UserTypeId').value;
    } else {
      return 0;
    }
  }
  get UserTypeCaption() {
    return this.form.get('UserTypeCaption');
  }
  get IsLocked() {
    if (this.form.get('IsLocked').value == null) {
      return this.form.get('IsLocked').value;
    } else {
      return false;
    }
  }
  get IsDisabled() {
    if (this.form.get('IsDisabled').value == null) {
      return this.form.get('IsDisabled').value;
    } else {
      return false;
    }
  }
  get IsDeleted() {
    if (this.form.get('IsDeleted').value == null) {
      return this.form.get('IsDeleted').value;
    } else {
      return false;
    }
  }
  get HashedPassword() {
    return this.form.get('HashedPassword');
  }
  get LockoutEndDateUtcCaption() {
    return this.form.get('LockoutEndDateUtcCaption');
  }
}
