import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CabinClassManageComponent } from './cabin-class-manage.component';

describe('CabinClassManageComponent', () => {
  let component: CabinClassManageComponent;
  let fixture: ComponentFixture<CabinClassManageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CabinClassManageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CabinClassManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
