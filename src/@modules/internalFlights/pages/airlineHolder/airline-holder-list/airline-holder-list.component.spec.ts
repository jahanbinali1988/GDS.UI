import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AirlineHolderListComponent } from './airline-holder-list.component';

describe('AirlineHolderListComponent', () => {
  let component: AirlineHolderListComponent;
  let fixture: ComponentFixture<AirlineHolderListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AirlineHolderListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AirlineHolderListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
