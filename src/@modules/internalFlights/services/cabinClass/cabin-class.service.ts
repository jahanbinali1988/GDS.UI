import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CabinClass } from 'internalFlightsModels/ViewModel/CabinClass';
import { OperationStatus } from 'app/common/models/Base/OperationStatus';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CabinClassService {

  private url = 'http://localhost:52212/CabinClass';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor( private http: HttpClient ) { }

  GetAll(request): Observable<OperationStatus> {
      return this.http.post<OperationStatus>(this.url + '/ReadCabinClasses/', JSON.stringify(request), this.httpOptions);
  }

  Get (id: number): Observable<OperationStatus> {
      return this.http.post<OperationStatus>(this.url + '/Get/', JSON.stringify(id), this.httpOptions);
  }

  Remove (id: number): Observable<OperationStatus> {
      return this.http.post<OperationStatus>(this.url + '/Delete/', JSON.stringify(id), this.httpOptions);
  }

  Create (entity: CabinClass): Observable<OperationStatus> {
      return this.http.post<OperationStatus>(this.url + '/Manage/', JSON.stringify(entity), this.httpOptions);
  }

  Search_Airline (text: string): Observable<OperationStatus> {
    return this.http.post<OperationStatus>(this.url + '/Search_Airline/', JSON.stringify(text), this.httpOptions);
  }

  Search_CabinClassType (text: string): Observable<OperationStatus> {
    return this.http.post<OperationStatus>(this.url + '/Search_CabinClassType/', JSON.stringify(text), this.httpOptions);
  }
}
