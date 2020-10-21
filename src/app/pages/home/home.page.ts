import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { LoadingController, ToastController, ActionSheetController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';



@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  private loading: any;
  constructor(
    private authService: AuthService,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController, 
     public actionSheetController: ActionSheetController, ) {
     
  }

  ngOnInit() { 
 
  }


  async logout() {
    await this.presentLoading();

   try {
      await this.authService.logout();
    } catch (error) {
      console.error(error);
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
 
  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Option',
      buttons: [{
        text: 'Orders',
        icon: 'cart',
        handler: () => {
              this.presentToast("Orders")

          },
        },
        {
          text: 'Add Categories',
          icon: 'add',
          handler: () => {
            this.presentToast("Add Categories")
             },
          },
          {
            text: 'Add Products',
            icon: 'add',
            handler: () => {
              this.presentToast("Add Products")
    
              },
            },
        {
        text: 'logout',
        role: 'destructive',
        icon: 'log-out',
        handler: () => {
               this.logout()

        },

      }]
    });
    await actionSheet.present();
  }
}