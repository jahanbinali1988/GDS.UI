import { TestBed, inject } from '@angular/core/testing';

import { AircraftService } from './aircraft.service';

describe('AircraftService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AircraftService]
    });
  });

  it('should be created', inject([AircraftService], (service: AircraftService) => {
    expect(service).toBeTruthy();
  }));
});
