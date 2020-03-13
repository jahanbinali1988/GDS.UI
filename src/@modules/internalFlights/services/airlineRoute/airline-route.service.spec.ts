import { TestBed, inject } from '@angular/core/testing';

import { AirlineRouteService } from './airline-route.service';

describe('AirlineRouteService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AirlineRouteService]
    });
  });

  it('should be created', inject([AirlineRouteService], (service: AirlineRouteService) => {
    expect(service).toBeTruthy();
  }));
});
