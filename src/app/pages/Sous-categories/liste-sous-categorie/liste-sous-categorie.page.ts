import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { LoadingController, ToastController, ActionSheetController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { SouscatService } from 'src/app/services/sousCategories/souscat.service';


@Component({
  selector: 'app-liste-sous-categorie',
  templateUrl: './liste-sous-categorie.page.html',
  styleUrls: ['./liste-sous-categorie.page.scss'],
})
export class ListeSousCategoriePage implements OnInit {

  private loading: any;
  subCatList: any[];
  subCatListBackup: any[];
  public idCategorie:string;
 
    constructor(
   
      private loadingCtrl: LoadingController,
      private toastCtrl: ToastController, 
      public actionSheetController: ActionSheetController, 
       private router:Router,
       private sousCatService : SouscatService,
       private activatedRoute: ActivatedRoute,) {
        this.idCategorie = this.activatedRoute.snapshot.params['id'];
    }
       
    
  
      async ngOnInit() { 
        this.loadSousCategorie()
      }
  
  
    loadSousCategorie(){
      this.sousCatService.getSousCategories(this.idCategorie).subscribe(data=>{
        this.subCatList=data;
        this.subCatList.sort((a,b)=>{
        
          var subCatA=a.name.toLowerCase(),subCatB=b.name.toLowerCase()
          if (subCatA < subCatB) //sort string ascending
             return -1 
        })
        console.log(this.subCatList);
        
         })
     }
  
     async deleteSousCategorie(id: string) {
      await this.presentLoading()
      try {
        await this.sousCatService.deleteSousCategorie(id)
        this.loading.dismiss();
        this.presentToast('Success')
          this.router.navigate(["/liste-sous-categorie",this.idCategorie])
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



