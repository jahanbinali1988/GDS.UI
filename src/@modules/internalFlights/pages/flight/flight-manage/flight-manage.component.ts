import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { ValueText } from 'app/common/models/Base/ValueText';
import { FlightService } from 'internalFlightsServices/flight/flight.service';
import { startWith, map } from 'rxjs/operators';
import { Flight } from 'internalFlightsModels/ViewModel/Flight';
import { OperationStatus } from 'app/common/models/Base/OperationStatus';

@Component({
  selector: 'app-flight-manage',
  templateUrl: './flight-manage.component.html',
  styleUrls: ['./flight-manage.component.scss']
})
export class FlightManageComponent implements OnInit {

  aircrafts: ValueText[] = [];
  form = new FormGroup({
    Id: new FormControl('0', Validators.required),
    AircraftId: new FormControl(''),
    FlightNumber: new FormControl('', [Validators.required, Validators.maxLength(20)]),
    CreateDate: new FormControl(''),
    Stops: new FormControl('', Validators.required),
    AircraftCaption: new FormControl('')
  });

  ngOnInit() {
    this.aircrafts.length = 0;
    this.form.controls.AircraftCaption.valueChanges.pipe(
       startWith(''),
       map(value => {
         this._filter(value);
       })
     ).subscribe(response => {
       return response;
     });
   }

  constructor(private flightService: FlightService, private route: ActivatedRoute, private notifier: NotifierService) {
      this.route.paramMap.subscribe(params => {
        if (+params.get('id') > 0) {
          this.flightService.Get(+params.get('id'))
          .subscribe(response => {
              const data = response.Data;
              this.form.patchValue({Id: data['Id']});
              this.form.patchValue({Stops: data['Stops']});
              this.form.patchValue({CreateDate: new Date().toLocaleDateString()});
              this.form.patchValue({FlightNumber: data['FlightNumber']});
              this.form.patchValue({AircraftId: data['AircraftId']});
              this.form.patchValue({AircraftCaption: data['AircraftCaption']});
          });
        }
    });
  }

  public Create() {
    const flight: Flight = {
      Id: this.form.get('Id').value,
      Stops: this.form.get('Stops').value,
      FlightNumber: this.form.get('FlightNumber').value,
      AircraftId: this.form.get('AircraftId').value,
      AircraftCaption: this.form.get('AircraftCaption').value,
      CreateDate: new Date(),
      CreateDateCaption: ''
    };
    if (flight.Id > 0) {
      flight.CreateDate = this.form.get('CreateDate').value;
    }
    this.flightService.Create(flight).subscribe( response => {
      const result: OperationStatus = response;
      if (result.Status === true) {
        this.notifier.notify( 'success',  result.Message );
      } else {
        this.notifier.notify( 'warning',  result.Message );
      }
    });
  }

  autoCompleteOnChange(text) {
    this.form.patchValue({AircraftId:
    this.aircrafts.find(c => c.Text === text).Value});
  }

  private _filter(value: string): ValueText[] {
    const items: ValueText[] = [];
    this.flightService.Search_Aircraft(value).subscribe(response => {
      for (const key in response.Data) {
        if (response.Data.hasOwnProperty(key)) {
          items.push({Value: response.Data[key].Value, Text: response.Data[key].Text});
        }
      }
    });
    this.aircrafts = items;
    return items;
  }

  get Id() {
    return this.form.get('Id');
  }
  get Stops() {
    return this.form.get('Stops');
  }
  get AircraftId() {
    return this.form.get('AircraftId');
  }
  get AircraftCaption() {
    if (this.form.get('AircraftCaption').value == null) {
      return this.form.get('AircraftCaption').value;
    } else {
      return 0;
    }
  }
  get CreateDate() {
    if (this.form.get('CreateDate').value == null) {
      return this.form.get('CreateDate').value;
    } else {
      return 0;
    }
  }
  get CreateDateCaption() {
    if (this.form.get('CreateDateCaption').value == null) {
      return this.form.get('CreateDateCaption').value;
    } else {
      return 0;
    }
  }
  get FlightNumber() {
    if (this.form.get('FlightNumber').value == null) {
      return this.form.get('FlightNumber').value;
    } else {
      return 0;
    }
  }
}
