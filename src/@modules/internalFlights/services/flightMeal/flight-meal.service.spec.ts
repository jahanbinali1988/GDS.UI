import { TestBed, inject } from '@angular/core/testing';

import { FlightMealService } from './flight-meal.service';

describe('FlightMealService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FlightMealService]
    });
  });

  it('should be created', inject([FlightMealService], (service: FlightMealService) => {
    expect(service).toBeTruthy();
  }));
});
