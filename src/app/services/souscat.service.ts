import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import {Souscategorie} from 'src/app/interface/souscategorie';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SouscatService {

  private sousCategorieCollection: AngularFirestoreCollection<Souscategorie>;

  constructor(private afs: AngularFirestore, private storage: AngularFireStorage,) {
    this.sousCategorieCollection = this.afs.collection<Souscategorie>('sousCategories');
  }

 
  addsouscategorie(souscategorie: Souscategorie,url){
    this.sousCategorieCollection.add(souscategorie)
    .then(async resp => {

      const imageUrl = await this.uploadFile(resp.id, url)

      this.sousCategorieCollection.doc(resp.id).update({
      
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


  getAllsouscategories(){  
       return this.sousCategorieCollection.snapshotChanges().pipe(
      map(sousCategories => {
        return sousCategories.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;

          return { id, ...data };
        });
      })
    );
   
   }

getsouscategorie(id: string) {
    return this.sousCategorieCollection.doc<Souscategorie>(id).valueChanges();
  }


updatesousCategorie(id: string, souscategorie: Souscategorie) {
    return this.sousCategorieCollection.doc<Souscategorie>(id).update(souscategorie);
  }
 

deletesouscategorie(id: string) {
    return this.sousCategorieCollection.doc(id).delete();
  }
  
  
  getsouscategories(id: string){
    return this.afs.collection("/sousCategories",ref=>ref.where("idcategorie","==",id)).snapshotChanges().pipe(
    map(actions => {
    return actions.map(a => {
    const data = a.payload.doc.data();
    const id = a.payload.doc.id;
    return { id, ...data };
    });
    })
    );
    }

}

