import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecialServiceRequestManageComponent } from './special-service-request-manage.component';

describe('SpecialServiceRequestManageComponent', () => {
  let component: SpecialServiceRequestManageComponent;
  let fixture: ComponentFixture<SpecialServiceRequestManageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpecialServiceRequestManageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecialServiceRequestManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
