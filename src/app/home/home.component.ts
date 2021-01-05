import { Component, OnInit } from '@angular/core';
import { ConectionService } from '../service/conection.service';
import { Tramite,SubTramite,Ticket, TipoTramite, Area, Vector , Base, TicketArea} from '../model/modelos';
import { Resultado } from '../model/resultado';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  tickethidden:boolean=false
  
  initialTicket: Array<Ticket> =new Array<Ticket>();  
  initialSubTramite:Array<SubTramite> = new Array<SubTramite>();
  initialSubTramiteTemp:Array<SubTramite> = new Array<SubTramite>();
   

  initialTramite:Array<Tramite> = new Array<Tramite>();
  initialTramiteTemp:Array<Tramite> = new Array<Tramite>();
  arrayTram=[]
  respuesta: Resultado
  vectorT:Array<Vector> = new Array<Vector>();

  initialTipoTramite: Array<TipoTramite> =new Array<TipoTramite>();  
  initialTipoTramiteTemp: Array<TipoTramite> =new Array<TipoTramite>();  

  initialTicketN: Array<Ticket> =new Array<Ticket>(); 
  initialTicketP: Array<Ticket> =new Array<Ticket>(); 
  initialTicketArea: Array<TicketArea> =new Array<TicketArea>();
  area:Area=new Area()
  tipoTramite:TipoTramite = new TipoTramite()
  subTramite:SubTramite = new SubTramite()
  //ngStyle: { [klass: string]: any; }
  color="red"


  i=0;
  constructor(private servItemService:ConectionService) { }

  ngOnInit() {
    this.iniciarDatos()
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
        //console.log(ddd)
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
        //console.log(ddd)
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
    if(acc=="Cancelar")
      this.tickethidden=false
  }

  subTramiteLLenar(id,event){
    if(event.target.checked==true){      
      this.initialTipoTramite.forEach(element => {  
        if(id==element.tramite.id){
          this.initialSubTramiteTemp.push(element.subTramite)
          this.initialTipoTramiteTemp.push(element)
        }
      });
    }
    else{
      this.initialSubTramiteTemp = new Array<SubTramite>();
      var aux =this.initialTipoTramiteTemp
      this.initialTipoTramiteTemp = new Array<TipoTramite>();
      aux.forEach(element => {
        if(id!=element.tramite.id){
          this.initialSubTramiteTemp.push(element.subTramite)
          this.initialTipoTramiteTemp.push(element)
        }
      });      
    }
  }


  llenarTicket(){
    this.initialTicketArea=JSON.parse(localStorage.getItem('ticketArea'))
    this.initialTicketArea.forEach(element => {
      if(element.ticket.cod.indexOf("X")==-1)  
        this.initialTicketN.push(element.ticket)
      else
        this.initialTicketP.push(element.ticket)
    });  
  }

  llenarTramite(){
    this.initialTipoTramite=JSON.parse(localStorage.getItem('TipoTramite'))
    this.initialTipoTramite.forEach(element => { 
      this.initialTramiteTemp.push(element.tramite)
    });
    this.initialTramite=this.removeDuplicate(this.initialTramiteTemp)
  }
  uniqueSet:Array<Tramite>= new Array<Tramite>()
  removeDuplicate(dupli:Array<Tramite>){
    const flag={};
    const unique =[];
    const uniqueArray =[];
    dupli.forEach(element => {
      if(!flag[element.id]){
        flag[element.id]=true
        uniqueArray.push(element)
        unique.push(element)
      }      
    });
    return uniqueArray;
  }
c=0
  colorStyle(id){
    if(id % 2 == 0) {
      return {'background-color':'#0505051c'}
    }
    else {
      return {'background-color':'#00000000'}
    }
  }

  iniciarDatos(){
    this.llenarTicket()
    this.llenarTramite()
  }
}
