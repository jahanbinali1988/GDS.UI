import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AirlineFareType } from 'internalFlightsModels/ViewModel/AirlineFareType';
import { OperationStatus } from 'app/common/models/Base/OperationStatus';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AirlineFareTypeService {

  private url = 'http://localhost:52212/AirlineFareType';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor( private http: HttpClient ) { }

  GetAll(request): Observable<OperationStatus> {
    return this.http.post<OperationStatus>(this.url + '/ReadAirlineFareTypes/', JSON.stringify(request), this.httpOptions);
  }

  Get (id: number): Observable<OperationStatus> {
    return this.http.post<OperationStatus>(this.url + '/Get/', JSON.stringify(id), this.httpOptions);
  }

  Remove (id: number): Observable<OperationStatus> {
    return this.http.post<OperationStatus>(this.url + '/Delete/', JSON.stringify(id), this.httpOptions);
  }

  Create (entity: AirlineFareType): Observable<OperationStatus> {
    return this.http.post<OperationStatus>(this.url + '/Manage/', JSON.stringify(entity), this.httpOptions);
  }

  Search_Airline(text): Observable<OperationStatus> {
    return this.http.post<OperationStatus>(this.url + '/Search_Airline/', JSON.stringify(text), this.httpOptions);
  }

  Search_FareType(text): Observable<OperationStatus> {
    return this.http.post<OperationStatus>(this.url + '/Search_FareType/', null, this.httpOptions );
  }
}
