import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TravellerType } from 'internalFlightsModels/ViewModel/TravellerType';
import { OperationStatus } from 'app/common/models/Base/OperationStatus';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TravellerTypeService {

  private url = 'http://localhost:52212/TravellerType';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor( private http: HttpClient ) { }

    GetAll(request): Observable<OperationStatus> {
        return this.http.post<OperationStatus>(this.url + '/ReadTravellerTypes/', JSON.stringify(request), this.httpOptions);
    }

    Get (id: number): Observable<OperationStatus> {
        return this.http.post<OperationStatus>(this.url + '/Get/', JSON.stringify(id), this.httpOptions);
    }

    Remove (id: number): Observable<OperationStatus> {
        return this.http.post<OperationStatus>(this.url + '/Delete/', JSON.stringify(id), this.httpOptions);
    }

    Create (entity: TravellerType): Observable<OperationStatus> {
        return this.http.post<OperationStatus>(this.url + '/Manage/', JSON.stringify(entity), this.httpOptions);
    }
}
