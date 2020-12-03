import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ListCommandePage } from './list-commande.page';

describe('ListCommandePage', () => {
  let component: ListCommandePage;
  let fixture: ComponentFixture<ListCommandePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListCommandePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ListCommandePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
