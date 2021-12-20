import { Component, OnInit } from '@angular/core';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  downloadPDF(){
    
  }

  data = 
    {
      id : 1,
      agencia: "AGENCIA TRIBUTARIA CARANAVI",
      inicioHora: "2021-12-10 11:05:45",
      finalHora : "2021-12-10 13:32:45"
    };
}
