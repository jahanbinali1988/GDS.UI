import { TestBed, inject } from '@angular/core/testing';

import { CabinClassService } from './cabin-class.service';

describe('CabinClassService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CabinClassService]
    });
  });

  it('should be created', inject([CabinClassService], (service: CabinClassService) => {
    expect(service).toBeTruthy();
  }));
});
