import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AirlineHolder } from 'internalFlightsModels/ViewModel/AirlineHolder';
import { OperationStatus } from 'app/common/models/Base/OperationStatus';
import { Observable } from 'rxjs';

@Injectable()
export class AirlineHolderService {

    private url = 'http://localhost:52212/AirlineHolder';
    httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
    };

    constructor( private http: HttpClient ) { }

    GetAll(request): Observable<OperationStatus> {
        return this.http.post<OperationStatus>(this.url + '/ReadAirlineHolders/', JSON.stringify(request), this.httpOptions);
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

    Create (entity: AirlineHolder): Observable<OperationStatus> {
        return this.http.post<OperationStatus>(this.url + '/Manage/', JSON.stringify(entity), this.httpOptions);
    }
}
