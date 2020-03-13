import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AirlineManageComponent } from './airline-manage.component';

describe('AirlineManageComponent', () => {
  let component: AirlineManageComponent;
  let fixture: ComponentFixture<AirlineManageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AirlineManageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AirlineManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
