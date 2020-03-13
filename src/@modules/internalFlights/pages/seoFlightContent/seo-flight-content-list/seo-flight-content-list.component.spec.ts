import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeoFlightContentListComponent } from './seo-flight-content-list.component';

describe('SeoFlightContentListComponent', () => {
  let component: SeoFlightContentListComponent;
  let fixture: ComponentFixture<SeoFlightContentListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeoFlightContentListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeoFlightContentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
