import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OperationStatus } from 'app/common/models/Base/OperationStatus';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { AirlineRoute } from 'internalFlightsModels/ViewModel/AirlineRout';

@Injectable({
  providedIn: 'root'
})
export class AirlineRouteService {
  private url = 'http://localhost:52212/AirlineRoute';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor( private http: HttpClient ) { }

  GetAll(request, parentId): Observable<OperationStatus> {
    if (parentId > 0) {
      request.filter.filters.push({ field: 'ParentId', operator: 'eq', value: parentId });
    } else {
      request.filter.filters.push({ field: 'ParentId', operator: 'eq', value: null });
    }

    return this.http.post<OperationStatus>(this.url + '/ReadAirlineRoutes/', JSON.stringify(request), this.httpOptions);
  }

  Get (id: number): Observable<OperationStatus> {
    return this.http.post<OperationStatus>(this.url + '/Get/', JSON.stringify(id), this.httpOptions);
  }

  Create (entity: AirlineRoute): Observable<OperationStatus> {
    return this.http.post<OperationStatus>(this.url + '/Manage', JSON.stringify(entity), this.httpOptions);
  }

  Remove (id: number): Observable<OperationStatus> {
    return this.http.post<OperationStatus>(this.url + '/Delete/', JSON.stringify(id), this.httpOptions);
  }

  Disable (id: number): Observable<OperationStatus> {
    return this.http.post<OperationStatus>(this.url + '/Disable/', JSON.stringify(id), this.httpOptions);
  }

  Direct (id: number): Observable<OperationStatus> {
    return this.http.post<OperationStatus>(this.url + '/Direct/', JSON.stringify(id), this.httpOptions);
  }

  Search_Airline(text: string): Observable<OperationStatus> {
    return this.http.post<OperationStatus>(this.url + '/Search_Airline/', JSON.stringify(text), this.httpOptions);
  }

  Search_Airport(text: string): Observable<OperationStatus> {
    return this.http.post<OperationStatus>(this.url + '/Search_Airport/', JSON.stringify(text), this.httpOptions );
  }
}
