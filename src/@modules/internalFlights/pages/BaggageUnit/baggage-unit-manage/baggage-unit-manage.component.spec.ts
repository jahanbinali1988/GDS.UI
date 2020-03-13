import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BaggageUnitManageComponent } from './baggage-unit-manage.component';

describe('BaggageUniyManageComponent', () => {
  let component: BaggageUnitManageComponent;
  let fixture: ComponentFixture<BaggageUnitManageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BaggageUnitManageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BaggageUnitManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
