import { TestBed, inject } from '@angular/core/testing';

import { FlightScheduleService } from './flight-schedule.service';

describe('FlightScheduleService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FlightScheduleService]
    });
  });

  it('should be created', inject([FlightScheduleService], (service: FlightScheduleService) => {
    expect(service).toBeTruthy();
  }));
});
