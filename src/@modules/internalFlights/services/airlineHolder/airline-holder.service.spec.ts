import { TestBed, inject } from '@angular/core/testing';

import { AirlineHolderService } from './airline-holder.service';

describe('AirlineHolderService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AirlineHolderService]
    });
  });

  it('should be created', inject([AirlineHolderService], (service: AirlineHolderService) => {
    expect(service).toBeTruthy();
  }));
});
