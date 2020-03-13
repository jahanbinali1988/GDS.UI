import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightManageComponent } from './flight-manage.component';

describe('FlightManageComponent', () => {
  let component: FlightManageComponent;
  let fixture: ComponentFixture<FlightManageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlightManageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlightManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
