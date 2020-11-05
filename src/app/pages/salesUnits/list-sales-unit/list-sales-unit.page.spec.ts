import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ListSalesUnitPage } from './list-sales-unit.page';

describe('ListSalesUnitPage', () => {
  let component: ListSalesUnitPage;
  let fixture: ComponentFixture<ListSalesUnitPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListSalesUnitPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ListSalesUnitPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
