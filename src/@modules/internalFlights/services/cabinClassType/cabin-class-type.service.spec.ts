import { TestBed, inject } from '@angular/core/testing';

import { CabinClassTypeService } from './cabin-class-type.service';

describe('CabinClassTypeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CabinClassTypeService]
    });
  });

  it('should be created', inject([CabinClassTypeService], (service: CabinClassTypeService) => {
    expect(service).toBeTruthy();
  }));
});
