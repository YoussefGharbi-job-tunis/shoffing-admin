import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { map } from 'rxjs/operators';
import { sousCategorie } from '../../interfaces/sousCategorie';

@Injectable({
  providedIn: 'root'
})
export class SouscatService {

  private sousCategorieCollection: AngularFirestoreCollection<sousCategorie>;

  constructor(private afs: AngularFirestore, private storage: AngularFireStorage,) {
    this.sousCategorieCollection = this.afs.collection<sousCategorie>('sousCategories');
  }

 
  addSousCategorie(sousCategorie: sousCategorie,url){
    this.sousCategorieCollection.add(sousCategorie)
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
    
        const task = await this.storage.ref('subCatImages').child(id).put(file[0])
        return this.storage.ref(`subCatImages/${id}`).getDownloadURL().toPromise();
      
    }
  }


  getAllSousCategories(){  
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

getSousCategorie(id: string) {
    return this.sousCategorieCollection.doc<sousCategorie>(id).valueChanges();
  }


  async updateSousCategorie(id: string, sousCategorie: sousCategorie,url) {
  const imageUrl = await this.uploadFile(id, url)

  this.sousCategorieCollection.doc(id).update({
    name:sousCategorie.name,
    picture: imageUrl || sousCategorie.picture
  }).catch(error => {
  console.log(error);
})
  }
 

deleteSousCategorie(id: string) {
    return this.sousCategorieCollection.doc(id).delete();
  }
  
  
  getSousCategories(id: string){
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

