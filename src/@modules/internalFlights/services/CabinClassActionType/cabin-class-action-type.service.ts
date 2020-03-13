import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OperationStatus } from 'app/common/models/Base/OperationStatus';
import { CabinClassActionType } from 'internalFlightsModels/ViewModel/CabinClassActionType';

@Injectable({
  providedIn: 'root'
})
export class CabinClassActionTypeService {

  private url = 'http://localhost:52212/CabinClassActionType';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor( private http: HttpClient ) { }

  GetAll(request): Observable<OperationStatus> {
    return this.http.post<OperationStatus>(this.url + '/ReadCabinClassActionTypes/', JSON.stringify(request), this.httpOptions);
  }

  Get (id: number): Observable<OperationStatus> {
    console.log(id);
    return this.http.post<OperationStatus>(this.url + '/Get/', JSON.stringify(id), this.httpOptions);
  }

  Create (entity: CabinClassActionType): Observable<OperationStatus> {
    return this.http.post<OperationStatus>(this.url + '/Manage/', JSON.stringify(entity), this.httpOptions);
  }
}
