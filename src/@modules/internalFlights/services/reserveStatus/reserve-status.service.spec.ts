import { TestBed, inject } from '@angular/core/testing';

import { ReserveStatusService } from './reserve-status.service';

describe('ReserveStatusService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ReserveStatusService]
    });
  });

  it('should be created', inject([ReserveStatusService], (service: ReserveStatusService) => {
    expect(service).toBeTruthy();
  }));
});
