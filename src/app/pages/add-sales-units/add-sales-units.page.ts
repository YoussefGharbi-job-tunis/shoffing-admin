import { Component, OnInit, ViewChild} from '@angular/core';
import { SalesUnitService } from 'src/app/services/salesUnit/sales-unit.service';
import { AlertController, ToastController, LoadingController } from '@ionic/angular';
import { salesUnit } from 'src/app/interfaces/salesUnit';
import { Router } from '@angular/router';
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

 salesUnitArray=new Array<salesUnit>()
 offsetTop = 0
 salesobjet :salesUnit ={}
 unitList: any[];
 unitListBackup: any[];
 loading: any;


  constructor(
    private salesUnitService:SalesUnitService,
    public alertController: AlertController,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private router:Router,
    private firestore: AngularFirestore) { }

  async ngOnInit() {
  
    this.unitList = await this.initializeItems();
    console.log(this.unitList);
    console.log(this.salesobjet);
    
    

  }
  async initializeItems(): Promise<any> {
    const unitList = await this.firestore.collection('salesUnit')
    .valueChanges().pipe(first()).toPromise();
    console.log(this.unitList);
    
  this.unitListBackup = unitList;
  return unitList;
  }

  async filterList(evt) {
    this.unitList = this.unitListBackup;
    const searchTerm = evt.srcElement.value;
  
    if (!searchTerm) {
      return;
    }
  
    this.unitList = this.unitList.filter(currentUnit => {
      if (currentUnit.libelle && searchTerm) {
        return (currentUnit.libelle.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1 || currentUnit.libelle.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1);
      }
    });
  }
  scrollTop(){
   // this.content.scrollToTop()
  }
  onScroll(e){
    console.log(e);
    
    this.offsetTop=e.detail.scrollTop
  }

  async save(){
 
    await this.presentLoading();
  
     try {
       if(this.salesobjet.libelle!=null){
        await this.salesUnitService.addSalesUnit(this.salesobjet);
        this.salesobjet.libelle=""
        await this.loading.dismiss();
        this.presentToast("success")
        this.router.navigate(["/add-sales-units"])
       }else {
        await this.loading.dismiss();
        this.presentToast("Please entre libelle")

       }
   
     } catch (error) {
       this.presentToast('Error');
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

 
  loadSales(id) {
    this.salesUnitService.getSalesUnit(id).subscribe(data => {
      this.salesobjet= data;
      console.log(this.salesobjet);    
    });
  }
    async updateUnit() {
      await this.presentLoading();
        try {
          await this.salesUnitService.updateSalesUnit(this.salesobjet.id, this.salesobjet);
          this.salesobjet.libelle=""
          await this.loading.dismiss();
          this.router.navigate(["add-sales-units"])  
        } catch (error) {
          this.presentToast('error');
          console.log(error.message);
          
          this.loading.dismiss();
        }
      
    }
  

    async delete(id: string) {
      await this.presentLoading()
      try {
        await this.salesUnitService.deleteSalesUnit(id)
        this.loading.dismiss();
          this.router.navigate(["add-sales-units"])
      } catch (error) {
        console.log(error.message);
        
        this.presentToast('error');
      }
    }
  

}
