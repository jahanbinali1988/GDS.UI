import { TestBed, inject } from '@angular/core/testing';

import { CabinClassActionTypeService } from './cabin-class-action-type.service';

describe('CabinClassActionTypeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CabinClassActionTypeService]
    });
  });

  it('should be created', inject([CabinClassActionTypeService], (service: CabinClassActionTypeService) => {
    expect(service).toBeTruthy();
  }));
});
