import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-flight-registeration',
  templateUrl: './flight-registeration.component.html',
  styleUrls: ['./flight-registeration.component.scss']
})
export class FlightRegisterationComponent implements OnInit {
  isLinear = true;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;

  nameString: string;
  familyString: string;
  addressString: string;
  constructor(private _formBuilder: FormBuilder) {}

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      name: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      family: ['', Validators.required]
    });
    this.thirdFormGroup = this._formBuilder.group({
      address: ['', Validators.required]
    });
  }

  register() {
    this.nameString = this.firstFormGroup.get('name').value;
    this.familyString = this.secondFormGroup.get('family').value;
    this.addressString = this.thirdFormGroup.get('address').value;
    console.log(this.nameString);
    console.log(this.familyString);
    console.log(this.addressString);

    this.firstFormGroup.patchValue({name: ''});
    this.secondFormGroup.patchValue({family: ''});
    this.thirdFormGroup.patchValue({address: ''});
  }
}
