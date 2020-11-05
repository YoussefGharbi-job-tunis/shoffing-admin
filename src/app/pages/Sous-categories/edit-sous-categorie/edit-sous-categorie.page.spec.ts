import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EditSousCategoriePage } from './edit-sous-categorie.page';

describe('EditSousCategoriePage', () => {
  let component: EditSousCategoriePage;
  let fixture: ComponentFixture<EditSousCategoriePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditSousCategoriePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EditSousCategoriePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
