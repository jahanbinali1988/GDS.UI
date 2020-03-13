import { TestBed, inject } from '@angular/core/testing';

import { BaggageUnitService } from './baggage-unit.service';

describe('BaggageUnitService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BaggageUnitService]
    });
  });

  it('should be created', inject([BaggageUnitService], (service: BaggageUnitService) => {
    expect(service).toBeTruthy();
  }));
});
