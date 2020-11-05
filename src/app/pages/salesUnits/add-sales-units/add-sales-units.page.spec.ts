import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddSalesUnitsPage } from './add-sales-units.page';

describe('AddSalesUnitsPage', () => {
  let component: AddSalesUnitsPage;
  let fixture: ComponentFixture<AddSalesUnitsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddSalesUnitsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddSalesUnitsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
