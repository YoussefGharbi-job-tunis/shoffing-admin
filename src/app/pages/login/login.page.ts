import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides, LoadingController, ToastController } from '@ionic/angular';
import { User } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth.service';
import { Keyboard } from '@ionic-native/keyboard/ngx';
import { Router } from '@angular/router';
import * as firebase from 'firebase';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
 
  public wavesPosition: number = 0;
  public userLogin: User ={};
  public userRegister: User = {};
  public email : User={};
  private loading: any;

  constructor(
    private authService: AuthService,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    public keyboard: Keyboard,
    public router:Router
  ) { }

  ngOnInit() { }

 
  async login() {
    await this.presentLoading();

    try {
      await  this.authService.login(this.userLogin.email, this.userLogin.password).then( res =>{
       
       this.router.navigate(['/home']);
      })
    } catch (error) {
      this.presentToast(error.message);
    } finally {
      this.loading.dismiss();
    }
  }

  
  async presentLoading() {
    this.loading = await this.loadingCtrl.create({ message: 'wait...' });
    return this.loading.present();
  }

  async presentToast(message: string) {
    const toast = await this.toastCtrl.create({ message, duration: 2000 });
    toast.present();
  }
  goToRegister(){
    this.router.navigate(['/registre']);
}

goToWellcome(){
  this.router.navigate(['/wellcome'])
}
reset(email){
  console.log(email);
  firebase.auth()
  .sendPasswordResetEmail(email.toString())
  .then(data =>{
    console.log("succes")
  })
  .catch(data =>{
   console.log("error")
  });

}

}