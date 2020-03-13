import { Component, ViewEncapsulation } from '@angular/core';
import { SeoFlightContent } from 'internalFlightsModels/ViewModel/SeoFlightContent';
import { GridDataResult, DataStateChangeEvent } from '@progress/kendo-angular-grid';
import { State, process } from '@progress/kendo-data-query';
import { SeoFlightContentService } from 'internalFlightsServices/seoFlightContent/seo-flight-content.service';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-seo-flight-content-list',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './seo-flight-content-list.component.html',
  styleUrls: ['./seo-flight-content-list.component.scss']
})
export class SeoFlightContentListComponent {

  seoFlightContents: SeoFlightContent[] = [];
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

  constructor(private seoFlightContentService: SeoFlightContentService, private notifier: NotifierService) {
      this.seoFlightContentService.GetAll(this.gridState).subscribe(response => {
          this.seoFlightContents = response.Data.Data;
          this.gridData = process(this.seoFlightContents, this.gridState);
      });
   }

  public dataStateChange(newgridState: DataStateChangeEvent): void {
      this.gridState = newgridState;
      this.seoFlightContents.length = 0;
      this.seoFlightContentService.GetAll(this.gridState).subscribe(response => {
          this.seoFlightContents = response.Data.Data;
          this.gridData = process(this.seoFlightContents, this.gridState);
      });
  }
}
