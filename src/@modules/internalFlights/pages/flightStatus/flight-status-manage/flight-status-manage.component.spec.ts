import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightStatusManageComponent } from './flight-status-manage.component';

describe('FlightStatusManageComponent', () => {
  let component: FlightStatusManageComponent;
  let fixture: ComponentFixture<FlightStatusManageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlightStatusManageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlightStatusManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
