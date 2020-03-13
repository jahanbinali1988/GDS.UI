import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { OperationStatus } from 'app/common/models/Base/OperationStatus';
import { Observable } from 'rxjs';
import { Currency } from 'internalFlightsModels/ViewModel/Currency';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {

  private url = 'http://localhost:52212/Currency';
    // for authentication checking
    httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    constructor( private http: HttpClient ) { }

  GetAll(request): Observable<OperationStatus> {
    return this.http.post<OperationStatus>(this.url + '/ReadCurrencies/', JSON.stringify(request), this.httpOptions);
  }

  Get (id: number): Observable<OperationStatus> {
    console.log(id);
    return this.http.post<OperationStatus>(this.url + '/Get/', JSON.stringify(id), this.httpOptions);
  }

  Create (entity: Currency): Observable<OperationStatus> {
    return this.http.post<OperationStatus>(this.url + '/Manage/', JSON.stringify(entity), this.httpOptions);
  }
}
