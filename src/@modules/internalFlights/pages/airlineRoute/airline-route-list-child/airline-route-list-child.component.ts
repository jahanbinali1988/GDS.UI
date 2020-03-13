import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import {
  GridDataResult,
  DataStateChangeEvent
} from '@progress/kendo-angular-grid';
import { State, process } from '@progress/kendo-data-query';
import { AirlineRouteService } from 'internalFlightsServices/airlineRoute/airline-route.service';
import { AirlineRoute } from 'internalFlightsModels/ViewModel/AirlineRout';
import { NotifierService } from 'angular-notifier';
import { OperationStatus } from 'app/common/models/Base/OperationStatus';

@Component({
  selector: 'app-airline-route-list-child',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './airline-route-list-child.component.html',
  styleUrls: ['./airline-route-list-child.component.scss']
})

export class AirlineRouteListChildComponent implements OnInit {
  airlineRoutes: AirlineRoute[] = [];
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
  @Input() public parentId: number;

  constructor(private airlineRouteService: AirlineRouteService, private notifier: NotifierService) {  }

  ngOnInit() {
    this.airlineRouteService.GetAll(this.gridState, this.parentId).subscribe(response => {
        this.airlineRoutes = response.Data.Data;
        this.gridData = process(this.airlineRoutes, this.gridState);
      });
    }

  public dataStateChange(newGridState: DataStateChangeEvent): void {
      this.gridState = newGridState;
      this.airlineRoutes.length = 0;
      this.airlineRouteService.GetAll(this.gridState, 0).subscribe(response => {
        this.airlineRoutes = response.Data.Data;
        this.gridData = process(this.airlineRoutes, this.gridState);
    });
  }

  public Remove(id) {
      this.airlineRouteService.Remove(id).subscribe( response => {
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
      this.airlineRouteService.Disable(id).subscribe( response => {
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

  public Direct(id) {
    this.airlineRouteService.Direct(id).subscribe( response => {
        const result: OperationStatus = response;
        if (result.Status === true) {
            this.gridData.data.find(f => {
                if (f.Id === id) {
                    f.IsDirect = !f.IsDirect;
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
