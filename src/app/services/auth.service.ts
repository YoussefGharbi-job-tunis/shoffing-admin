import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  list(arg0: string) {
    throw new Error("Method not implemented.");
  }
 

  constructor(private afa: AngularFireAuth) {}
 
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