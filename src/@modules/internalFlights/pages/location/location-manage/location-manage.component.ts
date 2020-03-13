import { Component, OnInit } from '@angular/core';
import { ValueText } from 'app/common/models/Base/ValueText';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LocationService } from 'internalFlightsServices/location/location.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { startWith, map } from 'rxjs/operators';
import { Location } from 'internalFlightsModels/ViewModel/Location';
import { OperationStatus } from 'app/common/models/Base/OperationStatus';

@Component({
  selector: 'app-location-manage',
  templateUrl: './location-manage.component.html',
  styleUrls: ['./location-manage.component.scss']
})
export class LocationManageComponent implements OnInit {
  LocationTypes: ValueText[] = [];
  Locations: ValueText[] = [];
  form = new FormGroup({
    Id: new FormControl('0', Validators.required),
    Name: new FormControl('', [Validators.required, Validators.maxLength(150)]),
    LatinName: new FormControl('', Validators.maxLength(150)),
    ParentId: new FormControl(''),
    LocationTypeId: new FormControl('', Validators.required),
    nickname: new FormControl('', Validators.maxLength(150)),
    Iso: new FormControl('', [Validators.minLength(2), Validators.maxLength(2)]),
    Iso3: new FormControl('', [Validators.minLength(3), Validators.maxLength(3)]),
    Code: new FormControl('', Validators.maxLength(10)),
    Priority: new FormControl(''),
    Description: new FormControl('', [Validators.required, Validators.maxLength(500)]),
    IsCapital: new FormControl('false', Validators.required),
    IsDomestic: new FormControl('false'),
    IsDisabled: new FormControl('false', Validators.required),
    IsDeleted: new FormControl('false', Validators.required),

    parentCaption: new FormControl(''),
    locationTypeCaption: new FormControl('')
  });

  constructor(private locationService: LocationService, private route: ActivatedRoute, private notifier: NotifierService) {
    this.route.paramMap.subscribe(params => {
      if (+params.get('id') > 0) {
        this.locationService.Get(+params.get('id'))
        .subscribe(response => {
            const data = response.Data;
            this.form.patchValue({Id: data['Id']});
            this.form.patchValue({Name: data['Name']});
            this.form.patchValue({LatinName: data['LatinName']});
            this.form.patchValue({ParentId: data['ParentId']});
            this.form.patchValue({LocationTypeId: data['LocationTypeId']});
            this.form.patchValue({nickname: data['nickname']});
            this.form.patchValue({Iso: data['Iso']});
            this.form.patchValue({Iso3: data['Iso3']});
            this.form.patchValue({Code: data['Code']});
            this.form.patchValue({Priority: data['Priority']});
            this.form.patchValue({Description: data['Description']});
            this.form.patchValue({IsCapital: data['IsCapital']});
            this.form.patchValue({IsDomestic: data['IsDomestic']});
            this.form.patchValue({IsDisabled: data['IsDisabled']});
            this.form.patchValue({IsDeleted: data['IsDeleted']});

            this.form.patchValue({parentCaption: data['parentCaption']});
            this.form.patchValue({locationTypeCaption: data['locationTypeCaption']});
        });
      }
    });

    // fill locationType dropdown
    this.locationService.Search_LocationTypes()
    .subscribe(response => {
      for (const key in response.Data) {
        if (response.Data.hasOwnProperty(key)) {
          this.LocationTypes.push({Value: response.Data[key].Value, Text: response.Data[key].Text} );
        }
      }
    });
  }

  ngOnInit() {
    this.form.controls.parentCaption.valueChanges.pipe(
       startWith(''),
       map(value => {
         this._filter(value);
       })
     ).subscribe(response => {
       return response;
     });
   }

   public Create() {
    const location: Location = {
      Id: this.form.get('Id').value,
      Name: this.form.get('Name').value,
      LatinName: this.form.get('LatinName').value,
      ParentId: this.form.get('ParentId').value,
      LocationTypeId: this.form.get('LocationTypeId').value,
      nickname: this.form.get('nickname').value,
      Iso: this.form.get('Iso').value,
      Iso3: this.form.get('Iso3').value,
      Code: this.form.get('Code').value,
      Priority: this.form.get('Priority').value,
      Description: this.form.get('Description').value,
      IsCapital: this.form.get('IsCapital').value,
      IsDomestic: this.form.get('IsDomestic').value,
      IsDisabled: this.form.get('IsDisabled').value,
      IsDeleted: this.form.get('IsDeleted').value,
      parentCaption: '',
      locationTypeCaption: ''
    };
    this.locationService.Create(location).subscribe( response => {
      const result: OperationStatus = response;
      if (result.Status === true) {
        this.notifier.notify( 'success',  result.Message );
      } else {
        this.notifier.notify( 'warning',  result.Message );
      }
    });
  }

  dropdownOnChange(value) {
    this.form.patchValue({LocationTypeId: value});
    this._filter('');
  }

  autoCompleteOnChange(text) {
    const _parent = this.Locations.find(c => c.Text === text);
    this.form.patchValue({parentCaption: _parent.Text});
    this.form.patchValue({ParentId: _parent.Value});
    this._filter('');
  }

  private _filter(value: string): ValueText[] {
    const _locationTypeId = this.form.get('LocationTypeId').value;
    const items: ValueText[] = [];
    this.locationService.Search_Locations(_locationTypeId, value).subscribe(response => {
      for (const key in response.Data) {
        if (response.Data.hasOwnProperty(key)) {
          items.push({Value: response.Data[key].Value, Text: response.Data[key].Text});
        }
      }
    });
    this.Locations = items;
    return items;
  }

  get Name() {
    return this.form.get('Name');
  }
  get LatinName() {
    return this.form.get('LatinName');
  }
  get ParentId() {
    if (this.form.get('ParentId').value == null) {
      return this.form.get('ParentId').value;
    } else {
      return 0;
    }
  }
  get nickname() {
    return this.form.get('nickname');
  }
  get LocationTypeId() {
    if (this.form.get('LocationTypeId').value == null) {
      return this.form.get('LocationTypeId').value;
    } else {
      return 0;
    }
  }
  get Iso() {
    return this.form.get('Iso');
  }
  get Iso3() {
    return this.form.get('Iso3');
  }
  get Code() {
    return this.form.get('Code');
  }
  get Priority() {
    if (this.form.get('Priority').value == null) {
      return this.form.get('Priority').value;
    } else {
      return 0;
    }
  }
  get Description() {
    return this.form.get('Description');
  }
  get IsCapital() {
    return this.form.get('IsCapital');
  }
  get IsDomestic() {
    return this.form.get('IsDomestic');
  }
  get IsDisabled() {
    return this.form.get('IsDisabled');
  }
  get IsDeleted() {
    return this.form.get('IsDeleted');
  }
  get parentCaption() {
    return this.form.get('parentCaption');
  }
  get locationTypeCaption() {
    return this.form.get('locationTypeCaption');
  }
}
