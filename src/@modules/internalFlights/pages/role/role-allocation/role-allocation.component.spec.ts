import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RoleAlocationComponent } from 'pages/role/role-allocation/role-allocation.component';

describe('RoleAlocationComponent', () => {
  let component: RoleAlocationComponent;
  let fixture: ComponentFixture<RoleAlocationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoleAlocationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoleAlocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
