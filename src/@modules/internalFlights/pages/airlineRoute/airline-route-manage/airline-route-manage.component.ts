import { Component, OnInit } from '@angular/core';
import { ValueText } from 'app/common/models/Base/ValueText';
import { map, startWith } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AirlineRouteService } from 'internalFlightsServices/airlineRoute/airline-route.service';
import { ActivatedRoute } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { OperationStatus } from 'app/common/models/Base/OperationStatus';
import { AirlineRoute } from 'internalFlightsModels/ViewModel/AirlineRout';

@Component({
  selector: 'app-airline-route-manage',
  templateUrl: './airline-route-manage.component.html',
  styleUrls: ['./airline-route-manage.component.scss']
})
export class AirlineRouteManageComponent implements OnInit {
  AirlineItems: ValueText[] = [];
  FromAirportItems: ValueText[] = [];
  ToAirportItems: ValueText[] = [];
  AirlineRouteItems: ValueText[] = [];
  filteredOptions: Observable<ValueText[]>;

  form = new FormGroup({
    Id: new FormControl('0', Validators.required),
    ParentId: new FormControl('0'),
    AirlineId: new FormControl('', Validators.required),
    FromAirportId: new FormControl('', Validators.required),
    ToAirportId: new FormControl('', Validators.required),
    Duration: new FormControl('0'),
    Sequence: new FormControl('', Validators.required),
    IsDeleted: new FormControl('false', Validators.required),
    IsDisabled: new FormControl('false', Validators.required),
    IsDirect: new FormControl('false', Validators.required),

    AirlineCaption: new FormControl('', Validators.required),
    FromAirportCaption: new FormControl('', Validators.required),
    ToAirportCaption: new FormControl('', Validators.required),
  });

  constructor(private airlineRouteService: AirlineRouteService, private route: ActivatedRoute, private notifier: NotifierService) {
      this.AirlineItems.length = 0;
      this.FromAirportItems.length = 0;
      this.ToAirportItems.length = 0;
      this.AirlineRouteItems.length = 0;
      this.route.paramMap.subscribe(params => {
        if (+params.get('id') > 0) {
          this.airlineRouteService.Get(+params.get('id'))
          .subscribe(response => {
              const data = response.Data;
              this.form.patchValue({Id: data['Id']});
              this.form.patchValue({ParentId: data['ParentId']});
              this.form.patchValue({AirlineId: data['AirlineId']});
              this.form.patchValue({FromAirportId: data['FromAirportId']});
              this.form.patchValue({ToAirportId: data['ToAirportId']});
              this.form.patchValue({Duration: data['Duration']});
              this.form.patchValue({IsDirect: data['IsDirect']});
              this.form.patchValue({Sequence: data['Sequence']});
              this.form.patchValue({IsDeleted: data['IsDeleted']});
              this.form.patchValue({IsDisabled: data['IsDisabled']});

              this.form.patchValue({AirlineCaption: data['AirlineCaption']});
              this.form.patchValue({FromAirportCaption: data['FromAirportCaption']});
              this.form.patchValue({ToAirportCaption: data['ToAirportCaption']});
          });
        } else if (+params.get('parentId') > 0) {
          const parentId: number = +params.get('parentId');
          this.form.patchValue({ParentId: parentId});
          }
    });
  }

  ngOnInit() {
   this.form.controls.AirlineCaption.valueChanges.pipe(
      startWith(''),
      map(value => {
        this.AirlineItems.length = 0;
        this._filterAirLine(value);
      })
    ).subscribe(response => {
      return response;
    });

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
    const airlineRoute: AirlineRoute = {
      Id: this.form.get('Id').value,
      ParentId: this.form.get('ParentId').value,
      AirlineId: this.form.get('AirlineId').value,
      FromAirportId: this.form.get('FromAirportId').value,
      ToAirportId: this.form.get('ToAirportId').value,
      Duration: this.form.get('Duration').value,
      IsDirect: this.form.get('IsDirect').value,
      Sequence: this.form.get('Sequence').value,
      IsDeleted: this.form.get('IsDeleted').value,
      IsDisabled: this.form.get('IsDisabled').value,

      AirlineCaption: this.form.get('AirlineCaption').value,
      FromAirportCaption: this.form.get('FromAirportCaption').value,
      ToAirportCaption: this.form.get('ToAirportCaption').value,
    };
    this.airlineRouteService.Create(airlineRoute).subscribe( response => {
      const result: OperationStatus = response;
      if (result.Status === true) {
        this.notifier.notify( 'success',  result.Message );
      } else {
        this.notifier.notify( 'warning',  result.Message );
      }
    });
  }

  autoCompleteAirlineOnChange(text) {
    this.form.patchValue({AirlineId:
      this.AirlineItems.find(c => c.Text === text).Value});
  }

  autoCompleteFromAirportOnChange(text) {
    this.form.patchValue({FromAirportId:
      this.FromAirportItems.find(c => c.Text === text).Value});
  }

  autoCompleteToAirportOnChange(text) {
    this.form.patchValue({ToAirportId:
      this.ToAirportItems.find(c => c.Text === text).Value});
  }

  private _filterAirLine(value: string): ValueText[] {
    const airlineItems: ValueText[] = [];
    this.airlineRouteService.Search_Airline(value).subscribe(response => {
      for (const key in response.Data) {
        if (response.Data.hasOwnProperty(key)) {
          airlineItems.push({Value: response.Data[key].Value, Text: response.Data[key].Text});
        }
      }
    });
    this.AirlineItems = airlineItems;
    return airlineItems;
  }

  private _filterFromAirport(value: string): ValueText[] {
    const fromAirportItems: ValueText[] = [];
    this.airlineRouteService.Search_Airport(value).subscribe(response => {
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
    this.airlineRouteService.Search_Airport(value).subscribe(response => {
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
  get ParentId() {
    if (this.form.get('ParentId').value == null) {
      return this.form.get('ParentId').value;
    } else {
      return 0;
    }
  }
  get AirlineId() {
    if (this.form.get('AirlineId').value == null) {
      return this.form.get('AirlineId').value;
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
  get Duration() {
    if (this.form.get('Duration').value == null) {
      return this.form.get('Duration').value;
    } else {
      return 0;
    }
  }
  get Sequence() {
    if (this.form.get('Sequence').value == null) {
      return this.form.get('Sequence').value;
    } else {
      return 0;
    }
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
