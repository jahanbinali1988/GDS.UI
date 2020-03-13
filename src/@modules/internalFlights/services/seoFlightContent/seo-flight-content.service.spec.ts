import { TestBed, inject } from '@angular/core/testing';

import { SeoFlightContentService } from './seo-flight-content.service';

describe('SeoFlightContentService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SeoFlightContentService]
    });
  });

  it('should be created', inject([SeoFlightContentService], (service: SeoFlightContentService) => {
    expect(service).toBeTruthy();
  }));
});
