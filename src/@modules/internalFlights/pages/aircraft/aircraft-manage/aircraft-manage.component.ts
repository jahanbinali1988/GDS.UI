import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { ValueText } from 'app/common/models/Base/ValueText';
import { AircraftService } from 'internalFlightsServices/aircraft/aircraft.service';
import { Aircraft } from 'internalFlightsModels/ViewModel/Aircraft';
import { OperationStatus } from 'app/common/models/Base/OperationStatus';

@Component({
  selector: 'app-aircraft-manage',
  templateUrl: './aircraft-manage.component.html',
  styleUrls: ['./aircraft-manage.component.scss']
})
export class AircraftManageComponent implements OnInit {
  AirlineItems: ValueText[] = [];
  filteredOptions: Observable<ValueText[]>;

  form = new FormGroup({
    Id: new FormControl('0', Validators.required),
    Name: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    AirlineId: new FormControl('', Validators.required),
    Description: new FormControl('', [Validators.required, , Validators.maxLength(200)]),
    IsDisabled: new FormControl('false', Validators.required),
    IsDeleted: new FormControl('false', Validators.required),

    AirlineCaption: new FormControl('', Validators.required)
  });

  constructor(private aircraftService: AircraftService, private route: ActivatedRoute, private notifier: NotifierService) {
      this.route.paramMap.subscribe(params => {
        if (+params.get('id') > 0) {
          this.aircraftService.Get(+params.get('id'))
          .subscribe(response => {
              const data = response.Data;
              this.form.patchValue({Id: data['Id']});
              this.form.patchValue({Name: data['Name']});
              this.form.patchValue({AirlineId: data['AirlineId']});
              this.form.patchValue({Description: data['Description']});
              this.form.patchValue({IsDisabled: data['IsDisabled']});
              this.form.patchValue({IsDeleted: data['IsDeleted']});

              this.form.patchValue({AirlineCaption: data['AirlineCaption']});
          });
        }
    });
  }

  ngOnInit() {
   this.form.controls.AirlineCaption.valueChanges.pipe(
      startWith(''),
      map(value => {
        this._filter(value);
      })
    ).subscribe(response => {
      return response;
    });
  }

  autoCompleteOnChange(text) {
    this.form.patchValue({AirlineId:
      this.AirlineItems.find(c => c.Text === text).Value});
  }

  public Create() {
    const aircraft: Aircraft = {
      Id: this.form.get('Id').value,
      Name: this.form.get('Name').value,
      AirlineId: this.form.get('AirlineId').value,
      Description: this.form.get('Description').value,
      AirlineCaption: this.form.get('AirlineCaption').value,
      IsDisabled: this.form.get('IsDisabled').value,
      IsDeleted: this.form.get('IsDeleted').value,
    };
    this.aircraftService.Create(aircraft).subscribe( response => {
      const result: OperationStatus = response;
      if (result.Status === true) {
        this.notifier.notify( 'success',  result.Message );
      } else {
        this.notifier.notify( 'warning',  result.Message );
      }
    });
  }

  private _filter(value: string): ValueText[] {
    const items: ValueText[] = [];
    this.aircraftService.Search_Airline(value).subscribe(response => {
      for (const key in response.Data) {
        if (response.Data.hasOwnProperty(key)) {
          items.push({Value: response.Data[key].Value, Text: response.Data[key].Text});
        }
      }
    });
    this.AirlineItems = items;
    return items;
  }

  get Id() {
    if (this.form.get('Id').value == null) {
      return this.form.get('Id').value;
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
  get Name() {
      return this.form.get('Name');
  }
  get Description() {
  return this.form.get('Description');
  }
  get AirlineCaption() {
  return this.form.get('AirlineCaption');
  }
  get IsDisabled() {
    if (this.form.get('IsDisabled').value == null) {
      return this.form.get('IsDisabled').value;
    } else {
      return false;
    }
  }
  get IsDeleted() {
    if (this.form.get('IsDeleted').value == null) {
      return this.form.get('IsDeleted').value;
    } else {
      return false;
    }
  }
}
