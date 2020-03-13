import { Component, ViewEncapsulation } from '@angular/core';
import { GridDataResult, DataStateChangeEvent } from '@progress/kendo-angular-grid';
import { State, process } from '@progress/kendo-data-query';
import { NotifierService } from 'angular-notifier';
import { SpecialServiceRequest } from 'internalFlightsModels/ViewModel/SpecialServiceRequest';
import { OperationStatus } from 'app/common/models/Base/OperationStatus';
import { SpecialServiceRequestService } from 'internalFlightsServices/SpecialServiceRequest/special-service-request.service';

@Component({
  selector: 'app-special-service-request-list',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './special-service-request-list.component.html',
  styleUrls: ['./special-service-request-list.component.scss']
})
export class SpecialServiceRequestListComponent {
    specialServiceRequests: SpecialServiceRequest[] = [];
    public gridData: GridDataResult;
    public gridState: State = {
        skip: 0,
        take: 10,
        sort: null,
        // Initial filter descriptor
        filter: {
            logic: 'and',
            filters: [{ field: 'name', operator: 'contains', value: '' }]
        }
    };

    constructor(private specialServiceRequestService: SpecialServiceRequestService, private notifier: NotifierService) {
        this.specialServiceRequestService.GetAll(this.gridState).subscribe(response => {
                this.specialServiceRequests = response.Data.Data;
                this.gridData = process(this.specialServiceRequests, this.gridState);
        });
    }

    public dataStateChange(newGridState: DataStateChangeEvent): void {
        this.gridState = newGridState;
        this.specialServiceRequests.length = 0;
        this.specialServiceRequestService.GetAll(this.gridState).subscribe(response => {
            this.specialServiceRequests = response.Data.Data;
            this.gridData = process(this.specialServiceRequests, this.gridState);
        });
    }

    public Remove(id) {
        this.specialServiceRequestService.Remove(id).subscribe( response => {
            const result: OperationStatus = response;
            if (result.Status === true) {
                const index = this.gridData.data.findIndex(finder => {
                    if (finder.Id === id) {
                        return finder;
                    }
                });
                if (index > -1) {
                    this.gridData.data.splice(index, 1);
                }
                this.notifier.notify( 'success',  result.Message );
            } else {
                this.notifier.notify( 'warning',  result.Message );
            }
        });
    }
}
