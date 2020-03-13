import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AirlineRouteListComponent } from './airline-route-list.component';

describe('AirlineRouteListComponent', () => {
  let component: AirlineRouteListComponent;
  let fixture: ComponentFixture<AirlineRouteListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AirlineRouteListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AirlineRouteListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
