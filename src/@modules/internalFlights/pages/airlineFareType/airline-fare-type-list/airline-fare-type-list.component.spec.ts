import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AirlineFareTypeListComponent } from './airline-fare-type-list.component';

describe('AirlineFareTypeListComponent', () => {
  let component: AirlineFareTypeListComponent;
  let fixture: ComponentFixture<AirlineFareTypeListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AirlineFareTypeListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AirlineFareTypeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
