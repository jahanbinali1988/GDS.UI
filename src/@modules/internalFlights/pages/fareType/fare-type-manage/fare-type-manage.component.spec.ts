import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FareTypeManageComponent } from './fare-type-manage.component';

describe('FareTypeManageComponent', () => {
  let component: FareTypeManageComponent;
  let fixture: ComponentFixture<FareTypeManageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FareTypeManageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FareTypeManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
