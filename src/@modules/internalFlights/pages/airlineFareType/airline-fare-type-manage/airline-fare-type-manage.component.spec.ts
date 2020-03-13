import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AirlineFareTypeManageComponent } from './airline-fare-type-manage.component';

describe('AirlineFareTypeManageComponent', () => {
  let component: AirlineFareTypeManageComponent;
  let fixture: ComponentFixture<AirlineFareTypeManageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AirlineFareTypeManageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AirlineFareTypeManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
