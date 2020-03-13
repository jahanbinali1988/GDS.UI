import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OperationStatus } from 'app/common/models/Base/OperationStatus';
import { ValueText } from 'app/common/models/Base/ValueText';

@Injectable({
  providedIn: 'root'
})
export class UserRoleService {
  private url = 'http://localhost:52212/UserRole';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'jwt': `Bearer ` + localStorage.getItem('jwt')
    })
  };

  constructor( private http: HttpClient ) { }

  GetUser(userId: number): Observable<OperationStatus> {
    const result = this.http.post<OperationStatus>(this.url + '/GetUser', JSON.stringify(userId), this.httpOptions);
    console.log('Get User');
    result.subscribe(c => console.log(c));
    return result;
  }

  Search_User(text: string): Observable<OperationStatus> {
    const result = this.http.post<OperationStatus>(this.url + '/Search_User', JSON.stringify(text), this.httpOptions);
    return result;
  }

  Read_Roles(userId: number): Observable<OperationStatus> {
    const result = this.http.post<OperationStatus>(this.url + '/Read_Roles', JSON.stringify(userId), this.httpOptions);
    return result;
  }

  UpdateRole(selectedUser: number, roleItemText: string) {
    const params = new ValueText();
    params.Value = selectedUser.toString();
    params.Text = roleItemText.toString();
    const result = this.http.post<OperationStatus>(this.url + '/UpdateRole', JSON.stringify(params),
    this.httpOptions);
    return result;
  }
}
