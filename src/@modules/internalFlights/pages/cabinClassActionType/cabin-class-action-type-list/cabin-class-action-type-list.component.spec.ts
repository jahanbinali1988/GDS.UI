import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CabinClassActionTypeListComponent } from './cabin-class-action-type-list.component';

describe('CabinClassActionTypeListComponent', () => {
  let component: CabinClassActionTypeListComponent;
  let fixture: ComponentFixture<CabinClassActionTypeListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CabinClassActionTypeListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CabinClassActionTypeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
