import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OperationStatus } from 'app/common/models/Base/OperationStatus';
import { Flight } from 'internalFlightsModels/ViewModel/Flight';

@Injectable({
  providedIn: 'root'
})
export class FlightService {
  private url = 'http://localhost:52212/Flight';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor( private http: HttpClient ) { }

  GetAll(request): Observable<OperationStatus> {
    return this.http.post<OperationStatus>(this.url + '/ReadFlights/', { request: request }, this.httpOptions);
  }

  Get(id: number): Observable<OperationStatus> {
    return this.http.post<OperationStatus>(this.url + '/Get/', JSON.stringify(id), this.httpOptions);
  }

  Create(entity: Flight): Observable<OperationStatus> {
    return this.http.post<OperationStatus>(this.url + '/Manage/', JSON.stringify(entity), this.httpOptions);
  }

  Search_Aircraft(text): Observable<OperationStatus> {
    return this.http.post<OperationStatus>(this.url + '/Search_Aircraft/', JSON.stringify(text), this.httpOptions);
  }
}
