import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CabinClassListComponent } from './cabin-class-list.component';

describe('CabinClassListComponent', () => {
  let component: CabinClassListComponent;
  let fixture: ComponentFixture<CabinClassListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CabinClassListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CabinClassListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
