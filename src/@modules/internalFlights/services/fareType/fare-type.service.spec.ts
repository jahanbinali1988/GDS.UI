import { TestBed, inject } from '@angular/core/testing';

import { FareTypeService } from './fare-type.service';

describe('FareTypeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FareTypeService]
    });
  });

  it('should be created', inject([FareTypeService], (service: FareTypeService) => {
    expect(service).toBeTruthy();
  }));
});
