import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReserveStatusManageComponent } from './reserve-status-manage.component';

describe('ReserveStatusManageComponent', () => {
  let component: ReserveStatusManageComponent;
  let fixture: ComponentFixture<ReserveStatusManageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReserveStatusManageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReserveStatusManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
