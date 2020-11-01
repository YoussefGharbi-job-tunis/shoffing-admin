import { Component, OnInit } from '@angular/core';
import { Souscategorie } from 'src/app/interface/souscategorie';
import { LoadingController, ToastController } from '@ionic/angular';
import { SouscatService } from 'src/app/services/souscat.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-sous-categorie',
  templateUrl: './add-sous-categorie.page.html',
  styleUrls: ['./add-sous-categorie.page.scss'],
})
export class AddSousCategoriePage implements OnInit {
  public idcategorie:string;
  public souscategorie : Souscategorie = {};
  private loading: any;
  private selectedFile: any;
  constructor(
   
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
 
    private souscatService:SouscatService,
    private router:Router ,
    private activatedRoute: ActivatedRoute) {
      this.idcategorie = this.activatedRoute.snapshot.params['id'];
     }

  

 

  async savecategorie() {
this.souscategorie.idcategorie=this.idcategorie;
    await this.presentLoading();
      try {
        await this.souscatService.addsouscategorie(this.souscategorie,this.selectedFile);
        console.log(this.souscategorie);
        
        await this.loading.dismiss();
        this.router.navigate(['/liste-sous-categorie',this.idcategorie]);
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



