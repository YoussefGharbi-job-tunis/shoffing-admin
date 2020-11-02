import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { Categorie } from '../interface/categorie';
import { AngularFireStorage } from "@angular/fire/storage";
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class CategorieService {

  private CategorieCollection: AngularFirestoreCollection<Categorie>;

  constructor(private afs: AngularFirestore, private storage: AngularFireStorage,) {
    this.CategorieCollection = this.afs.collection<Categorie>('Categorie');
  }

  getCategorie() {
    return this.CategorieCollection.snapshotChanges().pipe(
      map(Categories => {
        return Categories.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;

          return { id, ...data };
        });
      })
    );
  }

  addcategorie(categorie: Categorie,url){
    this.CategorieCollection.add(categorie)
    .then(async resp => {

      const imageUrl = await this.uploadFile(resp.id, url)

      this.CategorieCollection.doc(resp.id).update({
      
        picture: imageUrl || null
      })
    }).catch(error => {
      console.log(error);
    })
  }

  async uploadFile(id, file) {
    if(file && file.length) {
    
        const task = await this.storage.ref('images').child(id).put(file[0])
        return this.storage.ref(`images/${id}`).getDownloadURL().toPromise();
      
    }
  }


  getAllcategorie(id: string){  
    
    return this.CategorieCollection.snapshotChanges().pipe(
      map(Categories => {
        return Categories.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;

          return { id, ...data };
        });
      })
    );
   
   }

  getcategorie(id: string) {
    return this.CategorieCollection.doc<Categorie>(id).valueChanges();
  }


updateCategorie(id: string, categorie: Categorie) {
    return this.CategorieCollection.doc<Categorie>(id).update(categorie);
  }
 

  deletecategorie(id: string) {
    return this.CategorieCollection.doc(id).delete();
  }
}