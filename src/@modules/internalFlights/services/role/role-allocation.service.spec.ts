import { TestBed, inject } from '@angular/core/testing';

import { AllocationAccessService } from '../../../../../@modules/internalFlights/services/allocationAccess/role-allocation.service';

describe('AllocationAccessService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AllocationAccessService]
    });
  });

  it('should be created', inject([AllocationAccessService], (service: AllocationAccessService) => {
    expect(service).toBeTruthy();
  }));
});
