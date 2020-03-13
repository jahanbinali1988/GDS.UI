import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from 'internalFlightsModels/ViewModel/User';
import { OperationStatus } from 'app/common/models/Base/OperationStatus';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  private url = 'http://localhost:52212/User';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor( private http: HttpClient ) { }

  Create (entity: User): Observable<OperationStatus> {
    return this.http.post<OperationStatus>(this.url + '/Manage', JSON.stringify(entity), this.httpOptions);
  }

  Get (id: number): Observable<OperationStatus> {
    return this.http.post<OperationStatus>(this.url + '/Get', JSON.stringify(id), this.httpOptions);
  }

  GetAll(request): Observable<OperationStatus> {
    return this.http.post<OperationStatus>(this.url + '/ReadUsers', JSON.stringify(request), this.httpOptions);
  }

  Remove (id: number): Observable<OperationStatus> {
      return this.http.post<OperationStatus>(this.url + '/Delete', JSON.stringify(id), this.httpOptions);
  }

  Disable (id: number): Observable<OperationStatus> {
      return this.http.post<OperationStatus>(this.url + '/Disable', JSON.stringify(id), this.httpOptions);
  }

  Lock (id: number): Observable<OperationStatus> {
    return this.http.post<OperationStatus>(this.url + '/Lock', JSON.stringify(id), this.httpOptions);
}

  Search_UserType (): Observable<OperationStatus> {
    return this.http.post<OperationStatus>(this.url + '/Search_UserType', null, this.httpOptions);
  }
}
