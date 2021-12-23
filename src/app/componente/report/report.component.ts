import { Component, OnInit } from '@angular/core';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { ConectionService } from 'src/app/service/conection.service';
import { Oficina, Punto, Token } from 'src/app/model/modelos';
import { MatDatepickerInputEvent } from '@angular/material';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {
  impr:boolean=true
  punto:Punto = new Punto()
  pickerHH
  pickerD
  inicio
  final
  horaFinal="23:59:59"
  initialOficina: Array<Oficina> =new Array<Oficina>(); 
  inicialToken: Array<Token> =new Array<Token>();
  oficina=""
  tipo="punto"
  hiddenOfic:boolean=true
  hiddenAge:boolean=true
  hiddenNac:boolean=true
  link
  htmlString
  //constructor() { }
  constructor(private servItemService:ConectionService) {
    this.link=servItemService.urlp+"/pruebas-pdf/pdf.php"
   }

  ngOnInit() {
    this.inicialToken = JSON.parse(localStorage.getItem("token"));
    if(this.inicialToken!=undefined){
      this.iniciarDatos()
    }
  }
  generatePDF(){
    this.consultaReporte()
  }
  consultaReporte(){
    this.punto=JSON.parse(localStorage.getItem("punto"))
    
    //var date =new Date(this.final.setHours(this.final.getHours()+19))
    if(this.oficina==""){
      this.oficina=this.punto.plataforma.oficina.nombre
    }
  
    var datos={
      "inicio":this.inicio,
      "final":this.final,
      "area":this.punto.plataforma.area.id,
      "plataforma":this.oficina,
      "responsable":this.punto.usuario.first_name+" "+this.punto.usuario.last_name,
      "medio":this.punto.plataforma.area.nombre +" "+this.punto.plataforma.area.cod,
      "punto":this.punto.id,
      "tipo":this.tipo
    }
    this.servItemService.servReporte(datos).subscribe(
      res=>{ 
        console.log(datos)       
        var resp=JSON.parse(JSON.stringify(res))._body;        
        var ddd=JSON.parse(resp)
        this.htmlString=JSON.stringify(ddd.contenido)
        //console.log(JSON.stringify(ddd.contenido))  
        if(ddd.response=="si"){
          this.impr=false
        } 
        else{
          this.limpiar()
        }

      },
      error=>console.log(error)
    )
  }
  limpiar(){
    this.impr=true
  }
  events: string[] = [];

  addEventD(type: string, event: MatDatepickerInputEvent<Date>) {
    //this.events.push(`${type}: ${event.value}`);
    //console.log("desde:"+event.value)
    this.inicio=event.value
  
  }
  addEventH(type: string, event: MatDatepickerInputEvent<Date>) {
    //this.events.push(`${type}: ${event.value}`);
    //console.log("hasta:"+event.value)
    this.final=event.value
  }
  downloadPDF(){
    this.servItemService
    this.limpiar()
  }
  iniciarDatos(){
    this.initialOficina = JSON.parse(localStorage.getItem("oficina"));
    this.punto=JSON.parse(localStorage.getItem("punto"))
    //console.log(this.initialOficina)
  }
  subTramiteLLenar(id,event){
    
    if(event.target.checked==true){      
      this.initialOficina.forEach(element => {  
        if(id==element.id){
         console.log(element)
         this.oficina=element.nombre
         this.tipo="agencia"
        }
      });
      
    }
  }
  tipoR(id,event){
    console.log(id)
    this.tipo=id;
  }
  masDatos(){
    this.iniciarDatos()
    this.hiddenOfic=false
    console.log(this.punto.plataforma.oficina.cod)
    if(this.punto.plataforma.oficina.cod=="DSC"){
      this.hiddenNac=false
    }else{
      this.hiddenAge=false
    }
    
    
  }
  imprimirReporte(){
    this.punto=JSON.parse(localStorage.getItem("punto"))
    
    //var date =new Date(this.final.setHours(this.final.getHours()+19))
    if(this.oficina==""){
      this.oficina=this.punto.plataforma.oficina.nombre
    }
  
    var datos={
      "response":"si",
      "contenido":this.htmlString
    }
    this.servItemService.servReporte(datos).subscribe(
      res=>{ 
        console.log(datos)       
        var resp=JSON.parse(JSON.stringify(res))._body;        
        var ddd=JSON.parse(resp)
        //console.log(JSON.stringify(ddd.contenido))  
        if(ddd.response=="si"){
          this.impr=false
        } 
        else{
          this.limpiar()
        }

      },
      error=>console.log(error)
    )
  }

  data = 
    {
      id : 1,
      agencia: "AGENCIA TRIBUTARIA CARANAVI",
      inicioHora: "2021-12-10 11:05:45",
      finalHora : "2021-12-10 13:32:45"
    };
  
}
