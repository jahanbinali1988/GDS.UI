import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TravellerTypeManageComponent } from 'pages/travellerType/traveller-type-manage/traveller-type-manage.component';

describe('TravellerTypeManageComponent', () => {
  let component: TravellerTypeManageComponent;
  let fixture: ComponentFixture<TravellerTypeManageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TravellerTypeManageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TravellerTypeManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
