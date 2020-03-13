import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightRegisterationComponent } from './flight-registeration.component';

describe('FlightRegisterationComponent', () => {
  let component: FlightRegisterationComponent;
  let fixture: ComponentFixture<FlightRegisterationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlightRegisterationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlightRegisterationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
