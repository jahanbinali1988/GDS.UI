import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { OperationStatus } from 'app/common/models/Base/OperationStatus';
import { Location } from 'internalFlightsModels/ViewModel/Location';
import { Observable } from 'rxjs';
import { State } from '@progress/kendo-data-query';

@Injectable()

export class LocationService {
    private url = 'http://localhost:52212/Location';
    httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      };

    constructor( private http: HttpClient ) { }

    GetAll(request: State, parentId, locationTypeId): Observable<OperationStatus> {
        request.filter.filters.length = 0;
        if (locationTypeId === 0) {
            request.filter.filters.push({ field: 'LocationTypeId', operator: 'eq', value: 1 });
        } else {
            this.GetChildLocationType(locationTypeId).subscribe(response => {
                if (response.Status === true) {
                    request.filter.filters.push({ field: 'LocationTypeId', operator: 'eq', value: response.Data.Id });
                }
            });
        }
        if (parentId > 0) {
            request.filter.filters.push({ field: 'ParentId', operator: 'eq', value: parentId });
        }
        const result = this.http.post<OperationStatus>(this.url + '/ReadLocations/', JSON.stringify(request) , this.httpOptions);
        return result;
    }

    Get (id: number): Observable<OperationStatus> {
        return this.http.post<OperationStatus>(this.url + '/Get/', JSON.stringify(id), this.httpOptions);
    }

    GetChildLocationType (id: number): Observable<OperationStatus> {
        return this.http.post<OperationStatus>(this.url + '/GetChildLocationType/', JSON.stringify(id), this.httpOptions);
    }

    Remove (id: number): Observable<OperationStatus> {
        return this.http.post<OperationStatus>(this.url + '/Delete/', JSON.stringify(id), this.httpOptions);
    }

    Disable (id: number): Observable<OperationStatus> {
        return this.http.post<OperationStatus>(this.url + '/Disable/', JSON.stringify(id), this.httpOptions);
    }

    SetDomestic (id: number): Observable<OperationStatus> {
        return this.http.post<OperationStatus>(this.url + '/Domestic/', JSON.stringify(id), this.httpOptions);
    }

    SetCapital (id: number): Observable<OperationStatus> {
        return this.http.post<OperationStatus>(this.url + '/Capital/', JSON.stringify(id), this.httpOptions);
    }

    Create (entity: Location): Observable<OperationStatus> {
        return this.http.post<OperationStatus>(this.url + '/Manage/', JSON.stringify(entity), this.httpOptions);
    }

    GetParentsCaptionById(id: number): Observable<OperationStatus> {
        return this.http.post<OperationStatus>(this.url + '/GetParentsCaptionById/', JSON.stringify(id), this.httpOptions);
    }

    Search_LocationTypes(): Observable<OperationStatus> {
        return this.http.post<OperationStatus>(this.url + '/Search_drpLocationType/', null, this.httpOptions);
    }

    Search_Locations(level: string, text: string): Observable<OperationStatus> {
        const params: string[] = [level, text];
        return this.http.post<OperationStatus>(this.url + '/Search_Parent/', JSON.stringify(params), this.httpOptions);
    }
}
