import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RuleTypeListComponent } from './rule-type-list.component';

describe('RuleTypeListComponent', () => {
  let component: RuleTypeListComponent;
  let fixture: ComponentFixture<RuleTypeListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RuleTypeListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RuleTypeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
