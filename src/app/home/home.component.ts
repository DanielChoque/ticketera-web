import { Component, OnInit } from '@angular/core';
import { ConectionService } from '../service/conection.service';
//import { SubTramite } from '../model/tramite';
import { Tramite,SubTramite,Ticket } from '../model/modelos';
import { Resultado } from '../model/resultado';
//import { Ticket } from '../model/ticket';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  initialTicket: Array<Ticket> =new Array<Ticket>();  
  initialSubTramite:Array<SubTramite> = new Array<SubTramite>();
  initialTramite:Array<Tramite> = new Array<Tramite>();
  respuesta: Resultado

  initialTicketN: Array<Ticket> =new Array<Ticket>(); 
  initialTicketP: Array<Ticket> =new Array<Ticket>(); 

  i=0;
  constructor(private servItemService:ConectionService) { }

  ngOnInit() {
    this.consultaSubTramite() 
    this.consultarTramite()
    this.consultarTicket()
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

  consulta(num){
    console.log(num)

  }


}
