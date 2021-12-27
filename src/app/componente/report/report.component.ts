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
  hiddenJefeNacio:boolean=true
  link
  linkP
  htmlString
  //constructor() { }
  constructor(private servItemService:ConectionService) {
    this.link=servItemService.urlp+"/pruebas-pdf/pdf.php"
    this.linkP=servItemService.urlp+"/reporte-pdf/pdf.php"
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
        console.log(JSON.stringify(ddd.contenido))  
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
    /*this.servItemService
    var formData = new FormData();
    formData.append("contenido",  "ddddddddd");
    console.log(formData.getAll('contenido'))
    var request = new XMLHttpRequest();
    request.onreadystatechange=function(){
      if (request.readyState === 4 && request.status ===200) {
        
  var new_window = window.open(null, '','_blank');
  new_window.document.write(request.response);
      }
    }
    
    request.open("POST", "http://10.1.43.236/pruebas-pdf/pdf.php");
    
    request.send('{"contenido":'+this.htmlString+'}');
    console.log("dow")*/
    /*this.reporte('POST', 'http://10.1.43.236/pruebas-pdf/pdf.php', {contenido: this.htmlString},'_blank')
    this.limpiar()*/
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
    if(this.punto.ventanilla.cod=="NAL"){
      this.hiddenJefeNacio=false
    }
    if(this.punto.ventanilla.cod=="JDA"){
      this.hiddenJefeNacio=false
    }
    if(this.punto.ventanilla.cod=="V1"){
      this.hiddenJefeNacio=false
    }
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
        console.log(JSON.stringify(ddd.contenido))  
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
  reporte(verb, url, data, target){
    var form = document.createElement("form");
        form.action = url;
        form.method = verb;
        form.target = target || "_self";
        //form.enctype= "application/json";
        if (data) {
            for (var key in data) {
                var input = document.createElement("textarea");
                input.name = key;
                input.value = typeof data[key] === "object"
                    ? JSON.stringify(data[key])
                    : data[key];
                form.appendChild(input);
                //console.log(input.value)
            }
        }
        //.appendChild();
        /*var input = document.createElement("textarea");
        input.name = "contenido";
        input.id="contenido"
        input.value = "daniel";
        console.log(input.name)*/
        var container = document.createElement("INPUT");
        container.setAttribute("type", "text");
        container.setAttribute("name", "contenido");
        container.setAttribute("id", "contenido");
        container.setAttribute("value", this.htmlString);
        console.log(form);
        form.appendChild(container);
        form.appendChild(input);
        //form.append("contenido",  "ddddddddd");
        form.style.display = 'none';
        document.body.appendChild(form);
        form.submit();
        document.body.removeChild(form);
  }
  
  
  generatePDF2(){
    this.consultaReporte2()
  }
  consultaReporte2(){
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
    this.servItemService.servReporte2(datos).subscribe(
      res=>{ 
        console.log(datos)       
        var resp=JSON.parse(JSON.stringify(res))._body;        
        var ddd=JSON.parse(resp)
        this.htmlString=ddd.contenido
        //console.log(this.htmlString)  
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
  downloadPDF2(){
    this.reporte('POST', this.linkP, {contenidos: this.htmlString},'_blank')
    this.limpiar()
  }
}
