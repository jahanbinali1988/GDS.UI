import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleUserAllocationComponent } from './role-user-allocation.component';

describe('RoleUserAllocationComponent', () => {
  let component: RoleUserAllocationComponent;
  let fixture: ComponentFixture<RoleUserAllocationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoleUserAllocationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoleUserAllocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
