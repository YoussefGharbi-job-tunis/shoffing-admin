import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ListeSousCategoriePage } from './liste-sous-categorie.page';

describe('ListeSousCategoriePage', () => {
  let component: ListeSousCategoriePage;
  let fixture: ComponentFixture<ListeSousCategoriePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListeSousCategoriePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ListeSousCategoriePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
