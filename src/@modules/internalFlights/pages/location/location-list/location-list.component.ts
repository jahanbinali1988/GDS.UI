import { Component, ViewEncapsulation} from '@angular/core';
import { GridDataResult, DataStateChangeEvent } from '@progress/kendo-angular-grid';
import { process, State } from '@progress/kendo-data-query';
import { NotifierService } from 'angular-notifier';
import { ActivatedRoute } from '@angular/router';
import { Location } from 'internalFlightsModels/ViewModel/Location';
import { ValueText } from 'app/common/models/Base/ValueText';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';

import { LocationService } from 'internalFlightsServices/location/location.service';
import { OperationStatus } from 'app/common/models/Base/OperationStatus';

@Component({
  selector: 'app-location-list',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './location-list.component.html',
  styleUrls: ['./location-list.component.scss']
})
export class LocationListComponent {
    routeString: ValueText[] = [];
    locations: Location[] = [];
    parentId: number;
    locationTypeId: number;
    public gridData: GridDataResult;
    public gridState: State = {
        skip: 0,
        take: 10,
        sort: [],
        // Initial filter descriptor
        filter: {
            logic: 'and',
            filters: [{ field: 'name', operator: 'contains', value: '' }]
        }
    };

constructor(private locationService: LocationService, private route: ActivatedRoute, private notifier: NotifierService) {
        this.route.paramMap.subscribe(params => {
            this.parentId = +params.get('paretnId');
            this.locationTypeId = +params.get('locationTypeId');
            this.locations.length = 0;
            this.routeString.length = 0;
            this.locationService.GetAll(this.gridState, this.parentId, this.locationTypeId)
            .subscribe(response => {
                    this.locations = response.Data;
                    this.gridData = process(this.locations, this.gridState);
            });

            this.locationService.GetParentsCaptionById(this.parentId)
            .subscribe(response => {
                for (const key in response.Data) {
                    if (response.Data.hasOwnProperty(key)) {
                        this.routeString.push(response.Data[key]);
                    }
                }
            });
        });
 }

public dataStateChange(newgridState: DataStateChangeEvent): void {
    this.gridState = newgridState;
    this.locations.length = 0;
    this.locationService.GetAll(this.gridState, this.parentId, this.locationTypeId)
    .subscribe(response => {
        this.locations = response.Data.Data;
        this.gridData = process(this.locations, this.gridState);
    });
}

public Remove(id) {
    this.locationService.Remove(id).subscribe( response => {
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
    this.locationService.Disable(id).subscribe( response => {
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

public SetDomestic(id) {
    this.locationService.SetDomestic(id).subscribe( response => {
        const result: OperationStatus = response;
        if (result.Status === true) {
            this.gridData.data.find(f => {
                if (f.Id === id) {
                    f.IsDomestic = !f.IsDomestic;
                }
                return null;
            });
            this.notifier.notify( 'success',  result.Message );
        } else {
          this.notifier.notify( 'warning',  result.Message );
        }
    });
}

public SetCapital(id) {
    this.locationService.SetCapital(id).subscribe( response => {
        const result: OperationStatus = response;
        if (result.Status === true) {
            this.gridData.data.find(f => {
                if (f.Id === id) {
                    f.IsCapital = !f.IsCapital;
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
