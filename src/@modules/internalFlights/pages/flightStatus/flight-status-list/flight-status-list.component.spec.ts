import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightStatusListComponent } from './flight-status-list.component';

describe('FlightStatusListComponent', () => {
  let component: FlightStatusListComponent;
  let fixture: ComponentFixture<FlightStatusListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlightStatusListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlightStatusListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
