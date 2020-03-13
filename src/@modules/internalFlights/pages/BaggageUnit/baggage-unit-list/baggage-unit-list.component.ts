import { Component, ViewEncapsulation } from '@angular/core';
import { BaggageUnit } from 'internalFlightsModels/ViewModel/BaggageUnit';
import {
    GridDataResult,
    DataStateChangeEvent
} from '@progress/kendo-angular-grid';
import { State, process } from '@progress/kendo-data-query';
import { NotifierService } from 'angular-notifier';
import { BaggageUnitService } from 'internalFlightsServices/BaggageUnit/baggage-unit.service';

@Component({
    selector: 'app-baggage-unit-list',
    encapsulation: ViewEncapsulation.None,
    templateUrl: './baggage-unit-list.component.html',
    styleUrls: ['./baggage-unit-list.component.scss']
})
export class BaggageUnitListComponent {
    baggageUnits: BaggageUnit[] = [];
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
        private currencieservice: BaggageUnitService,
        private notifier: NotifierService
    ) {
        this.currencieservice.GetAll(this.gridState).subscribe(response => {
            this.baggageUnits = response.Data.Data;
            this.gridData = process(this.baggageUnits, this.gridState);
        });
    }

    public dataStateChange(newgridState: DataStateChangeEvent): void {
        this.gridState = newgridState;
        this.baggageUnits.length = 0;
        this.currencieservice.GetAll(this.gridState).subscribe(response => {
            this.baggageUnits = response.Data.Data;
            this.gridData = process(this.baggageUnits, this.gridState);
        });
    }
}
