import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeoFlightContentManageComponent } from './seo-flight-content-manage.component';

describe('SeoFlightContentManageComponent', () => {
  let component: SeoFlightContentManageComponent;
  let fixture: ComponentFixture<SeoFlightContentManageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeoFlightContentManageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeoFlightContentManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
