import { Component, OnInit } from '@angular/core';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { ConectionService } from 'src/app/service/conection.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {
  impr:boolean=true
  //constructor() { }
  constructor(private servItemService:ConectionService) { }

  ngOnInit() {
  }
  downloadPDF(){
    this.consultaReporte()
  }
  consultaReporte(){
    this.servItemService.servReporte(this.datos).subscribe(
      res=>{        
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

  data = 
    {
      id : 1,
      agencia: "AGENCIA TRIBUTARIA CARANAVI",
      inicioHora: "2021-12-10 11:05:45",
      finalHora : "2021-12-10 13:32:45"
    };
  datos={
    "inicio":"2021-11-10 10:02:25",
    "final":"2021-12-15 19:02:25",
    "area":"1",
    "plataforma":"AGENCIA TRIBUTARIA CARANAVI",
    "responsable":"danielchoque canaviri"
  };
}
