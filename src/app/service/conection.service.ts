import { Injectable } from '@angular/core';
import { Http,Headers } from '@angular/http';
import { HttpClient, } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ConectionService {
  public NetWorkUrl="http://10.1.43.39/tiketera/sinapp.servicios/";
  public url="http://10.1.43.160:8000/"

  constructor(private http: Http,private httpClient: HttpClient) { }
  option(){
    let headerDict = {
      'Authorization': 'Token c17aaabf30f5d54baf85ae586cddbc5b7576a822',
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
}
