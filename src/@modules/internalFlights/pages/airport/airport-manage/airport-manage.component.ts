import { Component, OnInit } from '@angular/core';
import { NotifierService } from 'angular-notifier';
import { AirportService } from 'internalFlightsServices/Airport/Airport.service';
import { ValueText } from 'app/common/models/Base/ValueText';
import { Observable } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { startWith, map } from 'rxjs/operators';
import { Airport } from 'internalFlightsModels/ViewModel/Airport';
import { OperationStatus } from 'app/common/models/Base/OperationStatus';

@Component({
    selector: 'app-airport-manage',
    templateUrl: './airport-manage.component.html',
    styleUrls: ['./airport-manage.component.scss']
})
export class AirportManageComponent implements OnInit {
    DomesticItems: ValueText[] = [];
    LocationItems: ValueText[] = [];
    filteredOptions: Observable<ValueText[]>;

    form = new FormGroup({
        Id: new FormControl('0', Validators.required),
        Code: new FormControl('', [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(3)
        ]),
        Name: new FormControl('', [
            Validators.required,
            Validators.maxLength(300)
        ]),
        LatinName: new FormControl('', [
            Validators.required,
            Validators.maxLength(300)
        ]),
        DomesticStatusId: new FormControl('', Validators.required),
        LocationId: new FormControl('', Validators.required),
        Description: new FormControl('', Validators.maxLength(2000)),
        IsDisabled: new FormControl('false', Validators.required),
        IsDeleted: new FormControl('false', Validators.required),

        LocationCaption: new FormControl(''),
        DomesticStatusCaption: new FormControl('')
    });

    constructor(
        private airportService: AirportService,
        private route: ActivatedRoute,
        private notifier: NotifierService
    ) {
        this.DomesticItems.length = 0;
        this.LocationItems.length = 0;
        this.route.paramMap.subscribe(params => {
            if (+params.get('id') > 0) {
                this.airportService
                    .Get(+params.get('id'))
                    .subscribe(response => {
                        const data = response.Data;
                        this.form.patchValue({ Id: data['Id'] });
                        this.form.patchValue({ Code: data['Code'] });
                        this.form.patchValue({ Name: data['Name'] });
                        this.form.patchValue({ LatinName: data['LatinName'] });
                        this.form.patchValue({
                            DomesticStatusId: data['DomesticStatusId']
                        });
                        this.form.patchValue({
                            LocationId: data['LocationId']
                        });
                        this.form.patchValue({
                            Description: data['Description']
                        });
                        this.form.patchValue({
                            IsDisabled: data['IsDisabled']
                        });
                        this.form.patchValue({ IsDeleted: data['IsDeleted'] });

                        this.form.patchValue({
                            LocationCaption: data['LocationCaption']
                        });
                        this.form.patchValue({
                            DomesticStatusCaption: data['DomesticStatusCaption']
                        });
                    });
            }
        });

        this.airportService.Search_Domestic().subscribe(response => {
            for (const key in response.Data) {
                if (response.Data.hasOwnProperty(key)) {
                    this.DomesticItems.push({
                        Value: response.Data[key].Value,
                        Text: response.Data[key].Text
                    });
                }
            }
        });
    }

    ngOnInit() {
        this.LocationItems.length = 0;
        this.form.controls.LocationCaption.valueChanges
            .pipe(
                startWith(''),
                map(value => {
                    this._filter(value);
                })
            )
            .subscribe(response => {
                return response;
            });
    }

    public Create() {
        const airport: Airport = {
            Id: this.form.get('Id').value,
            Code: this.form.get('Code').value,
            Name: this.form.get('Name').value,
            LatinName: this.form.get('LatinName').value,
            DomesticStatusId: this.form.get('DomesticStatusId').value,
            LocationId: this.form.get('LocationId').value,
            Description: this.form.get('Description').value,
            IsDisabled: this.form.get('IsDisabled').value,
            IsDeleted: this.form.get('IsDeleted').value,
            LocationCaption: this.form.get('LocationCaption').value,
            DomesticStatusCaption: this.form.get('DomesticStatusCaption').value
        };
        this.airportService.Create(airport).subscribe(response => {
            const result: OperationStatus = response;
            if (result.Status === true) {
                this.notifier.notify('success', result.Message);
            } else {
                this.notifier.notify('warning', result.Message);
            }
        });
    }

    autoCompleteOnChange(text) {
        this.form.patchValue({
            LocationId: this.LocationItems.find(c => c.Text === text).Value
        });
    }

    private _filter(value: string): ValueText[] {
        const items: ValueText[] = [];
        this.airportService.Search_Locations(value).subscribe(response => {
            for (const key in response.Data) {
                if (response.Data.hasOwnProperty(key)) {
                    items.push({
                        Value: response.Data[key].Value,
                        Text: response.Data[key].Text
                    });
                }
            }
        });
        this.LocationItems = items;
        return items;
    }

    get Id() {
        return this.form.get('Id');
    }
    get Code() {
        return this.form.get('Code');
    }
    get Name() {
        return this.form.get('Name');
    }
    get LatinName() {
        return this.form.get('LatinName');
    }
    get DomesticStatusId() {
        if (this.form.get('DomesticStatusId').value == null) {
            return this.form.get('DomesticStatusId').value;
        } else {
            return 0;
        }
    }
    get LocationId() {
        if (this.form.get('LocationId').value == null) {
            return this.form.get('LocationId').value;
        } else {
            return 0;
        }
    }
    get Description() {
        return this.form.get('Description');
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
    get LocationCaption() {
        return this.form.get('LocationCaption');
    }
    get DomesticStatusCaption() {
        return this.form.get('DomesticStatusCaption');
    }
}
