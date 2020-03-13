import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Role } from 'internalFlightsModels/ViewModel/Role';
import { OperationStatus } from 'app/common/models/Base/OperationStatus';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  private url = 'http://localhost:52212/Role';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor( private http: HttpClient ) { }

  GetAll(request): Observable<OperationStatus> {
      return this.http.post<OperationStatus>(this.url + '/ReadRoles/', JSON.stringify(request), this.httpOptions);
  }

  Get (id: number): Observable<OperationStatus> {
      return this.http.post<OperationStatus>(this.url + '/Get/', JSON.stringify(id), this.httpOptions);
  }

  Remove (id: number): Observable<OperationStatus> {
      return this.http.post<OperationStatus>(this.url + '/Delete/', JSON.stringify(id), this.httpOptions);
  }

  Create (entity: Role): Observable<OperationStatus> {
      return this.http.post<OperationStatus>(this.url + '/Manage/', JSON.stringify(entity), this.httpOptions);
  }}
