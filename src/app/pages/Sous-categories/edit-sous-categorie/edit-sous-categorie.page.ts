import { Component, OnInit } from '@angular/core';
import { sousCategorie } from 'src/app/interfaces/sousCategorie';
import { LoadingController, ToastController } from '@ionic/angular';
import { SouscatService } from 'src/app/services/sousCategories/souscat.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-sous-categorie',
  templateUrl: './edit-sous-categorie.page.html',
  styleUrls: ['./edit-sous-categorie.page.scss'],
})
export class EditSousCategoriePage implements OnInit {
  public idSubCat:string
  public sousCategorie : sousCategorie = {};
  private loading: any;
  private selectedFile: any;
  constructor( private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private sousCatService:SouscatService,
    private router:Router ,
    private activatedRoute: ActivatedRoute) { 
      this.idSubCat=this.activatedRoute.snapshot.params['idSubCat']
    }

  ngOnInit() {
    this.loadSubCat()
  }
  chooseFile (event) {
    this.selectedFile = event.target.files
  }
  loadSubCat(){
    this.sousCatService.getSousCategorie(this.idSubCat).subscribe((data)=>{
      this.sousCategorie=data
      console.log(this.sousCategorie);
      
    })
   }
  async updateSubCategorie(){
      await this.presentLoading();
        try {
            await this.sousCatService.updateSousCategorie(this.idSubCat, this.sousCategorie,this.selectedFile);
            await this.loading.dismiss(); 
            this.presentToast("Success")
            this.router.navigate(['/mes-categories']);
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
