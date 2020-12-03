import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/interfaces/product';
import { LoadingController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { FormBuilder,Validators, FormGroup } from '@angular/forms'
import { ProdService } from 'src/app/services/products/prod.service';
import { SalesUnitService } from 'src/app/services/salesUnit/sales-unit.service';
import { salesUnit } from 'src/app/interfaces/salesUnit';
import { Categorie } from 'src/app/interfaces/categorie';
import { CategorieService } from 'src/app/services/categories/categorie.service';
import { SouscatService } from 'src/app/services/sousCategories/souscat.service';
import {  sousCategorie } from 'src/app/interfaces/sousCategorie';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.page.html',
  styleUrls: ['./add-product.page.scss'],
})
export class AddProductPage implements OnInit {
 
  public product: Product = {};
  Categories=new Array<Categorie>()
  subCat=new Array<sousCategorie>()
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
    private router:Router,private formBuilder : FormBuilder ,
    private categorieService:CategorieService,
    private subCatService:SouscatService) { }
    ngOnInit() {

      this.productForm=this.formBuilder.group({
        name: ['', [Validators.required, Validators.minLength(2),,Validators.maxLength(100)]],
        description: ['', [Validators.required, Validators.minLength(2),Validators.maxLength(1000)]],
        price: ['' ,[Validators.required, Validators.pattern('^[0-9]+$')]],
        amount: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
        salesUnit: ['',[Validators.required]],
        idCat: ['',[Validators.required]],
        idsubCat: ['',[Validators.required]]
      })
       this.loadSalesUnit()
       this.loadCategorie()
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
    chooseFile (event) {
      this.selectedFile = event.target.files
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

loadCategorie(){
  this.categorieService.getCategories().subscribe((data)=>{
    this.Categories=data
    console.log(this.Categories);
    
  })
}
fetchSubCat(event){
  console.log(event.detail.value);
  this.subCatService.getSousCategories(event.detail.value).subscribe((data)=>{
    this.subCat=data
    console.log(this.subCat);
    
  })
  

}
 




}