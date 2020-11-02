import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddSousCategoriePage } from './add-sous-categorie.page';

describe('AddSousCategoriePage', () => {
  let component: AddSousCategoriePage;
  let fixture: ComponentFixture<AddSousCategoriePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddSousCategoriePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddSousCategoriePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
