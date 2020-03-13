import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { OperationStatus } from 'app/common/models/Base/OperationStatus';
import { Airline } from 'internalFlightsModels/ViewModel/Airline';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AirlineService {
    private url = 'http://localhost:52212/Airline';
    httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    constructor( private http: HttpClient ) { }

    GetAll(request): Observable<OperationStatus> {
        return this.http.post<OperationStatus>(this.url + '/ReadAirlines/', { request: request }, this.httpOptions);
    }

    Get(id: number): Observable<OperationStatus> {
        return this.http.post<OperationStatus>(this.url + '/Get/', JSON.stringify(id), this.httpOptions);
    }

    Remove(id: number): Observable<OperationStatus> {
        return this.http.post<OperationStatus>(this.url + '/Delete/', JSON.stringify(id), this.httpOptions);
    }

    Disable(id: number): Observable<OperationStatus> {
        return this.http.post<OperationStatus>(this.url + '/Disable/', JSON.stringify(id), this.httpOptions);
    }

    Create(entity: Airline): Observable<OperationStatus> {
        return this.http.post<OperationStatus>(this.url + '/Manage/', JSON.stringify(entity), this.httpOptions);
    }

    Search_AirlineHolder(text): Observable<OperationStatus> {
        return this.http.post<OperationStatus>(this.url + '/Search_AirlineHolder/', JSON.stringify(text), this.httpOptions);
    }

    Search_Domestic(): Observable<OperationStatus> {
        return this.http.post<OperationStatus>(this.url + '/Search_Domestic/', null, this.httpOptions);
    }
}
