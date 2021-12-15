import { Component, OnInit } from '@angular/core';
import { Base } from 'src/app/model/modelos';

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.css']
})
export class BaseComponent implements OnInit {
  initialBase: Array<Base> =new Array<Base>();
  initialBaseTemp: Array<Base> =new Array<Base>(); 
  consultaText : string
  username:string

  constructor() { }

  ngOnInit() {
  }

  consulta(acc){
    
    this.initialBase = JSON.parse(localStorage.getItem("base"));
    var a=this.findMatches(this.consultaText,this.initialBase)
    this.initialBaseTemp = a
    //console.log(a)
    console.log("acc:"+acc);
    if(acc=="Todo"){
      this.initialBaseTemp = JSON.parse(localStorage.getItem("base"));
    }    
    if(acc=="Limpiar"){
      this.consultaText = ""
      this.initialBaseTemp=new Array<Base>()
    }
  }

  findMatches(wordToSearch, cities) {
    return cities.filter(place => {
        const regex = new RegExp(wordToSearch, 'gi');
        return place.pregunta.match(regex) 
    })
  }

  keyPress(event: KeyboardEvent) {
    //See notes about 'which' and 'key'
    if (event.keyCode == 13) {
      this.consulta(this.consultaText)
    }
  }
  
  colorStyleSw(swColor){
   // console.log("swColor:"+swColor)
    if(swColor == "NO VIGENTE") {
      return {background: 'red', color: 'white'}
    }
    else {
     // return {background: 'black', color: 'white'}
      //return {'background-color':'#00000000'}
    }
  }

}
