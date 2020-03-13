import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { AllocationAccess } from 'internalFlightsModels/ViewModel/AllocationAccess';
import { Observable } from 'rxjs';
import { OperationStatus } from 'app/common/models/Base/OperationStatus';
import { ValueText } from 'app/common/models/Base/ValueText';

@Injectable({
  providedIn: 'root'
})
export class RoleAllocationService {

  private url = 'http://localhost:52212/AllocationAccess';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor( private http: HttpClient ) { }

  Create (entity: AllocationAccess): Observable<OperationStatus> {
    return this.http.post<OperationStatus>(this.url + '/Manage', JSON.stringify(entity), this.httpOptions);
  }

  Get (id: number): Observable<OperationStatus> {
    return this.http.post<OperationStatus>(this.url + '/Get', JSON.stringify(id), this.httpOptions);
  }

  GetAll(request): Observable<OperationStatus> {
    return this.http.post<OperationStatus>(this.url + '/ReadAccessPermissions', JSON.stringify(request), this.httpOptions);
  }

  Remove (id: number): Observable<OperationStatus> {
    return this.http.post<OperationStatus>(this.url + '/Remove', JSON.stringify(id), this.httpOptions);
  }

  Search_AreaControllerAction(text: string): Observable<OperationStatus> {
    return this.http.post<OperationStatus>(this.url + '/Search_AreaControllerAction', JSON.stringify(text), this.httpOptions);
  }

  Search_Role(text: string): Observable<OperationStatus> {
    return this.http.post<OperationStatus>(this.url + '/Search_Role', JSON.stringify(text), this.httpOptions);
  }

  Read_ControllerTree_action(roleId: number): Observable<OperationStatus> {
    return this.http.post<OperationStatus>(this.url + '/Read_ControllerTree_action', JSON.stringify(roleId), this.httpOptions);
  }

  Read_ControllerTree_Role(roleId: number): Observable<OperationStatus> {
    return this.http.post<OperationStatus>(this.url + '/Read_ControllerTree_Role', JSON.stringify(roleId), this.httpOptions);
  }

  updateTreeNode(caption: string, roleId: number): Observable<OperationStatus> {
    const params = new ValueText();
    params.Text = caption;
    params.Value = roleId.toString();
    return this.http.post<OperationStatus>(this.url + '/UpdateTreeNode', JSON.stringify(params), this.httpOptions);
  }
}
