import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NotifierService } from 'angular-notifier';
import { ActivatedRoute } from '@angular/router';
import { CabinClassService } from 'internalFlightsServices/cabinClass/cabin-class.service';
import { ValueText } from 'app/common/models/Base/ValueText';
import { startWith, map } from 'rxjs/operators';
import { CabinClass } from 'internalFlightsModels/ViewModel/CabinClass';
import { OperationStatus } from 'app/common/models/Base/OperationStatus';

@Component({
  selector: 'app-cabin-class-manage',
  templateUrl: './cabin-class-manage.component.html',
  styleUrls: ['./cabin-class-manage.component.scss']
})
export class CabinClassManageComponent implements OnInit {
  CabinClassTypeItems: ValueText[];
  AirlineItems: ValueText[];
  form = new FormGroup({
    Id: new FormControl('0', Validators.required),
    AirlineId: new FormControl('', Validators.required),
    CabinClassTypeId: new FormControl('', Validators.required),
    Code: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    Name: new FormControl('', Validators.maxLength(50)),
    Description: new FormControl('', Validators.maxLength(200)),

    AirlineCaption: new FormControl('', Validators.required),
    CabinClassTypeCaption: new FormControl('', Validators.required)
  });

  constructor(private cabinClassService: CabinClassService, private route: ActivatedRoute, private notifier: NotifierService) {
      this.route.paramMap.subscribe(params => {
        if (+params.get('id') > 0) {
          this.cabinClassService.Get(+params.get('id'))
          .subscribe(response => {
              const data = response.Data;
              this.form.patchValue({Id: data['Id']});
              this.form.patchValue({Code: data['Code']});
              this.form.patchValue({Name: data['Name']});
              this.form.patchValue({AirlineId: data['AirlineId']});
              this.form.patchValue({CabinClassTypeId: data['CabinClassTypeId']});
              this.form.patchValue({AirlineCaption: data['AirlineCaption']});
              this.form.patchValue({CabinClassTypeCaption: data['CabinClassTypeCaption']});
              this.form.patchValue({Description: data['Description']});
          });
        }
    });
  }

  ngOnInit() {
    this.form.controls.AirlineCaption.valueChanges.pipe(
       startWith(''),
       map(value => {
         this._filterAirLine(value);
       })
     ).subscribe(response => {
       return response;
     });

     this.form.controls.CabinClassTypeCaption.valueChanges.pipe(
       startWith(''),
       map(value => {
         this._filterCabinClassType(value);
       })
     ).subscribe(response => {
       return response;
     });
   }

   autoCompleteAirlineOnChange(text) {
     this.form.patchValue({AirlineId:
       this.AirlineItems.find(c => c.Text === text).Value});
   }

   autoCompleteCabinClassOnChange(text) {
     this.form.patchValue({CabinClassTypeId:
       this.CabinClassTypeItems.find(c => c.Text === text).Value});
   }

  public Create() {
    const cabinClass: CabinClass = {
      Id: this.form.get('Id').value,
      Code: this.form.get('Code').value,
      Name: this.form.get('Name').value,
      AirlineId: this.form.get('AirlineId').value,
      CabinClassTypeId: this.form.get('CabinClassTypeId').value,
      AirlineCaption: this.form.get('AirlineCaption').value,
      CabinClassTypeCaption: this.form.get('CabinClassTypeCaption').value,
      Description: this.form.get('Description').value
    };
    this.cabinClassService.Create(cabinClass).subscribe( response => {
      const result: OperationStatus = response;
      if (result.Status === true) {
        this.notifier.notify( 'success',  result.Message );
      } else {
        this.notifier.notify( 'warning',  result.Message );
      }
    });
  }

  private _filterAirLine(value: string): ValueText[] {
    const airlines: ValueText[] = [];
    this.cabinClassService.Search_Airline(value).subscribe(response => {
      for (const key in response.Data) {
        if (response.Data.hasOwnProperty(key)) {
          airlines.push({Value: response.Data[key].Value, Text: response.Data[key].Text});
        }
      }
    });
    this.AirlineItems = airlines;
    return airlines;
  }

  private _filterCabinClassType(value: string): ValueText[] {
    const cabinClassTypes: ValueText[] = [];
    this.cabinClassService.Search_CabinClassType(value).subscribe(response => {
      for (const key in response.Data) {
        if (response.Data.hasOwnProperty(key)) {
          cabinClassTypes.push({Value: response.Data[key].Value, Text: response.Data[key].Text});
        }
      }
    });
    this.CabinClassTypeItems = cabinClassTypes;
    return cabinClassTypes;
  }

  get Id() {
    if (this.form.get('Id').value == null) {
      return this.form.get('Id').value;
    } else {
      return 0;
    }
  }
  get Code() {
    return this.form.get('Code');
  }
  get Name() {
    return this.form.get('Name');
  }
  get AirlineId() {
    if (this.form.get('AirlineId').value == null) {
      return this.form.get('AirlineId').value;
    } else {
      return 0;
    }
  }
  get CabinClassTypeId() {
    if (this.form.get('CabinClassTypeId').value == null) {
      return this.form.get('CabinClassTypeId').value;
    } else {
      return 0;
    }
  }
  get AirlineCaption() {
    return this.form.get('AirlineCaption');
  }
  get CabinClassTypeCaption() {
    return this.form.get('CabinClassTypeCaption');
  }
  get Description() {
  return this.form.get('Description');
  }
}
