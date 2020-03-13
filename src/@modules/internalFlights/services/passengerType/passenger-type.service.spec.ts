import { TestBed, inject } from '@angular/core/testing';

import { PassengerTypeService } from './passenger-type.service';

describe('PassengerTypeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PassengerTypeService]
    });
  });

  it('should be created', inject([PassengerTypeService], (service: PassengerTypeService) => {
    expect(service).toBeTruthy();
  }));
});
