import { Component, OnInit } from '@angular/core';
import { sousCategorie } from 'src/app/interfaces/sousCategorie';
import { LoadingController, ToastController } from '@ionic/angular';
import { SouscatService } from 'src/app/services/sousCategories/souscat.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-sous-categorie',
  templateUrl: './add-sous-categorie.page.html',
  styleUrls: ['./add-sous-categorie.page.scss'],
})
export class AddSousCategoriePage implements OnInit {
  public idCategorie:string;
  public sousCategorie : sousCategorie = {};
  private loading: any;
  private selectedFile: any;
  constructor(
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private sousCatService:SouscatService,
    private router:Router ,
    private activatedRoute: ActivatedRoute) {
      
           this.idCategorie = this.activatedRoute.snapshot.params['idCategorie'];

     }

     ngOnInit() {
     
    }
    
     
     chooseFile (event) {
      this.selectedFile = event.target.files
    }

  async saveSubCategorie() {
    this.sousCategorie.idcategorie=this.idCategorie;
     await this.presentLoading();
      try {
        await this.sousCatService.addSousCategorie(this.sousCategorie,this.selectedFile);
        console.log(this.sousCategorie);
         await this.loading.dismiss();
         this.sousCategorie={}
        this.router.navigate(['/liste-sous-categorie',this.idCategorie]);
      } catch (error) {
        this.presentToast('Error when trying to save');
        this.loading.dismiss();
        console.log(error.message);
        
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



