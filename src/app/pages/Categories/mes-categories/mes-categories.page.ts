
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { LoadingController, ToastController, ActionSheetController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import {CategorieService} from "../../../services/categorie.service"

import { User } from 'src/app/interface/user';


@Component({
  selector: 'app-mes-categories',
  templateUrl: './mes-categories.page.html',
  styleUrls: ['./mes-categories.page.scss'],
})
export class MesCategoriesPage implements OnInit {
 
  
private loading: any;
public user :User;
public
private userId:string
public categories :any;
  constructor(
    private authService: AuthService,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController, 
    
     public actionSheetController: ActionSheetController, 
     private router:Router,
     private categorieService: CategorieService,
     private activatedRoute: ActivatedRoute) {
      this.userId = this.activatedRoute.snapshot.params['id'];
  
     }
     
  

    ngOnInit() { 
  this.loadcategorie()   
   }




  filterList(evt) {
  const searchTerm = evt.srcElement.value;
  if (!searchTerm) {
    return;
  }
this.categories = this.categories.filter(currentGoal => {
    if (currentGoal.name && searchTerm) {
    if (currentGoal.name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1) {
      return true;
      }
      return false;
    }
  });
}



   loadcategorie(){
    this.categorieService.getAllcategorie(this.userId).subscribe(data=>{
      this.categories=data;
       })
   }

   async deletecategorie(id: string) {
    await this.presentLoading()
    try {
      await this.categorieService.deletecategorie(id)
      this.loading.dismiss();
        this.router.navigate(["/mes-categories",this.userId])
    } catch (error) {
      this.presentToast('error');
    }
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
              this.router.navigate(["/list-orders"])

          },
        },
        {
          text: 'Tous Les Categories',
          icon: 'add',
          handler: () => {
            this.router.navigate(["/mes-categories"])
             },
          },
          {
            text: 'Add Products',
            icon: 'add',
            handler: () => {
              this.router.navigate(["/add-product"])
    
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


