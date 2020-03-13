import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OperationStatus } from 'app/common/models/Base/OperationStatus';
import { ReserveStatus } from 'internalFlightsModels/ViewModel/ReserveStatus';

@Injectable({
  providedIn: 'root'
})
export class ReserveStatusService {

  private url = 'http://localhost:52212/ReserveStatus';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor( private http: HttpClient ) { }

    GetAll(request): Observable<OperationStatus> {
        return this.http.post<OperationStatus>(this.url + '/ReadReserveStatuses/', JSON.stringify(request), this.httpOptions);
    }

    Get (id: number): Observable<OperationStatus> {
        return this.http.post<OperationStatus>(this.url + '/Get/', JSON.stringify(id), this.httpOptions);
    }

    Remove (id: number): Observable<OperationStatus> {
        return this.http.post<OperationStatus>(this.url + '/Delete/', JSON.stringify(id), this.httpOptions);
    }

    Create (entity: ReserveStatus): Observable<OperationStatus> {
        return this.http.post<OperationStatus>(this.url + '/Manage/', JSON.stringify(entity), this.httpOptions);
    }
}
