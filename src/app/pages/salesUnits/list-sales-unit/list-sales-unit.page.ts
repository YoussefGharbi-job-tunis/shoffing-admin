import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { SalesUnitService } from 'src/app/services/salesUnit/sales-unit.service';
import { AlertController, ToastController, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-list-sales-unit',
  templateUrl: './list-sales-unit.page.html',
  styleUrls: ['./list-sales-unit.page.scss'],
})
export class ListSalesUnitPage implements OnInit {
  unitList: any[];
  unitListBackup: any[];
  loading: any;

  
  constructor(private salesUnitService:SalesUnitService,
    public alertController: AlertController,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private router:Router,
    private firestore: AngularFirestore) { }

  async ngOnInit() {
   // this.unitList = await this.initializeItems();
   this.loadSalesUnit()
    console.log(this.unitList);
  }
  loadSalesUnit(){
    this.salesUnitService.getSalesUnits().subscribe((data)=>{
      this.unitList=data
      this.unitList.sort((a,b)=>{
        
        var A=a.libelle.toLowerCase(),B=b.libelle.toLowerCase()
        if (A < B) //sort string ascending
           return -1 
      })
      console.log(this.unitList);
      
    })
  }
 /* async initializeItems(): Promise<any> {
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
  }*/
  async delete(id: string) {
    await this.presentLoading()
    try {
      await this.salesUnitService.deleteSalesUnit(id)
      this.loading.dismiss();
      this.router.navigate(["list-sales-unit"])
    } catch (error) {
      console.log(error.message);
      
      this.presentToast('error');
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
