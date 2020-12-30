import { Component, OnInit } from '@angular/core';
import { ConectionService } from '../service/conection.service';
//import { SubTramite } from '../model/tramite';
import { Tramite,SubTramite,Ticket, TipoTramite, Area } from '../model/modelos';
import { Resultado } from '../model/resultado';
//import { Ticket } from '../model/ticket';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  tickethidden:boolean=false
  
  initialTicket: Array<Ticket> =new Array<Ticket>();  
  initialSubTramite:Array<SubTramite> = new Array<SubTramite>();
  initialTramite:Array<Tramite> = new Array<Tramite>();
  respuesta: Resultado

  initialTipoTramite: Array<TipoTramite> =new Array<TipoTramite>();  

  initialTicketN: Array<Ticket> =new Array<Ticket>(); 
  initialTicketP: Array<Ticket> =new Array<Ticket>(); 

  i=0;
  constructor(private servItemService:ConectionService) { }

  ngOnInit() {
    this.consultaSubTramite() 
    this.consultarTramite()
    this.consultarTicket()
    this.consultarTipoTramite()
  }

  consultaSubTramite(){
    this.servItemService.servSubTramites().subscribe(
      res=>{        
        var resp=JSON.parse(JSON.stringify(res))._body;        
        var ddd=JSON.parse(resp)
        console.log(ddd)
        this.initialSubTramite =ddd     
      },
      error=>console.log(error)
    )
  }

  consultarTramite(){
    this.servItemService.servTramites().subscribe(
      res=>{        
        var resp=JSON.parse(JSON.stringify(res))._body;
        var ddd=JSON.parse(resp)
        console.log(ddd)
        this.initialTramite =ddd
      },
      error=>console.log(error)
    )
  }

  consultarTicket(){
    this.servItemService.servTickets().subscribe(
      res=>{        
        var resp=JSON.parse(JSON.stringify(res))._body;
        this.respuesta=JSON.parse(resp);
        var ddd=JSON.parse(resp)
        this.initialTicket =ddd
        this.llenar()
      },
      error=>console.log(error)
    )
  }
  llenar(){
    this.initialTicket
    this.initialTicket.forEach(element => {
      if(element.cod.indexOf("X")==-1)  
        this.initialTicketN.push(element)
      else
        this.initialTicketP.push(element)
    });
  
  }

  consultarTipoTramite(){
    this.servItemService.servTipoTramite().subscribe(
      res=>{        
        var resp=JSON.parse(JSON.stringify(res))._body;
        this.respuesta=JSON.parse(resp);
        var ddd=JSON.parse(resp)
        console.log(ddd)
        this.initialTipoTramite =ddd       
      },
      error=>console.log(error)
    )
  }
  consulta(num){
    console.log(num)
    this.tickethidden=true
  }

  tareaTicket(acc){
    console.log(acc)
    if(acc=="Finalizar")
      this.tickethidden=false
    if(acc=="Abandono")
      this.tickethidden=false
  }
  subTramiteLLenar(id){
    //this.initialSubTramite= []
    this.initialTipoTramite.forEach(element => {      
      let areat=Area
      let re=Resultado
      areat=element.area
      if(id==areat.id)
            
            console.log(areat)
      //this.initialSubTramite.push(subTramite)
    });

  }

}
