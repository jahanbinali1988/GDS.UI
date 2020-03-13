import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AirlineHolderManageComponent } from './airline-holder-manage.component';

describe('AirlineHolderManageComponent', () => {
  let component: AirlineHolderManageComponent;
  let fixture: ComponentFixture<AirlineHolderManageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AirlineHolderManageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AirlineHolderManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
