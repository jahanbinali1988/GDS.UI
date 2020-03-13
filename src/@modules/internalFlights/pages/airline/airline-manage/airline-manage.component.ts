import { Component, OnInit } from '@angular/core';
import { AirlineService } from 'internalFlightsServices/airline/airline.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { ValueText } from 'app/common/models/Base/ValueText';
import { Airline } from 'internalFlightsModels/ViewModel/Airline';
import { OperationStatus } from 'app/common/models/Base/OperationStatus';

@Component({
    selector: 'app-airline-manage',
    templateUrl: './airline-manage.component.html',
    styleUrls: ['./airline-manage.component.scss']
})
export class AirlineManageComponent implements OnInit {
    DomesticItems: ValueText[] = [];
    AirlineHolderItems: ValueText[] = [];
    filteredOptions: Observable<ValueText[]>;

    form = new FormGroup({
        Id: new FormControl('0', Validators.required),
        AirlineHolderId: new FormControl('', Validators.required),
        Name: new FormControl('', [
            Validators.required,
            Validators.maxLength(200)
        ]),
        LatinName: new FormControl('', [
            Validators.required,
            Validators.maxLength(200),
            Validators.pattern('[a-zA-Z ]*')
        ]),
        IataCode: new FormControl('', [
            Validators.required,
            Validators.minLength(2),
            Validators.maxLength(2),
            Validators.pattern('[a-zA-Z ]*')
        ]),
        DesignatorCode: new FormControl('', [
            Validators.minLength(3),
            Validators.maxLength(3),
            Validators.pattern('[a-zA-Z ]*')
        ]),
        DomesticStatusId: new FormControl('', Validators.required),
        IsDisabled: new FormControl('false', Validators.required),
        IsDeleted: new FormControl('false', Validators.required),

        AirlineHolderCaption: new FormControl(''),
        DomesticStatusCaption: new FormControl('')
    });

    constructor(
        private airlineService: AirlineService,
        private route: ActivatedRoute,
        private notifier: NotifierService
    ) {
        this.route.paramMap.subscribe(params => {
            if (+params.get('id') > 0) {
                this.airlineService
                    .Get(+params.get('id'))
                    .subscribe(response => {
                        const data = response.Data;
                        this.form.patchValue({ Id: data['Id'] });
                        this.form.patchValue({
                            AirlineHolderId: data['AirlineHolderId']
                        });
                        this.form.patchValue({ Name: data['Name'] });
                        this.form.patchValue({ LatinName: data['LatinName'] });
                        this.form.patchValue({ IataCode: data['IataCode'] });
                        this.form.patchValue({
                            DesignatorCode: data['DesignatorCode']
                        });
                        this.form.patchValue({
                            DomesticStatusId: data['DomesticStatusId']
                        });
                        this.form.patchValue({
                            IsDisabled: data['IsDisabled']
                        });
                        this.form.patchValue({ IsDeleted: data['IsDeleted'] });

                        this.form.patchValue({
                            AirlineHolderCaption: data['AirlineHolderCaption']
                        });
                        this.form.patchValue({
                            DomesticStatusCaption: data['DomesticStatusCaption']
                        });
                    });
            }
        });

        this.airlineService.Search_Domestic().subscribe(response => {
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
        this.form.controls.AirlineHolderCaption.valueChanges
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

    autoCompleteOnChange(text) {
        this.form.patchValue({
            AirlineHolderId: this.AirlineHolderItems.find(c => c.Text === text)
                .Value
        });
    }

    public Create() {
        const airline: Airline = {
            Id: this.form.get('Id').value,
            Name: this.form.get('Name').value,
            AirlineHolderId: this.form.get('AirlineHolderId').value,
            LatinName: this.form.get('LatinName').value,
            IataCode: this.form.get('IataCode').value,
            DesignatorCode: this.form.get('DesignatorCode').value,
            DomesticStatusId: this.form.get('DomesticStatusId').value,
            AirlineHolderCaption: this.form.get('AirlineHolderCaption').value,
            DomesticStatusCaption: this.form.get('DomesticStatusCaption').value,
            IsDisabled: this.form.get('IsDisabled').value,
            IsDeleted: this.form.get('IsDeleted').value
        };
        this.airlineService.Create(airline).subscribe(response => {
            const result: OperationStatus = response;
            if (result.Status === true) {
                this.notifier.notify('success', result.Message);
            } else {
                this.notifier.notify('warning', result.Message);
            }
        });
    }

    private _filter(value: string): ValueText[] {
        const items: ValueText[] = [];
        this.airlineService.Search_AirlineHolder(value).subscribe(response => {
            for (const key in response.Data) {
                if (response.Data.hasOwnProperty(key)) {
                    items.push({
                        Value: response.Data[key].Value,
                        Text: response.Data[key].Text
                    });
                }
            }
        });
        this.AirlineHolderItems = items;
        return items;
    }

    get Id() {
        if (this.form.get('Id').value == null) {
            return this.form.get('Id').value;
        } else {
            return 0;
        }
    }
    get AirlineHolderId() {
        if (this.form.get('AirlineHolderId').value == null) {
            return this.form.get('AirlineHolderId').value;
        } else {
            return 0;
        }
    }
    get Name() {
        return this.form.get('Name');
    }
    get LatinName() {
        return this.form.get('LatinName');
    }
    get IataCode() {
        return this.form.get('IataCode');
    }
    get DesignatorCode() {
        return this.form.get('DesignatorCode');
    }
    get DomesticStatusId() {
        if (this.form.get('DomesticStatusId').value == null) {
            return this.form.get('DomesticStatusId').value;
        } else {
            return 0;
        }
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
    get AirlineHolderCaption() {
        return this.form.get('AirlineHolderCaption');
    }
    get DomesticStatusCaption() {
        return this.form.get('DomesticStatusCaption');
    }
}
