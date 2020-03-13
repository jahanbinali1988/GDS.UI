import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BaggageUnitListComponent } from './baggage-unit-list.component';

describe('BaggageUnitListComponent', () => {
  let component: BaggageUnitListComponent;
  let fixture: ComponentFixture<BaggageUnitListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BaggageUnitListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BaggageUnitListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
