import { Component, OnInit, ViewChild} from '@angular/core';
import { SalesUnitService } from 'src/app/services/salesUnit/sales-unit.service';
import { AlertController, ToastController, LoadingController } from '@ionic/angular';
import { salesUnit } from 'src/app/interfaces/salesUnit';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { first } from 'rxjs/operators';
import { Content } from '@angular/compiler/src/render3/r3_ast';



@Component({
  selector: 'app-add-sales-units',
  templateUrl: './add-sales-units.page.html',
  styleUrls: ['./add-sales-units.page.scss'],
})
export class AddSalesUnitsPage implements OnInit {
  //@ViewChild(Content) content: Content;
 salesobjet :salesUnit ={}
 idSalesUnit:string
  loading: any;

  constructor(
    private salesUnitService:SalesUnitService,
    public alertController: AlertController,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private router:Router, private activatedRoute: ActivatedRoute) {
      this.idSalesUnit= this.activatedRoute.snapshot.params['id'];
      console.log(this.idSalesUnit);
      
     }

  async ngOnInit() {
    this.loadSales(this.idSalesUnit)
    console.log(this.salesobjet);
  } 
  async save(){
 
    await this.presentLoading();
  
     try {
       if(this.salesobjet.libelle!=null){
        await this.salesUnitService.addSalesUnit(this.salesobjet);
        await this.loading.dismiss();
         this.presentToast("Success ")
         this.router.navigate(["/list-sales-unit"])
       }else {
        await this.loading.dismiss();
        this.presentToast("Please entre libelle")

       }
   
     } catch (error) {
       this.presentToast('Error');
       this.loading.dismiss();
     }
   
  }
  //// Update
  loadSales(id) {
    this.salesUnitService.getSalesUnit(id).subscribe(data => {
      this.salesobjet= data;
      console.log(this.salesobjet);    
    });
  }
  async updateUnit() {
    await this.presentLoading();
      try {
        await this.salesUnitService.updateSalesUnit(this.idSalesUnit, this.salesobjet);
        this.salesobjet={}
        await this.loading.dismiss();
        this.router.navigate(["/list-sales-unit"])
     
      } catch (error) {
        this.presentToast('error');
        console.log(error.message);
        
        this.loading.dismiss();
      }
    
  }
  



  async presentToast(message: string) {
    const toast = await this.toastCtrl.create({ message, duration: 2000 });
    toast.present();
  }
  async presentLoading() {
    this.loading = await this.loadingCtrl.create({ message: 'wait...' });
    return this.loading.present();
  }

 
  
  

}
