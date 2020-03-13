import { TestBed, inject } from '@angular/core/testing';

import { SpecialServiceRequestService } from './special-service-request.service';

describe('SpecialServiceRequestService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SpecialServiceRequestService]
    });
  });

  it('should be created', inject([SpecialServiceRequestService], (service: SpecialServiceRequestService) => {
    expect(service).toBeTruthy();
  }));
});
