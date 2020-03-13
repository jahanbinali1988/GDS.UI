import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TokenModel } from 'app/common/models/Base/Token';
import { Login } from 'internalFlightsModels/ViewModel/login';
import { PermissionModel } from 'app/common/models/Base/PermissionModel';
import { Router } from '@angular/router';
import { LoginService } from 'app/common/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  invalidLogin: boolean;
  form: FormGroup;

  constructor(private loginService: LoginService, private fb: FormBuilder, private router: Router) {
    this.form = fb.group({
      UserName: ['', Validators.required],
      Password: ['', [Validators.required]]
    });
   }

  ngOnInit() {
  }

  Login() {
    const login: Login = {
      UserName: this.form.get('UserName').value,
      Password: this.form.get('Password').value,
    };
    if (localStorage.getItem('jwt') == null) {
      this.loginService.Login(login).subscribe(response => {
        if (response != null) {
          if (localStorage.getItem('jwt') == null) {
            const token = (<TokenModel>response).Token;
            localStorage.setItem('jwt', token);
            this.invalidLogin = false;
          }
          this.router.navigate(['/internalFlights/']);
        }
      }, err => {
          this.invalidLogin = true;
        });
    } else {
      this.router.navigate(['/internalFlights/']);
    }

    this.loginService.GetPermissions(login.UserName).subscribe(response => {
      const permissionString = (<PermissionModel>response).Permissions;
      localStorage.setItem('SamtikPermissions', permissionString);
    });
  }

  get UserName() {
    return this.form.get('UserName');
  }
  get Password() {
    return this.form.get('Password');
  }
}
