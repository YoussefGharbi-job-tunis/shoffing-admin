import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  list(arg0: string) {
    throw new Error("Method not implemented.");
  }
 

  constructor(private afa: AngularFireAuth,private db: AngularFirestore) {}
 
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
  getUserInformation(email:string){  
    return this.db.collection("/Users",ref=>ref.where("email","==",email)).valueChanges()
}

  getAuth() {
    return this.afa.auth;
  }
}