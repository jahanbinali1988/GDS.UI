import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightScheduleManageComponent } from './flight-schedule-manage.component';

describe('FlightScheduleManageComponent', () => {
  let component: FlightScheduleManageComponent;
  let fixture: ComponentFixture<FlightScheduleManageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlightScheduleManageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlightScheduleManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
