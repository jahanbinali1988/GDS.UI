import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Aircraft } from 'internalFlightsModels/ViewModel/Aircraft';
import { OperationStatus } from 'app/common/models/Base/OperationStatus';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AircraftService {

  private url = 'http://localhost:52212/Aircraft';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor( private http: HttpClient ) { }

  Create (entity: Aircraft): Observable<OperationStatus> {
    return this.http.post<OperationStatus>(this.url + '/Manage', JSON.stringify(entity), this.httpOptions);
  }

  Get (id: number): Observable<OperationStatus> {
    return this.http.post<OperationStatus>(this.url + '/Get', JSON.stringify(id), this.httpOptions);
  }

  GetAll(request): Observable<OperationStatus> {
    return this.http.post<OperationStatus>(this.url + '/ReadAircrafts', JSON.stringify(request), this.httpOptions);
  }

  Remove (id: number): Observable<OperationStatus> {
      return this.http.post<OperationStatus>(this.url + '/Delete', JSON.stringify(id), this.httpOptions);
  }

  Disable (id: number): Observable<OperationStatus> {
      return this.http.post<OperationStatus>(this.url + '/Disable', JSON.stringify(id), this.httpOptions);
  }

  Search_Airline(text: string): Observable<OperationStatus> {
    return this.http.post<OperationStatus>(this.url + '/Search_Airline', JSON.stringify(text), this.httpOptions);
  }
}
