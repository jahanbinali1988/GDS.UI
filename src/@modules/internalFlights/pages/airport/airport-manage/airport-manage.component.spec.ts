import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AirportManageComponent } from './airport-manage.component';

describe('AirportManageComponent', () => {
  let component: AirportManageComponent;
  let fixture: ComponentFixture<AirportManageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AirportManageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AirportManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
