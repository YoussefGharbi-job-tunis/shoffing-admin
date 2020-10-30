import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/interfaces/product';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { ProdService } from 'src/app/services/products/prod.service';
import { salesUnit } from 'src/app/interfaces/salesUnit';
import { SalesUnitService } from 'src/app/services/salesUnit/sales-unit.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.page.html',
  styleUrls: ['./edit-product.page.scss'],
})
export class EditProductPage implements OnInit {

  private productId: string = null;
  public product: Product = {};
  public salesUnit=new Array<salesUnit>()  
  private loading: any;
  private productSubscription: Subscription;

 
  constructor(
    private productService: ProdService,
    private salesUnitService: SalesUnitService,
    private activatedRoute: ActivatedRoute,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private router:Router) {
     
    this.productId = this.activatedRoute.snapshot.params['id'];

  }

  ngOnInit() {
    
  this.loadProduct()
  this.loadSalesUnits()

  //this.loadCategories();

   }
/*loadCategories(){
  this.categorieService.getCategies().subscribe(data=>{
    this.categories=data
  })
}*/
loadSalesUnits(){
  this.salesUnitService. getSalesUnits().subscribe(data=>{
    this.salesUnit=data
  console.log(this.salesUnit);
  
  })
}


loadProduct() {
    this.productService.getProduct(this.productId).subscribe(data => {
      this.product = data;
      console.log(this.product);
    });
  }

  
async saveProduct() {
    await this.presentLoading();

      try {
        await this.productService.updateProduct(this.productId, this.product);
        await this.loading.dismiss();
        this.router.navigate(["/home"])

      } catch (error) {
        this.presentToast('error');
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
