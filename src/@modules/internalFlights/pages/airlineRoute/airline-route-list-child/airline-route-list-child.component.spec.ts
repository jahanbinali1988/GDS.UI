import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AirlineRouteListChildComponent } from './airline-route-list-child.component';

describe('AirlineRouteListChildComponent', () => {
  let component: AirlineRouteListChildComponent;
  let fixture: ComponentFixture<AirlineRouteListChildComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AirlineRouteListChildComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AirlineRouteListChildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
