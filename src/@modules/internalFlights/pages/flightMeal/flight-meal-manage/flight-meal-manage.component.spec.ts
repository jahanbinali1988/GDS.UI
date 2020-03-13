import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightMealManageComponent } from './flight-meal-manage.component';

describe('FlightMealManageComponent', () => {
  let component: FlightMealManageComponent;
  let fixture: ComponentFixture<FlightMealManageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlightMealManageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlightMealManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
