import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RuleTypeManageComponent } from './rule-type-manage.component';

describe('RuleTypeManageComponent', () => {
  let component: RuleTypeManageComponent;
  let fixture: ComponentFixture<RuleTypeManageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RuleTypeManageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RuleTypeManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
