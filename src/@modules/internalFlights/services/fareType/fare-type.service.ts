import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FareType } from 'internalFlightsModels/ViewModel/FareType';
import { OperationStatus } from 'app/common/models/Base/OperationStatus';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FareTypeService {

  private url = 'http://localhost:52212/FareType';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor( private http: HttpClient ) { }

  GetAll(request): Observable<OperationStatus> {
      return this.http.post<OperationStatus>(this.url + '/ReadFareTypes', JSON.stringify(request), this.httpOptions);
  }

  Get (id: number): Observable<OperationStatus> {
      return this.http.post<OperationStatus>(this.url + '/Get', JSON.stringify(id), this.httpOptions);
  }

  Create(entity: FareType): Observable<OperationStatus> {
      return this.http.post<OperationStatus>(this.url + '/Manage', JSON.stringify(entity), this.httpOptions);
  }

  Additive (id: number): Observable<OperationStatus> {
    return this.http.post<OperationStatus>(this.url + '/Additive', JSON.stringify(id), this.httpOptions);
  }
}
