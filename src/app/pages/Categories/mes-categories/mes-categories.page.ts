
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { LoadingController, ToastController, ActionSheetController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import {CategorieService} from "../../../services/categories/categorie.service"

import { User } from 'src/app/interfaces/user';
import { Categorie } from 'src/app/interfaces/categorie';


@Component({
  selector: 'app-mes-categories',
  templateUrl: './mes-categories.page.html',
  styleUrls: ['./mes-categories.page.scss'],
})
export class MesCategoriesPage implements OnInit {

private loading: any;
public categories=new Array<Categorie>();

  constructor( private loadingCtrl: LoadingController,
    private toastCtrl: ToastController, 
    public actionSheetController: ActionSheetController, 
    private router:Router,private categorieService: CategorieService) {}
     
    ngOnInit() { 
    this.loadcategorie()   
      }

   loadcategorie(){
    this.categorieService.getCategories().subscribe(data=>{
      this.categories=data;
      this.categories.sort((a,b)=>{
        
        var catA=a.name.toLowerCase(),catB=b.name.toLowerCase()
        if (catA < catB) //sort string ascending
           return -1 
      })
      console.log(this.categories);
      
       })
   }

   async deletecategorie(id: string) {
    await this.presentLoading()
    try {
      await this.categorieService.deleteCategorie(id)
      this.loading.dismiss();
        this.router.navigate(["/mes-categories"])
    } catch (error) {
      this.presentToast('error');
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

}


