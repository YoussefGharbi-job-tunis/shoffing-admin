import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from '../interfaces/user';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  list(arg0: string) {
    throw new Error("Method not implemented.");
  }
  private userCollection: AngularFirestoreCollection<User>;

  constructor(private afa: AngularFireAuth,private db: AngularFirestore) {
    this.userCollection = this.db.collection<User>('Users');

   }
 
    login(email:string, password:string){

      return new Promise((resolve, rejected) =>{
        this.afa.auth.signInWithEmailAndPassword(email, password).then(user => {
          resolve(user.user);
        }).catch(err => rejected(err));
      });
  
     
    }
 

  logout() {
    return this.afa.auth.signOut();
  }

  getAuth() {
    return this.afa.auth;
  }
}