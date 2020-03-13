import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReserveStatusListComponent } from './reserve-status-list.component';

describe('ReserveStatusListComponent', () => {
  let component: ReserveStatusListComponent;
  let fixture: ComponentFixture<ReserveStatusListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReserveStatusListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReserveStatusListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
