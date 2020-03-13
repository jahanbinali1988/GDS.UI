import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CabinClassTypeManageComponent } from './cabin-class-type-manage.component';

describe('CabinClassTypeManageComponent', () => {
  let component: CabinClassTypeManageComponent;
  let fixture: ComponentFixture<CabinClassTypeManageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CabinClassTypeManageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CabinClassTypeManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
