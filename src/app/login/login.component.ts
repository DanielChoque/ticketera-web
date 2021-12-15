import { Component, OnInit } from '@angular/core';
import { Usuario,Token,Punto, Base, TicketArea, TipoTramite, Tramite } from '../model/modelos';
import { ConectionService } from '../service/conection.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  sesion:boolean=false
  errorNP:boolean=true
  usuario:string =""
  password:string =""
  chkRecordar:boolean = false
  User:Usuario = new Usuario()
  inicialToken: Array<Token> =new Array<Token>();
  inicialPunto: Array<Punto> =new Array<Punto>();
  initialBase: Array<Base> =new Array<Base>(); 
  initialTicketArea: Array<TicketArea> =new Array<TicketArea>();
  initialTicketAreaTemp: Array<TicketArea> =new Array<TicketArea>(); 
  initialTipoTramite:  Array<TipoTramite> =new Array<TipoTramite>(); 
  initialTipoTramiteTemp:  Array<TipoTramite> =new Array<TipoTramite>();
  initialTramite:Array<Tramite> = new Array<Tramite>();
  
  punto:Punto=new Punto()
  ticketArea:TicketArea=new TicketArea()

  constructor(private servItemService:ConectionService) { 
    
  }

  ngOnInit() {
    this.inicialToken = JSON.parse(localStorage.getItem("token"));
    if(this.inicialToken!=undefined){
      this.sesion=true
      this.iniciarDatos()
    }
  }

  login(valor){
    console.log("daniel") 
    if(this.usuario!=""&&this.password!=""){
      this.User = new Usuario()
      this.User.username=this.usuario
      this.User.password=this.password
      this.getCredencial()
    }
    else{
      alert("Escriba un nombre y password al ingresar")
    }
  }

  logout(){
    this.refresh()
  }

  keyPressPass(event: KeyboardEvent) {    
    if (event.keyCode == 13) {
      this.login('login') 
    }
  }

  changeChk(event){
    this.chkRecordar=event.target.checked
  }

  getCredencial(){  
    this.servItemService.servAuth(this.User).subscribe(
      res=>{        
        var resp=JSON.parse(JSON.stringify(res))._body;        
        var ddd=JSON.parse(resp)
        
        console.log(ddd+" res:"+res.status)                        
        if(res.status==200){
          this.errorNP=true
          this.sesion=true
          localStorage.setItem('token',JSON.stringify(ddd))
          this.getPunto() 
        }
      },
      error=>{
        console.log(error)
        this.errorNP=false
      }
    )
  }

  getPunto(){
    this.servItemService.servPunto().subscribe(
      res=>{        
        var resp=JSON.parse(JSON.stringify(res))._body;        
        var ddd=JSON.parse(resp)
        this.inicialPunto=ddd
        this.guardarUsuario()
      },
      error=>{console.log(error)
      }
    )    
  }
  guardarUsuario(){
    var token=new Token()
    token=JSON.parse(localStorage.getItem('token'))
    this.inicialPunto.forEach(element => {
      console.log(element.usuario.id)
      if(element.usuario.id==token.user){
        localStorage.setItem('punto',JSON.stringify(element))
        this.iniciarDatos()
      }      
    });

    if(JSON.parse(localStorage.getItem('punto'))==null){
      alert("No esta esta habilitado")
      this.refresh()
    }
  }


  consultaBase(){
    this.servItemService.servBase().subscribe(
      res=>{        
        var resp=JSON.parse(JSON.stringify(res))._body;        
        var ddd=JSON.parse(resp)
        this.initialBase = ddd
        localStorage.setItem('base',JSON.stringify(this.initialBase))
      },
      error=>console.log(error)
    )
  }
  getTicketArea(){
    this.servItemService.servTicketArea().subscribe(
      res=>{        
        var resp=JSON.parse(JSON.stringify(res))._body;        
        var ddd=JSON.parse(resp)
        this.initialTicketArea=ddd
        this.saveTickArea()
      },
      error=>{console.log(error)}
    )
  }

  saveTickArea(){
    this.initialTicketArea.forEach(element => {
      if(element.area.id==this.punto.plataforma.area.id){
        this.initialTicketAreaTemp.push(element)        
      }
    });
    localStorage.setItem('ticketArea',JSON.stringify(this.initialTicketAreaTemp))
  }

  consultarTipoTramite(){
    this.servItemService.servTipoTramite().subscribe(
      res=>{        
        var resp=JSON.parse(JSON.stringify(res))._body;
        var ddd=JSON.parse(resp)
        this.initialTipoTramite =ddd
        this.saveTipoTramite()     
      },
      error=>console.log(error)
    )
  }

  saveTipoTramite(){
    this.initialTipoTramite.forEach(element => {
      if(element.area.id==this.punto.plataforma.area.id){
        this.initialTipoTramiteTemp.push(element)        
      }
    });
    localStorage.setItem('TipoTramite',JSON.stringify(this.initialTipoTramiteTemp))
  }

  iniciarDatos(){    
    this.punto=JSON.parse(localStorage.getItem('punto'))
    if(this.punto==null){
      alert("No esta esta habilitado")
      this.refresh()
    }
    else{
      this.consultaBase()
      this.getTicketArea()
      this.consultarTipoTramite()
    }
  }
  refresh(): void {
    localStorage.clear();
    window.location.reload();
  }
}
