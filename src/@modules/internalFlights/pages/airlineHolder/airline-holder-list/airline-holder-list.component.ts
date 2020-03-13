import { Component, ViewEncapsulation } from '@angular/core';
import { process, State } from '@progress/kendo-data-query';
import { GridDataResult, DataStateChangeEvent } from '@progress/kendo-angular-grid';
import { AirlineHolder } from 'internalFlightsModels/ViewModel/AirlineHolder';
import { AirlineHolderService } from 'internalFlightsServices/airlineHolder/airline-holder.service';
import { NotifierService } from 'angular-notifier';
import { OperationStatus } from 'app/common/models/Base/OperationStatus';

@Component({
selector: 'app-airline-holder-list',
encapsulation: ViewEncapsulation.None,
templateUrl: './airline-holder-list.component.html',
styleUrls: ['./airline-holder-list.component.scss']
})
export class AirlineHolderListComponent {
    token: string;
    airlineHolders: AirlineHolder[] = [];
    public gridData: GridDataResult;
    public gridState: State = {
        skip: 0,
        take: 10,
        // Initial filter descriptor
        filter: {
          logic: 'and',
          filters: [{ field: 'name', operator: 'contains', value: '' }]
        }
    };

    constructor(private airlineHolderService: AirlineHolderService, private notifier: NotifierService) {
        this.airlineHolderService.GetAll(this.gridState).subscribe(response => {
            this.airlineHolders = response.Data.Data;
            this.gridData = process(this.airlineHolders, this.gridState);
        });
     }

    public dataStateChange(newgridState: DataStateChangeEvent): void {
        this.gridState = newgridState;
        this.airlineHolders.length = 0;
        this.airlineHolderService.GetAll(this.gridState).subscribe(response => {
            this.airlineHolders = response.Data.Data;
            this.gridData = process(this.airlineHolders, this.gridState);
        });
    }

    public Remove(id) {
        this.airlineHolderService.Remove(id).subscribe( response => {
            const result: OperationStatus = response;
            if (result.Status === true) {
                this.gridData.data.find(f => {
                    if (f.Id === id) {
                        f.IsDeleted = !f.IsDeleted;
                    }
                    return null;
                });
                this.notifier.notify( 'success',  result.Message );
            } else {
                this.notifier.notify( 'warning',  result.Message );
            }
        });
    }

    public Disable(id) {
        this.airlineHolderService.Disable(id).subscribe( response => {
            const result: OperationStatus = response;
            if (result.Status === true) {
                this.gridData.data.find(f => {
                    if (f.Id === id) {
                        f.IsDisabled = !f.IsDisabled;
                    }
                    return null;
                });
                this.notifier.notify( 'success',  result.Message );
            } else {
                this.notifier.notify( 'warning',  result.Message );
            }
        });
    }
}
