import { TestBed, inject } from '@angular/core/testing';

import { AirlineFareTypeService } from './airline-fare-type.service';

describe('AirlineFareTypeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AirlineFareTypeService]
    });
  });

  it('should be created', inject([AirlineFareTypeService], (service: AirlineFareTypeService) => {
    expect(service).toBeTruthy();
  }));
});
