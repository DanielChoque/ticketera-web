import { Component, OnInit } from '@angular/core';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { ConectionService } from 'src/app/service/conection.service';
import { Punto } from 'src/app/model/modelos';
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
  //constructor() { }
  constructor(private servItemService:ConectionService) { }

  ngOnInit() {
  }
  generatePDF(){
    this.consultaReporte()
  }
  consultaReporte(){
    this.punto=JSON.parse(localStorage.getItem("punto"))
    
    //var date =new Date(this.final.setHours(this.final.getHours()+19))
    var datos={
      "inicio":this.inicio,
      "final":this.final,
      "area":this.punto.plataforma.area.id,
      "plataforma":this.punto.plataforma.oficina.nombre,
      "responsable":this.punto.usuario.first_name+" "+this.punto.usuario.last_name,
      "medio":this.punto.plataforma.area.nombre +" "+this.punto.plataforma.area.cod
    }
    this.servItemService.servReporte(datos).subscribe(
      res=>{ 
        console.log(datos)       
        var resp=JSON.parse(JSON.stringify(res))._body;        
        var ddd=JSON.parse(resp)
        console.log(ddd.response)  
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
    this.limpiar()
  }

  data = 
    {
      id : 1,
      agencia: "AGENCIA TRIBUTARIA CARANAVI",
      inicioHora: "2021-12-10 11:05:45",
      finalHora : "2021-12-10 13:32:45"
    };
  
}
