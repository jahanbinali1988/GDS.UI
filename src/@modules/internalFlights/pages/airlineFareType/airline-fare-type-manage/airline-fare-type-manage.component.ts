import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { ValueText } from 'app/common/models/Base/ValueText';
import { AirlineFareTypeService } from 'internalFlightsServices/airlineFareType/airline-fare-type.service';
import { AirlineFareType } from 'internalFlightsModels/ViewModel/AirlineFareType';
import { OperationStatus } from 'app/common/models/Base/OperationStatus';

@Component({
  selector: 'app-airline-fare-type-manage',
  templateUrl: './airline-fare-type-manage.component.html',
  styleUrls: ['./airline-fare-type-manage.component.scss']
})
export class AirlineFareTypeManageComponent implements OnInit {
  AirlineItems: ValueText[] = [];
  FareTypesItems: ValueText[] = [];
  filteredOptions: Observable<ValueText[]>;

  form = new FormGroup({
    Id: new FormControl('0', Validators.required),
    AirlineId: new FormControl('', Validators.required),
    FareTypeId: new FormControl('', Validators.required),
    Code: new FormControl('', [ Validators.maxLength(50)]),
    Name: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    LatinName: new FormControl('', [Validators.maxLength(50)]),
    Description: new FormControl('', [Validators.maxLength(10)]),
    AirlineCaption: new FormControl('', Validators.required),
    FareTypeCaption: new FormControl('', Validators.required)
  });

  constructor(private airlineFareTypeService: AirlineFareTypeService,
     private route: ActivatedRoute, private notifier: NotifierService) {
      this.AirlineItems.length = 0;
      this.FareTypesItems.length = 0;

      this.route.paramMap.subscribe(params => {
        if (+params.get('id') > 0) {
          this.airlineFareTypeService.Get(+params.get('id'))
          .subscribe(response => {
              const data = response.Data;
              this.form.patchValue({Id: data['Id']});
              this.form.patchValue({FareTypeId: data['FareTypeId']});
              this.form.patchValue({AirlineId: data['AirlineId']});
              this.form.patchValue({Code: data['Code']});
              this.form.patchValue({Name: data['Name']});
              this.form.patchValue({LatinName: data['LatinName']});
              this.form.patchValue({Description: data['Description']});

              this.form.patchValue({AirlineCaption: data['AirlineCaption']});
              this.form.patchValue({FareTypeCaption: data['FareTypeCaption']});
          });
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

    this.form.controls.FareTypeCaption.valueChanges.pipe(
      startWith(''),
      map(value => {
        this.FareTypesItems.length = 0;
        this._filterFareType(value);
      })
    ).subscribe(response => {
      return response;
    });
  }

  autoCompleteAirlineOnChange(text) {
    this.form.patchValue({AirlineId:
      this.AirlineItems.find(c => c.Text === text).Value});
  }

  autoCompleteFareTypeOnChange(text) {
    this.form.patchValue({FareTypeId:
      this.FareTypesItems.find(c => c.Text === text).Value});
  }

  public Create() {
    const airlineFareType: AirlineFareType = {
      Id: this.form.get('Id').value,
      FareTypeId: this.form.get('FareTypeId').value,
      AirlineId: this.form.get('AirlineId').value,
      Code: this.form.get('Code').value,
      Name: this.form.get('Name').value,
      LatinName: this.form.get('LatinName').value,
      Description: this.form.get('Description').value,
      AirlineCaption: this.form.get('AirlineCaption').value,
      FareTypeCaption: this.form.get('FareTypeCaption').value
    };
    this.airlineFareTypeService.Create(airlineFareType).subscribe( response => {
      const result: OperationStatus = response;
      if (result.Status === true) {
        this.notifier.notify( 'success',  result.Message );
      } else {
        this.notifier.notify( 'warning',  result.Message );
      }
    });
  }

  private _filterAirLine(value: string): ValueText[] {
    const airlineItems: ValueText[] = [];
    this.airlineFareTypeService.Search_Airline(value).subscribe(response => {
      for (const key in response.Data) {
        if (response.Data.hasOwnProperty(key)) {
          airlineItems.push({Value: response.Data[key].Value, Text: response.Data[key].Text});
        }
      }
    });
    this.AirlineItems = airlineItems;
    return airlineItems;
  }

  private _filterFareType(value: string): ValueText[] {
    const fareTypeItems: ValueText[] = [];
    this.airlineFareTypeService.Search_FareType(value).subscribe(response => {
      for (const key in response.Data) {
        if (response.Data.hasOwnProperty(key)) {
          fareTypeItems.push({Value: response.Data[key].Value, Text: response.Data[key].Text});
        }
      }
    });
    this.FareTypesItems = fareTypeItems;
    return fareTypeItems;
  }

  get Id() {
    if (this.form.get('Id').value == null) {
      return this.form.get('Id').value;
    } else {
      return 0;
    }
  }
  get FareTypeId() {
    if (this.form.get('FareTypeId').value == null) {
      return this.form.get('FareTypeId').value;
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
  get Code() {
    return this.form.get('Code');
  }
  get LatinName() {
    return this.form.get('LatinName');
  }
  get Description() {
    return this.form.get('Description');
  }
  get AirlineCaption() {
    return this.form.get('AirlineCaption');
  }
  get FareTypeCaption() {
    return this.form.get('FareTypeCaption');
  }
}
