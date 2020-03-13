import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { OperationStatus } from 'app/common/models/Base/OperationStatus';
import { Observable } from 'rxjs';
import { SeoFlightContent } from 'internalFlightsModels/ViewModel/SeoFlightContent';

@Injectable({
  providedIn: 'root'
})
export class SeoFlightContentService {

  private url = 'http://localhost:52212/SeoFlightContent';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor( private http: HttpClient ) { }

    GetAll(request): Observable<OperationStatus> {
        return this.http.post<OperationStatus>(this.url + '/ReadSeoFlightContents/', JSON.stringify(request), this.httpOptions);
    }

    Get (id: number): Observable<OperationStatus> {
        return this.http.post<OperationStatus>(this.url + '/Get/', JSON.stringify(id), this.httpOptions);
    }

    Remove (id: number): Observable<OperationStatus> {
        return this.http.post<OperationStatus>(this.url + '/Delete/', JSON.stringify(id), this.httpOptions);
    }

    Create (entity: SeoFlightContent): Observable<OperationStatus> {
        return this.http.post<OperationStatus>(this.url + '/Manage/', JSON.stringify(entity), this.httpOptions);
    }

    Search_Airport (text: string): Observable<OperationStatus> {
        return this.http.post<OperationStatus>(this.url + '/Search_Airport/', JSON.stringify(text), this.httpOptions);
    }
}
