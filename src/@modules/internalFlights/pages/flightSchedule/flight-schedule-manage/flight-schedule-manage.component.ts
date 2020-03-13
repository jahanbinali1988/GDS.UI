import { Component, ViewChild } from '@angular/core';
import { FlightScheduleService } from 'internalFlightsServices/flightsSchedule/flight-schedule.service';
import { ActivatedRoute } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FlightsSchedule } from 'internalFlightsModels/ViewModel/FlightsSchedule';
import { OperationStatus } from 'app/common/models/Base/OperationStatus';

@Component({
  selector: 'app-flight-schedule-manage',
  templateUrl: './flight-schedule-manage.component.html',
  styleUrls: ['./flight-schedule-manage.component.scss']
})
export class FlightScheduleManageComponent {
  @ViewChild('startDatePicker') startDatePicker;
  @ViewChild('stopDatePicker') stopDatePicker;
  type = true;

  airlineRouteId: number;
  constructor(private flightScheduleService: FlightScheduleService, private route: ActivatedRoute, private notifier: NotifierService) {
    this.route.paramMap.subscribe(params => {
      if (+params.get('airlineRouteId') > 0) {
        this.airlineRouteId = +params.get('airlineRouteId');
      }
      this.flightScheduleService.Get(+params.get('id'))
      .subscribe(response => {
          const data = response.Data;
          this.form.patchValue({Id: data['Id']});
          this.form.patchValue({AirlineRouteId: data['AirlineRouteId']});
          this.airlineRouteId = data['AirlineRouteId'];
          this.form.patchValue({StartDate: new Date(data['StartDate'])});
          this.form.patchValue({StopDate: new Date(data['StopDate'])});
          this.form.patchValue({FlightNumber: data['FlightNumber']});
          this.form.patchValue({DepartureTime: data['DepartureTime']});
          this.form.patchValue({ArrivalTime: data['ArrivalTime']});
          this.form.patchValue({IsDeleted: data['IsDeleted']});
          this.form.patchValue({IsDisabled: data['IsDisabled']});
      });
    });
   }

  form = new FormGroup({
    Id: new FormControl('0', Validators.required),
    AirlineRouteId: new FormControl('', Validators.required),
    StartDate: new FormControl(),
    StopDate: new FormControl(),
    FlightNumber: new FormControl('', [Validators.required, Validators.maxLength(20)]),
    DepartureTime: new FormControl('', Validators.required),
    ArrivalTime: new FormControl('', Validators.required),
    IsDeleted: new FormControl('', Validators.required),
    IsDisabled: new FormControl('', Validators.required)
  });

  startDatePickerFocus(startDatePicker) {
    startDatePicker.open();
  }

  stopDatePickerFocus(stopDatePicker) {
     stopDatePicker.open();
  }

  public Create() {
    const flightSchadule: FlightsSchedule = {
      Id: this.form.get('Id').value,
      AirlineRouteId: this.form.get('AirlineRouteId').value,
      AirlineRouteCaption: '',
      StartDate: new Date(this.form.get('StartDate').value),
      StopDate: new Date(this.form.get('StopDate').value),
      FlightNumber: this.form.get('FlightNumber').value,
      DepartureTime: this.form.get('DepartureTime').value,
      ArrivalTime: this.form.get('ArrivalTime').value,
      IsDeleted: this.form.get('IsDeleted').value,
      IsDisabled: this.form.get('IsDisabled').value,
      StartDateCaption: this.form.get('StartDate').value,
      StopDateCaption: this.form.get('StopDate').value
    };
    this.flightScheduleService.Create(flightSchadule).subscribe( response => {
      const result: OperationStatus = response;
      if (result.Status === true) {
        this.notifier.notify( 'success',  result.Message );
      } else {
        this.notifier.notify( 'warning',  result.Message );
      }
    });
  }

  get Id() {
    if (this.form.get('Id').value == null) {
      return this.form.get('Id').value;
    } else {
      return 0;
    }
  }
  get AirlineRouteId() {
    if (this.form.get('AirlineRouteId').value == null) {
      return this.form.get('AirlineRouteId').value;
    } else {
      return 0;
    }
  }
  get StartDate() {
    return this.form.get('StartDate');
  }
  get StopDate() {
    return this.form.get('StopDate');
  }
  get FlightNumber() {
    return this.form.get('FlightNumber');
  }
  get DepartureTime() {
    return this.form.get('DepartureTime');
  }
  get ArrivalTime() {
    return this.form.get('ArrivalTime');
  }
  get IsDeleted() {
  return this.form.get('IsDeleted');
  }
  get IsDisabled() {
    return this.form.get('IsDisabled');
  }
}
