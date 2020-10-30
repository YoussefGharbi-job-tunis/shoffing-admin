import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/interfaces/product';
import { LoadingController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { FormBuilder,Validators, FormGroup } from '@angular/forms'
import { ProdService } from 'src/app/services/products/prod.service';
import { SalesUnitService } from 'src/app/services/salesUnit/sales-unit.service';
import { salesUnit } from 'src/app/interfaces/salesUnit';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.page.html',
  styleUrls: ['./add-product.page.scss'],
})
export class AddProductPage implements OnInit {
 
  public product: Product = {};
  private loading: any;
  private selectedFile: any;
  private salesUnit=new Array<salesUnit>()
  productForm:FormGroup;
  isSubmitted = false;

 


  constructor(
    private productService: ProdService,
    private salesUnitService:SalesUnitService,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private router:Router,private formBuilder : FormBuilder ) { }
    ngOnInit() {

      this.productForm=this.formBuilder.group({
        name: ['', [Validators.required, Validators.minLength(2),,Validators.maxLength(30)]],
        description: ['', [Validators.required, Validators.minLength(2),Validators.maxLength(1000)]],
        picture: ['',[Validators.required]],
        price: ['' ,[Validators.required, Validators.pattern('^[0-9]+$')]],
        amount: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
        salesUnit: ['',[Validators.required]],
      })
   this.loadSalesUnit()
     }
     get errorControl() {
       
      return this.productForm.controls;
    }
  
    submit() {
      this.isSubmitted = true;
      if (!this.productForm.valid) {
        this.presentToast('Please provide all the required values!')
        console.log
        return false;
      } else {
        this.saveProduct(this.productForm.value)
        this.productForm.reset()
        console.log(this.productForm.value)
        this.router.navigate(['/home']); 
      }
    }
  async saveProduct(obj) {

      await this.presentLoading();
        try {
            await this.productService.addProduct(obj,this.selectedFile);
            await this.loading.dismiss();
           
        } catch (error) {
          this.presentToast('Error when trying to save');
          this.loading.dismiss();
        }
      
    }
    chooseFile (event) {
      this.selectedFile = event.target.files
    }
   
    async presentLoading() {
      this.loading = await this.loadingCtrl.create({ message: 'wait...' });
      return this.loading.present();
    }
  
    async presentToast(message: string) {
      const toast = await this.toastCtrl.create({ message, duration: 2000 });
      toast.present();
    }
   
    
  
loadSalesUnit(){
  this.salesUnitService. getSalesUnits().subscribe(data=>{
    this.salesUnit=data
  console.log(this.salesUnit);
  
  })
}


 




}