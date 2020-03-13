import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CabinClassActionTypeManageComponent } from './cabin-class-action-type-manage.component';

describe('CabinClassActionTypeManageComponent', () => {
  let component: CabinClassActionTypeManageComponent;
  let fixture: ComponentFixture<CabinClassActionTypeManageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CabinClassActionTypeManageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CabinClassActionTypeManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
