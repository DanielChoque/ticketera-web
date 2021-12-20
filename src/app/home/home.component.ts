import { Component, OnInit } from '@angular/core';
import { ConectionService } from '../service/conection.service';
import { Tramite,SubTramite,Ticket, TipoTramite, Area, Vector , Base, TicketArea, Cliente, Punto, Atencion, Token, AtencionTramite, InicioHora} from '../model/modelos';
import { Resultado } from '../model/resultado';
import { tick } from '@angular/core/testing';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  tickethidden:boolean=false
  popup_g:boolean=false
  
  initialTicket: Array<Ticket> =new Array<Ticket>();  
  initialSubTramite:Array<SubTramite> = new Array<SubTramite>();
  initialSubTramiteTemp:Array<SubTramite> = new Array<SubTramite>();
   

  initialTramite:Array<Tramite> = new Array<Tramite>();
  initialTramiteTemp:Array<Tramite> = new Array<Tramite>();
  arrayTram=[]
  respuesta: Resultado
  vectorT:Array<Vector> = new Array<Vector>();
  inicialToken: Array<Token> =new Array<Token>();
  initialTipoTramite: Array<TipoTramite> =new Array<TipoTramite>();  
  initialTipoTramiteTemp: Array<TipoTramite> =new Array<TipoTramite>();  

  initialTicketN: Array<Ticket> =new Array<Ticket>(); 
  initialTicketP: Array<Ticket> =new Array<Ticket>(); 
  initialTicketArea: Array<TicketArea> =new Array<TicketArea>();
  initialAtencionTramite: Array<AtencionTramite> =new Array<AtencionTramite>();
  initialAtencionTramiteTemp: Array<AtencionTramite> =new Array<AtencionTramite>();

  area:Area=new Area()
  tipoTramite:TipoTramite = new TipoTramite()
  subTramite:SubTramite = new SubTramite()
  cliente:Cliente =new Cliente()
  punto:Punto=new Punto()
  ticket:Ticket = new Ticket()
  correlativo:number
  inicio:string
  inicioHora:string
  finalHora:string
  modificado:Date = new Date()
  cNombre:string
  nit:string
  atencion:Atencion = new Atencion()
  atencionTramite:AtencionTramite = new AtencionTramite()
  //ngStyle: { [klass: string]: any; }

  


  i=0;
  constructor(private servItemService:ConectionService) { }

  ngOnInit() {
    this.inicialToken = JSON.parse(localStorage.getItem("token"));
    if(this.inicialToken!=undefined){
      this.popup_g=true
      this.iniciarDatos()
    }
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
  consulta(id,tipo){
    console.log(id+" tipo:"+tipo)
    this.initialTicketArea.forEach(element => {
      if(element.ticket.id==id){
        this.ticket=element.ticket
      }
    });
    //this.ticket=
    let fecha:Date = new Date()
    this.inicio = fecha.getFullYear()+"-"+(fecha.getMonth()+1)+"-"+fecha.getDate()   
    this.inicioHora=""+fecha.getHours()+":"+fecha.getMinutes()+":"+fecha.getSeconds()
    this.tickethidden=true
    this.servItemService.servTime().subscribe(
      res=>{
        //console.log(res)   
        var time=JSON.parse(JSON.stringify(res))._body; 
        localStorage.setItem('inicioHora',time)
      },
      error=>{
        console.log(error)
      }
    )
    
  }
  postAtencion(atencion){
    this.servItemService.servAtencion(atencion).subscribe(
      res=>{        
        var resp=JSON.parse(JSON.stringify(res))._body;        
        var ddd=JSON.parse(resp)
        console.log(ddd+" res:"+res.status)                        
        if(res.status==201){

        }
      },
      error=>{
        console.log(error)
      }
    )
  }

  tareaTicket(acc){
    console.log(acc)
    if(acc=="Finalizar"){
      this.setAtencion()     

      this.vaciarDatos()

      this.tickethidden=false
    }
    if(acc=="Abandono")
      this.tickethidden=false
    if(acc=="Cancelar")
      this.tickethidden=false
      this.vaciarDatos()
  }

  swStylw:boolean=false
  swContador:number=0
  subTramiteLLenar(id,event){
    if(event.target.checked==true){      
      this.initialTipoTramite.forEach(element => {  
        if(id==element.tramite.id){
          this.initialSubTramiteTemp.push(element.subTramite)
          this.initialTipoTramiteTemp.push(element)
        }
      });
      this.swStylw=true
      this.swContador++
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
      this.swContador--     
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
  initialTipoTramiteSend = new Array<TipoTramite>();
  initialTipoTramiteSendTemp = new Array<TipoTramite>();
  addSubTramite(id,event){
    if(event.target.checked==true){           
      this.initialTipoTramite.forEach(element => {  
        if(id.id==element.subTramite.id){
          this.initialTipoTramiteSend.push(element)
        }
      });
    }
    else{      
      var aux =this.initialTipoTramiteSend
      this.initialTipoTramiteSend = new Array<TipoTramite>();
      aux.forEach(element => {
        if(id.id!=element.subTramite.id){
          this.initialTipoTramiteSend.push(element)
        }
      });
    }
    console.log(this.initialTipoTramiteSend)
  }




  iniciarDatos(){
    //window.location.reload();
    this.popup_g=true
    console.log(this.popup_g)
    this.llenarTicket()
    this.llenarTramite()
  }

  vaciarDatos(){
    this.initialTramiteTemp= new Array<Tramite>()
    this.initialTipoTramiteTemp = new Array<TipoTramite>();
    this.llenarTramite()
    this.cNombre=""
    this.nit=""
  }

  colorStyle(id){
    if(id % 2 == 0) {
      return {'background-color':'#0505051c'}
    }
    else {
      return {'background-color':'#00000000'}
    }
  }
  colorStyleSw(){
    if(this.swContador % 2 == 0) {
      return {'background-color':'#0505051c'}
    }
    else {
      return {'background-color':'#00000000'}
    }
  }
  setAtencion(){
    var inicioHora=new InicioHora()
    inicioHora=JSON.parse(localStorage.getItem('inicioHora'))
    this.cliente.nit=this.nit
    this.cliente.nombre=this.cNombre
    this.atencion.cliente=this.cliente
    this.atencion.punto=JSON.parse(localStorage.getItem('punto'))
    this.atencion.ticket=this.ticket
    this.atencion.correlativo=this.correlativo
    this.atencion.inicio=this.inicio
    this.atencion.inicioHora=inicioHora.inicioHora
    let fecha:Date = new Date()
    this.atencion.finalHora=fecha.getHours()+":"+fecha.getMinutes()+":"+fecha.getSeconds()
    this.atencion.modificado = new Date()
    this.atencion.tipoAtencion=this.initialTipoTramiteSend

    this.atencionTramite.atencion
    this.atencionTramite.tipoTramite
    this.atencionTramite.inicio = this.inicio
    

    //console.log(inicioHora.inicioHora)
    this.atencionTramite.inicioHora = inicioHora.inicioHora
    this.atencionTramite.finalHora =fecha.getHours()+":"+fecha.getMinutes()+":"+fecha.getSeconds()
    this.atencionTramite.modificado = new Date()

    localStorage.setItem('atencion',JSON.stringify(this.atencion))
    console.log(this.atencionTramite)

    this.postAtencion(this.atencion)
    console.log(this.atencion)
    return true
  }
}
