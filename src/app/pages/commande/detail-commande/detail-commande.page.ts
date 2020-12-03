import { Component, OnInit } from '@angular/core';
import { Commande } from 'src/app/interfaces/commande';
import { CommandeService } from 'src/app/services/commande/commande.service';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/interfaces/user';

@Component({
  selector: 'app-detail-commande',
  templateUrl: './detail-commande.page.html',
  styleUrls: ['./detail-commande.page.scss'],
})
export class DetailCommandePage implements OnInit {

  private idCommande :string;
  private commande:Commande={}
  private client:User={}
   constructor(  private activatedRoute: ActivatedRoute,
                 private commandeService:CommandeService) { 
        this.idCommande=this.activatedRoute.snapshot.params['id'];
        this.loadCommande()
      }
  
    ngOnInit() {
      
    }
  
  async loadCommande(){
  this.commandeService.getCommande(this.idCommande).subscribe(data=>{
    this.commande=data
    this.client=this.commande.client
    console.log(this.commande);
    
  })
  }
}
