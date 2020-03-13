import { TestBed, inject } from '@angular/core/testing';

import { RuleTypeService } from './rule-type.service';

describe('RuleTypeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RuleTypeService]
    });
  });

  it('should be created', inject([RuleTypeService], (service: RuleTypeService) => {
    expect(service).toBeTruthy();
  }));
});
