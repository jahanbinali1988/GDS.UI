import { Component, ViewEncapsulation } from '@angular/core';
import { process, State } from '@progress/kendo-data-query';
import {
    GridDataResult,
    DataStateChangeEvent
} from '@progress/kendo-angular-grid';
import { NotifierService } from 'angular-notifier';
import { Airport } from 'internalFlightsModels/ViewModel/Airport';
import { AirportService } from 'internalFlightsServices/airport/airport.service';
import { OperationStatus } from 'app/common/models/Base/OperationStatus';

@Component({
    selector: 'app-airport-list',
    encapsulation: ViewEncapsulation.None,
    templateUrl: './airport-list.component.html',
    styleUrls: ['./airport-list.component.scss']
})
export class AirportListComponent {
    airports: Airport[] = [];
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

    constructor(
        private airportService: AirportService,
        private notifier: NotifierService
    ) {
        this.airportService.GetAll(this.gridState).subscribe(response => {
            this.airports = response.Data.Data;
            this.gridData = process(this.airports, this.gridState);
        });
    }

    public dataStateChange(newgridState: DataStateChangeEvent): void {
        this.gridState = newgridState;
        this.airports.length = 0;
        this.airportService.GetAll(this.gridState).subscribe(response => {
            this.airports = response.Data.Data;
            this.gridData = process(this.airports, this.gridState);
        });
    }

    public Remove(id) {
        this.airportService.Remove(id).subscribe(response => {
            const result: OperationStatus = response;
            if (result.Status === true) {
                this.gridData.data.find(f => {
                    if (f.Id === id) {
                        f.IsDeleted = !f.IsDeleted;
                    }
                    return null;
                });
                this.notifier.notify('success', result.Message);
            } else {
                this.notifier.notify('warning', result.Message);
            }
        });
    }

    public Disable(id) {
        this.airportService.Disable(id).subscribe(response => {
            const result: OperationStatus = response;
            if (result.Status === true) {
                this.gridData.data.find(f => {
                    if (f.Id === id) {
                        f.IsDisabled = !f.IsDisabled;
                    }
                    return null;
                });
                this.notifier.notify('success', result.Message);
            } else {
                this.notifier.notify('warning', result.Message);
            }
        });
    }
}
