import { TestBed, inject } from '@angular/core/testing';

import { TravellerTypeService } from 'services/travellerType/traveller-type.service';

describe('TravellerTypeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TravellerTypeService]
    });
  });

  it('should be created', inject([TravellerTypeService], (service: TravellerTypeService) => {
    expect(service).toBeTruthy();
  }));
});
