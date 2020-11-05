import { Component, OnInit } from '@angular/core';
import { Categorie } from 'src/app/interfaces/categorie';
import { LoadingController, ToastController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { CategorieService } from 'src/app/services/categories/categorie.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-add-categorie',
  templateUrl: './add-categorie.page.html',
  styleUrls: ['./add-categorie.page.scss'],
})
export class AddCategoriePage implements OnInit {
  public idCategorie:string;
  public categorie: Categorie = {};
  private loading: any;
  private selectedFile: any;
 
 
  constructor(
     private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private categorieService:CategorieService,
    private router:Router,private activatedRoute: ActivatedRoute) {
      this.idCategorie = this.activatedRoute.snapshot.params['id'];
    
      if(this.idCategorie){
        this.loadCategorie(this.idCategorie)
      }
     
    }
    ngOnInit() {
     
    }

    

  async saveCategorie() {
  await this.presentLoading();
     try {
      if(this.categorie.name!=null && this.categorie.picture!=null){
        await this.categorieService.addCategorie(this.categorie,this.selectedFile);
         await this.loading.dismiss();
         this.router.navigate(['/mes-categories']);
      }else{
        await this.loading.dismiss();
        this.presentToast('Error, Please Enter Categorie');
      }

      } catch (error) {
        this.presentToast('Error when trying to save');
        this.loading.dismiss();
      }
    
  }
  
  chooseFile (event) {
    this.selectedFile = event.target.files
  }

  loadCategorie(id){
    this.categorieService.getCategorie(id).subscribe((data)=>{
      this.categorie=data
    
  });
  }
  async updateCategerie() {
    await this.presentLoading();
      try {
        if(this.categorie.name!=null && this.categorie.picture!=null){
          await this.categorieService.updateCategorie(this.idCategorie, this.categorie,this.selectedFile);
          await this.loading.dismiss(); 
          this.router.navigate(['/mes-categories']);

        }
    
      } catch (error) {
        this.presentToast('error');
        console.log(error.message);
        
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
   

 
}

