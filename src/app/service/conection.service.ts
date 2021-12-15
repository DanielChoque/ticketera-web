import { Injectable } from '@angular/core';
import { Http,Headers } from '@angular/http';
import { HttpClient, } from '@angular/common/http';
import { Token } from '../model/modelos';

@Injectable({
  providedIn: 'root'
})
export class ConectionService {
  public NetWorkUrl="http://10.1.43.39/tiketera/sinapp.servicios/";
  public url="http://10.1.26.162:8080/"
  //public url="http://127.0.0.1:8080/pag/"
  //public url="http://127.0.0.1:8080/"


  constructor(private http: Http,private httpClient: HttpClient) { }
  option(){
    var token=new Token()
    token=JSON.parse(localStorage.getItem('token'))
    let headerDict = {
      'Authorization': 'Token '+token.token,
    }
    
    let requestOptions = {                                                                                                                                                                                 
      headers: new Headers(headerDict), 
    };
    return requestOptions
  }
  servSubTramites(){
    let url =this.url+"api/1.0/subtram/";
    
    return this.http.get(url, this.option())
  }
  servTramites(){
    let url =this.url + "api/1.0/tram/";
    return this.http.get(url,this.option());
  }
  servTickets(){
    let url =this.url + "api/1.0/ticket/";
    return this.http.get(url,this.option());
  }
  servTipoTramite(){
    let url =this.url + "api/1.0/tipotram/";
    return this.http.get(url,this.option());
  }

  servBase(){
    let url =this.url + "api/1.0/base/";
    return this.http.get(url,this.option());
  }
  servTicketArea(){
    let url =this.url + "api/1.0/ticketarea/";
    return this.http.get(url,this.option());
  }
  servAuth(user){
    let url =this.url + "api_generate_token/"
    return this.http.post(url,user,null);
  }
  servPunto(){
    let url =this.url + "api/1.0/punto/"
    return this.http.get(url,this.option());
  }

  servAtencion(atem){
    let url =this.url + "create_atencion/"
    //let url =this.url + "pp/"
    return this.http.post(url,atem,this.option());
  }
  servTime(){
    //let url =this.url + "create_atencion/"
    let url =this.url + "fecha/"
    return this.http.get(url,this.option());
  }
}
