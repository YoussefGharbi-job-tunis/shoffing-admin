import { Component, OnInit } from '@angular/core';
import { CommandeService } from 'src/app/services/commande/commande.service';

@Component({
  selector: 'app-list-commande',
  templateUrl: './list-commande.page.html',
  styleUrls: ['./list-commande.page.scss'],
})
export class ListCommandePage implements OnInit {

  private commandes:any

  constructor(
  private commandeService:CommandeService) {    
       
       this.loadOrders()
    }

  ngOnInit() {

  }
 
  loadOrders(){
    this.commandeService.getCommandes().subscribe(data=>{
      this.commandes=data   
      console.log(this.commandes);
        
    })
  }
}
