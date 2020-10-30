import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { LoadingController, ToastController, ActionSheetController, MenuController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Product } from 'src/app/interfaces/product';
import { ProdService } from 'src/app/services/products/prod.service';



@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  private loading: any;
  public products = new Array<Product>();

  constructor(
    private productService: ProdService,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController, 
     public actionSheetController: ActionSheetController, 
     private router:Router,public menuCtrl: MenuController) {}

  ngOnInit() { 
    this.loadProducts()
  }

  loadProducts(){
    this.productService.getProducts().subscribe(data=>{
       this.products=data;
       })
   }
   
   async deleteProduct(id: string) {
    await this.presentLoading()
    try {
      await this.productService.deleteProduct(id)
      this.loading.dismiss();
        this.router.navigate(["/home"])
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
  ionViewWillEnter() {
    this.menuCtrl.enable(true);
  }

}