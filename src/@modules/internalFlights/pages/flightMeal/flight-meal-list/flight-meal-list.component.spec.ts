import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightMealListComponent } from './flight-meal-list.component';

describe('FlightMealListComponent', () => {
  let component: FlightMealListComponent;
  let fixture: ComponentFixture<FlightMealListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlightMealListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlightMealListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
