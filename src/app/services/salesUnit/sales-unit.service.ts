import { Injectable } from '@angular/core';
import { salesUnit } from 'src/app/interfaces/salesUnit';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { Subscription, Observable } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/storage';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SalesUnitService {
  private salesUnitCollection: AngularFirestoreCollection<salesUnit>;
 
  constructor(private afs: AngularFirestore) {
    this.salesUnitCollection = this.afs.collection<salesUnit>('salesUnit');
  }



  addSalesUnit(salesUnit){
  return  this.salesUnitCollection.add(salesUnit).then(async resp => {
     this.salesUnitCollection.doc(resp.id).update({
    
      id: resp.id || null
    })
  }).catch(error => {
    console.log(error);
  })
  }
  getSalesUnit(id: string) {
    return this.salesUnitCollection.doc<salesUnit>(id).valueChanges();
  }

  getSalesUnits() {
    return this.salesUnitCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;

          return { id, ...data };
        });
      })
    );
  }



  updateSalesUnit(id: string,salesUnit:salesUnit) {
    return this.salesUnitCollection.doc<salesUnit>(id).update(salesUnit);
  }

  deleteSalesUnit(id: string) {
    return this.salesUnitCollection.doc(id).delete();
  }
}
