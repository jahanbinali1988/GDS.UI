import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AirlineRouteManageComponent } from './airline-route-manage.component';

describe('AirlineRouteManageComponent', () => {
  let component: AirlineRouteManageComponent;
  let fixture: ComponentFixture<AirlineRouteManageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AirlineRouteManageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AirlineRouteManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
