import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { Commande } from 'src/app/interfaces/commande';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CommandeService {

  private commandeCollection: AngularFirestoreCollection<Commande>

  constructor(private router:Router,private afs: AngularFirestore) {
    this.commandeCollection = this.afs.collection<Commande>('Commandes');
   }


  getCommandes() {
    return this.commandeCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;

          return { id, ...data };
        });
      })
    );
  }

  getCommande(id: string) {
    return this.commandeCollection.doc<Commande>(id).valueChanges();
  }
}
