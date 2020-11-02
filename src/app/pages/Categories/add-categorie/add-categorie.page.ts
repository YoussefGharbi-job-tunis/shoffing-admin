import { Component, OnInit } from '@angular/core';
import { Categorie } from 'src/app/interface/categorie';
import { LoadingController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { CategorieService } from 'src/app/services/categorie.service';

@Component({
  selector: 'app-add-categorie',
  templateUrl: './add-categorie.page.html',
  styleUrls: ['./add-categorie.page.scss'],
})
export class AddCategoriePage implements OnInit {
  public categorie: Categorie = {};
 
  private loading: any;
  private selectedFile: any;
    public categories=[]
  constructor(
     private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private categorieService:CategorieService,
    private router:Router ) { }

  

  async savecategorie() {
  await this.presentLoading();
     try {
        await this.categorieService.addcategorie(this.categorie,this.selectedFile);
        console.log(this.categorie);
        
        await this.loading.dismiss();
        this.router.navigate(['/mes-categories']);
      } catch (error) {
        this.presentToast('Error when trying to save');
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
    ngOnInit() {
      }
  
    



chooseFile (event) {
    this.selectedFile = event.target.files
  }
 
}

