import { Component, OnInit } from '@angular/core';
import { ValueText } from 'app/common/models/Base/ValueText';
import { map, startWith } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { OperationStatus } from 'app/common/models/Base/OperationStatus';
import { SeoFlightContentService } from 'internalFlightsServices/seoFlightContent/seo-flight-content.service';
import { SeoFlightContent } from 'internalFlightsModels/ViewModel/SeoFlightContent';

@Component({
  selector: 'app-seo-flight-content-manage',
  templateUrl: './seo-flight-content-manage.component.html',
  styleUrls: ['./seo-flight-content-manage.component.scss']
})
export class SeoFlightContentManageComponent implements OnInit {
  FromAirportItems: ValueText[] = [];
  ToAirportItems: ValueText[] = [];
  filteredOptions: Observable<ValueText[]>;
  form = new FormGroup({
    Id: new FormControl('0', Validators.required),
    FromAirportId: new FormControl(''),
    ToAirportId: new FormControl(''),
    ContentText: new FormControl(''),

    FromAirportCaption: new FormControl('', Validators.required),
    ToAirportCaption: new FormControl('', Validators.required),
  });

  constructor(private seoFlightContentService: SeoFlightContentService, private route: ActivatedRoute, private notifier: NotifierService) {
      this.FromAirportItems.length = 0;
      this.ToAirportItems.length = 0;
      this.route.paramMap.subscribe(params => {
        if (+params.get('id') > 0) {
          this.seoFlightContentService.Get(+params.get('id'))
          .subscribe(response => {
              const data = response.Data;
              this.form.patchValue({Id: data['Id']});
              this.form.patchValue({FromAirportId: data['FromAirportId']});
              this.form.patchValue({ToAirportId: data['ToAirportId']});
              this.form.patchValue({ContentText: data['ContentText']});

              this.form.patchValue({FromAirportCaption: data['FromAirportCaption']});
              this.form.patchValue({ToAirportCaption: data['ToAirportCaption']});
          });
        }
    });
  }

  ngOnInit() {
    this.form.controls.FromAirportCaption.valueChanges.pipe(
      startWith(''),
      map(value => {
        this.FromAirportItems.length = 0;
        this._filterFromAirport(value);
      })
    ).subscribe(response => {
      return response;
    });

    this.form.controls.ToAirportCaption.valueChanges.pipe(
      startWith(''),
      map(value => {
        this.ToAirportItems.length = 0;
        this._filterToAirport(value);
      })
    ).subscribe(response => {
      return response;
    });
  }

  public Create() {
    const seoFlightContent: SeoFlightContent = {
      Id: this.form.get('Id').value,
      FromAirportId: this.form.get('FromAirportId').value,
      ToAirportId: this.form.get('ToAirportId').value,
      ContentText: this.form.get('ContentText').value,

      FromAirportCaption: this.form.get('FromAirportCaption').value,
      ToAirportCaption: this.form.get('ToAirportCaption').value,
    };
    this.seoFlightContentService.Create(seoFlightContent).subscribe( response => {
      const result: OperationStatus = response;
      if (result.Status === true) {
        this.notifier.notify( 'success',  result.Message );
      } else {
        this.notifier.notify( 'warning',  result.Message );
      }
    });
  }

  autoCompleteFromAirportOnChange(text) {
    this.form.patchValue({FromAirportId:
      this.FromAirportItems.find(c => c.Text === text).Value});
  }

  autoCompleteToAirportOnChange(text) {
    this.form.patchValue({ToAirportId:
      this.ToAirportItems.find(c => c.Text === text).Value});
  }

  private _filterFromAirport(value: string): ValueText[] {
    const fromAirportItems: ValueText[] = [];
    this.seoFlightContentService.Search_Airport(value).subscribe(response => {
      for (const key in response.Data) {
        if (response.Data.hasOwnProperty(key)) {
          fromAirportItems.push({Value: response.Data[key].Value, Text: response.Data[key].Text});
        }
      }
    });
    this.FromAirportItems = fromAirportItems;
    return fromAirportItems;
  }

  private _filterToAirport(value: string): ValueText[] {
    const toAirportItems: ValueText[] = [];
    this.seoFlightContentService.Search_Airport(value).subscribe(response => {
      for (const key in response.Data) {
        if (response.Data.hasOwnProperty(key)) {
          toAirportItems.push({Value: response.Data[key].Value, Text: response.Data[key].Text});
        }
      }
    });
    this.ToAirportItems = toAirportItems;
    return toAirportItems;
  }

  get Id() {
    if (this.form.get('Id').value == null) {
      return this.form.get('Id').value;
    } else {
      return 0;
    }
  }
  get FromAirportId() {
    if (this.form.get('FromAirportId').value == null) {
      return this.form.get('FromAirportId').value;
    } else {
      return 0;
    }
  }
  get ToAirportId() {
    if (this.form.get('ToAirportId').value == null) {
      return this.form.get('ToAirportId').value;
    } else {
      return 0;
    }
  }
  get ContentText() {
    return this.form.get('ContentText');
  }
  get AirlineCaption() {
    return this.form.get('AirlineCaption');
  }
  get FromAirportCaption() {
    return this.form.get('FromAirportCaption');
  }
  get ToAirportCaption() {
    return this.form.get('ToAirportCaption');
  }
}
