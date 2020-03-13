import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CabinClassTypeListComponent } from './cabin-class-type-list.component';

describe('CabinClassTypeListComponent', () => {
  let component: CabinClassTypeListComponent;
  let fixture: ComponentFixture<CabinClassTypeListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CabinClassTypeListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CabinClassTypeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
