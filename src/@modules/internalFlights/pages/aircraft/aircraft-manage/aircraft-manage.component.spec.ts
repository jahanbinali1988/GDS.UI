import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AircraftManageComponent } from './aircraft-manage.component';

describe('AircraftManageComponent', () => {
  let component: AircraftManageComponent;
  let fixture: ComponentFixture<AircraftManageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AircraftManageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AircraftManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
