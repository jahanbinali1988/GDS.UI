import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { OperationStatus } from 'app/common/models/Base/OperationStatus';
import { FlightMeal } from 'internalFlightsModels/ViewModel/FlightMeal';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FlightMealService {

  private url = 'http://localhost:52212/FlightMeal';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor( private http: HttpClient ) { }

  GetAll(request): Observable<OperationStatus> {
      return this.http.post<OperationStatus>(this.url + '/ReadFlightMeals/', { request: request }, this.httpOptions);
  }

  Get(id: number): Observable<OperationStatus> {
      return this.http.post<OperationStatus>(this.url + '/Get/', JSON.stringify(id), this.httpOptions);
  }

  Remove(id: number): Observable<OperationStatus> {
      return this.http.post<OperationStatus>(this.url + '/Delete/', JSON.stringify(id), this.httpOptions);
  }

  Create(entity: FlightMeal): Observable<OperationStatus> {
      return this.http.post<OperationStatus>(this.url + '/Manage/', JSON.stringify(entity), this.httpOptions);
  }

  Search_Flight(text): Observable<OperationStatus> {
      return this.http.post<OperationStatus>(this.url + '/Search_Flight/', JSON.stringify(text), this.httpOptions);
  }

  Search_Meal(text): Observable<OperationStatus> {
    return this.http.post<OperationStatus>(this.url + '/Search_Meal/', JSON.stringify(text), this.httpOptions);
  }
}
