import { Component, OnInit } from '@angular/core';
import { ConectionService } from '../service/conection.service';
import { Tramite } from '../model/tramite';
import { Resultado } from '../model/resultado';
import { Ticket } from '../model/ticket';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  initialItem: Array<Tramite> =new Array<Tramite>();
  initialSubTramites: Array<Tramite> =new Array<Tramite>();
  initialSubTramitesAux: Array<Tramite> =new Array<Tramite>();
  initialTicketsA: Array<Ticket> =new Array<Ticket>();
  initialTicketsP: Array<Ticket> =new Array<Ticket>();
  respuesta: Resultado

  constructor(private servItemService:ConectionService) { }

  ngOnInit() {
    //this.consultaItemStar()
    this.consultarTicketStar()   
    this.consultarTramitesStar()
    this.consultaSubTramites() 
  }

  consultaItemStar(){
    this.servItemService.servTramites().subscribe(
      res=>{
        //console.log("res:"+JSON.parse(JSON.stringify(JSON.parse(JSON.stringify(res))._body)).resultado);
        var resp=JSON.parse(JSON.stringify(res))._body;
        this.respuesta=JSON.parse(resp);
        this.setResp(this.respuesta)
        if(resp!=""){
          if(resp=="ErrorBase"){
            alert("Error en la Base de Datos");
          }
          else{                
          }
        }
      },
      error=>console.log(error)
    )
  }

  setResp(respuesta){
    var resp =respuesta['resultado']
    /*this.initialTickets=resp
    this.initialTickets.forEach(element => {
      console.log(element.descripcion)
    });*/
  }

  consultarTicketStar(){
    this.servItemService.servTickets().subscribe(
      res=>{
        
        var resp=JSON.parse(JSON.stringify(res))._body;

        this.respuesta=JSON.parse(resp);
        var ddd=JSON.parse(resp)
        this.initialTicketsP =ddd['resultado']
        this.initialTicketsA.forEach(element => {
         // console.log(element.descripcion)
        });
        console.log("dsa:"+ JSON.stringify(this.initialTicketsP))    

        if(resp!=""){
          if(resp=="ErrorBase"){
            alert("Error en la Base de Datos");
          }
          else{
            
          }
        }
      },
      error=>console.log(error)
    )
  }
  

  consultarTramitesStar(){
    this.servItemService.servTramites().subscribe(
      res=>{
        
        var resp=JSON.parse(JSON.stringify(res))._body;
        
        var ddd=JSON.parse(resp)
        this.initialItem =ddd['resultado']
        this.initialTicketsA.forEach(element => {
         // console.log(element.descripcion)
        });
        console.log("dsa:"+ JSON.stringify(this.initialTicketsP))    

        if(resp!=""){
          if(resp=="ErrorBase"){
            alert("Error en la Base de Datos");
          }
          else{
            
          }
        }
      },
      error=>console.log(error)
    )
  }

  
  consultaSubTramites(){
    this.servItemService.servSubTramites().subscribe(
      res=>{
        var resp=JSON.parse(JSON.stringify(res))._body;
        var ddd=JSON.parse(resp)
        this.initialSubTramites =ddd['resultado']      
      },
      error=>console.log(error)
    )
  }

  subTramites(id_tramite){
    this.initialSubTramitesAux=new Array<Tramite>();
    this.initialSubTramites.forEach(element => {
      if(element.id_padre_tramite==id_tramite){
        this.initialSubTramitesAux.push(element)
      }
      
    });

  }

}
