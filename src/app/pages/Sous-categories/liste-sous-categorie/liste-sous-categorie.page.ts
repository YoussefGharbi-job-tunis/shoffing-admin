import { Component, OnInit } from '@angular/core';
import { Souscategorie } from 'src/app/interface/souscategorie';
import { AuthService } from 'src/app/services/auth.service';
import { LoadingController, ToastController, ActionSheetController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { SouscatService } from 'src/app/services/souscat.service';

@Component({
  selector: 'app-liste-sous-categorie',
  templateUrl: './liste-sous-categorie.page.html',
  styleUrls: ['./liste-sous-categorie.page.scss'],
})
export class ListeSousCategoriePage implements OnInit {

  private loading: any;
  public souscategories = new Array<Souscategorie>();
  public idcategorie:string;
 
    constructor(
      private authService: AuthService,
      private loadingCtrl: LoadingController,
      private toastCtrl: ToastController, 
      public actionSheetController: ActionSheetController, 
       private router:Router,
       private souscatService : SouscatService,
       private activatedRoute: ActivatedRoute) {
        this.idcategorie = this.activatedRoute.snapshot.params['id'];
    }
       
    
  
      ngOnInit() { 
    this.loadsouscategorie()
  
      //
     
     }
  
  //async initiaLizeItems():Promise<any>{
    //const categories = await this.firestore.collection('categorie').valueChanges().pipe(first()).toPromise();
    //return categories;
  //}
  
  
   // filterList(evt) {
   // this.categories = await this.initiaLizeItems();
    //const searchTerm = evt.srcElement.value;
   // if (!searchTerm) {
     // return;
   // }
 // this.categories = this.categories.filter(currentGoal => {
      //if (currentGoal.name && searchTerm) {
      //if (currentGoal.name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1) {
        //return true;
        //}
        //return false;
      //}
    //});
  
  
 // }
  
  
  
     loadsouscategorie(){
      this.souscatService.getsouscategories(this.idcategorie).subscribe(data=>{
        this.souscategories=data;
         })
     }
  
     async deletesouscategorie(id: string) {
      await this.presentLoading()
      try {
        await this.souscatService.deletesouscategorie(id)
        this.loading.dismiss();
          this.router.navigate(["/liste-sous-categorie",this.idcategorie])
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



