import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TravellerTypeListComponent } from './traveller-type-list.component';

describe('TravellerTypeListComponent', () => {
  let component: TravellerTypeListComponent;
  let fixture: ComponentFixture<TravellerTypeListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TravellerTypeListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TravellerTypeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
