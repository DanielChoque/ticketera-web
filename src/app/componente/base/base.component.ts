import { Component, OnInit } from '@angular/core';
import { Base } from 'src/app/model/modelos';

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.css']
})
export class BaseComponent implements OnInit {
  initialBase: Array<Base> =new Array<Base>();  

  constructor() { }

  ngOnInit() {
  }

  consulta(acc){
    this.initialBase = JSON.parse(localStorage.getItem("base"));
    //console.log(this.initialBase);

  }

}
