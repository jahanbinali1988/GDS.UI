import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FareTypeListComponent } from './fare-type-list.component';

describe('FareTypeListComponent', () => {
  let component: FareTypeListComponent;
  let fixture: ComponentFixture<FareTypeListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FareTypeListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FareTypeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
