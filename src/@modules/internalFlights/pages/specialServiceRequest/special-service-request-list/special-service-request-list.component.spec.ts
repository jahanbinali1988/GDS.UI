import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecialServiceRequestListComponent } from './special-service-request-list.component';

describe('SpecialServiceRequestListComponent', () => {
  let component: SpecialServiceRequestListComponent;
  let fixture: ComponentFixture<SpecialServiceRequestListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpecialServiceRequestListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecialServiceRequestListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
