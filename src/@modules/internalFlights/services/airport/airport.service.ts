import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Airport } from 'internalFlightsModels/ViewModel/Airport';
import { OperationStatus } from 'app/common/models/Base/OperationStatus';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AirportService {

  private url = 'http://localhost:52212/Airport';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor( private http: HttpClient ) { }

  GetAll(request): Observable<OperationStatus> {
    return this.http.post<OperationStatus>(this.url + '/ReadAirports/', JSON.stringify(request), this.httpOptions);
  }

  Get (id: number): Observable<OperationStatus> {
    return this.http.post<OperationStatus>(this.url + '/Get/', JSON.stringify(id), this.httpOptions);
  }

  Remove (id: number): Observable<OperationStatus> {
    return this.http.post<OperationStatus>(this.url + '/Delete/', JSON.stringify(id), this.httpOptions);
  }

  Disable (id: number): Observable<OperationStatus> {
    return this.http.post<OperationStatus>(this.url + '/Disable/', JSON.stringify(id), this.httpOptions);
  }

  Create (entity: Airport): Observable<OperationStatus> {
    return this.http.post<OperationStatus>(this.url + '/Manage/', JSON.stringify(entity), this.httpOptions);
  }

  Search_Locations(text): Observable<OperationStatus> {
    return this.http.post<OperationStatus>(this.url + '/Search_Location/', JSON.stringify(text), this.httpOptions);
  }

  Search_Domestic(): Observable<OperationStatus> {
    return this.http.post<OperationStatus>(this.url + '/Search_Domestic/', null, this.httpOptions);
  }
}
