import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { OperationStatus } from 'app/common/models/Base/OperationStatus';
import { Observable } from 'rxjs/Observable';
import { BaggageUnit } from 'internalFlightsModels/ViewModel/BaggageUnit';

@Injectable({
  providedIn: 'root'
})
export class BaggageUnitService {

  private url = 'http://localhost:52212/BaggageUnit';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor( private http: HttpClient ) { }

  GetAll(request): Observable<OperationStatus> {
    return this.http.post<OperationStatus>(this.url + '/ReadBaggageUnits/', JSON.stringify(request), this.httpOptions);
  }

  Get (id: number): Observable<OperationStatus> {
    console.log(id);
    return this.http.post<OperationStatus>(this.url + '/Get/', JSON.stringify(id), this.httpOptions);
  }

  Create (entity: BaggageUnit): Observable<OperationStatus> {
    return this.http.post<OperationStatus>(this.url + '/Manage/', JSON.stringify(entity), this.httpOptions);
  }
}
