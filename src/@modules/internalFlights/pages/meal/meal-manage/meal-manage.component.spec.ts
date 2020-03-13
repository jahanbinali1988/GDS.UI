import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MealManageComponent } from './meal-manage.component';

describe('MealManageComponent', () => {
  let component: MealManageComponent;
  let fixture: ComponentFixture<MealManageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MealManageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MealManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
