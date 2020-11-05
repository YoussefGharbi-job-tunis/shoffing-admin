import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { Product } from 'src/app/interfaces/product';
import { AngularFireStorage } from '@angular/fire/storage';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProdService {
  private productsCollection: AngularFirestoreCollection<Product>;
  snapshotChangesSubscription:Subscription
  constructor(private afs: AngularFirestore, private storage: AngularFireStorage) {
    this.productsCollection = this.afs.collection<Product>('Products');
  }


  addProduct(product: Product,url){
    this.productsCollection.add(product)
    .then(async resp => {

      const imageUrl = await this.uploadFile(resp.id, url)

      this.productsCollection.doc(resp.id).update({
      
        picture: imageUrl || null
      })
    }).catch(error => {
      console.log(error);
    })
  }

  async uploadFile(id, file) {
    if(file && file.length) {
    
        const task = await this.storage.ref('prodImages').child(id).put(file[0])
        return this.storage.ref(`prodImages/${id}`).getDownloadURL().toPromise();
      
    }
  }
  
  getProduct(id: string) {
    return this.productsCollection.doc<Product>(id).valueChanges();
  }

  getProducts(){
      return this.productsCollection.snapshotChanges().pipe(
        map(actions => {
          return actions.map(a => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
  
            return { id, ...data };
          });
        })
      );
    }

 
     
  



  updateProduct(id: string, product: Product,url) {
    this.productsCollection.doc<Product>(id).update(product)
    .then(async resp => {

      const imageUrl = await this.uploadFile(id, url)

      this.productsCollection.doc(id).update({
      
        picture: imageUrl || product.picture
      })
    }).catch(error => {
      console.log(error);
    })
    
  }
 /* updateAmount(id:string,amount:number){
    return this.productsCollection.doc<Product>(id).update({ totalamount: amount});
  }*/

  

  deleteProduct(id: string) {
    return this.productsCollection.doc(id).delete();
  }
}