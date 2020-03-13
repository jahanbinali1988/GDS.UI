import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { FlightsSchedule } from 'internalFlightsModels/ViewModel/FlightsSchedule';
import { Observable } from 'rxjs';
import { OperationStatus } from 'app/common/models/Base/OperationStatus';

@Injectable({
  providedIn: 'root'
})
export class FlightScheduleService {

  private url = 'http://localhost:52212/FlightsSchedule';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor( private http: HttpClient ) { }

  Create (entity: FlightsSchedule): Observable<OperationStatus> {
    return this.http.post<OperationStatus>(this.url + '/Manage', JSON.stringify(entity), this.httpOptions);
  }

  Get (id: number): Observable<OperationStatus> {
    return this.http.post<OperationStatus>(this.url + '/Get', JSON.stringify(id), this.httpOptions);
  }

  GetAll(request, airlineRouteId: number): Observable<OperationStatus> {
    request.filter.filters.push({ field: 'AirlineRouteId', operator: 'eq', value: airlineRouteId });
    return this.http.post<OperationStatus>(this.url + '/ReadFlightsSchedules', JSON.stringify(request), this.httpOptions);
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
