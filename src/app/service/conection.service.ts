import { Injectable } from '@angular/core';
import { Http,Headers } from '@angular/http';
import { HttpClient, } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ConectionService {
  public NetWorkUrl="http://10.1.43.39/tiketera/sinapp.servicios/";

  constructor(private http: Http,private httpClient: HttpClient) { }
  servSubTramites(){
    let url =this.NetWorkUrl + "ServTiketeraCargarSubTramitesCheck.php";
    return this.http.post(url,null);
  }
  servTramites(){
    let url =this.NetWorkUrl + "ServTiketeraCargarTramitesRadio.php";
    return this.http.post(url,null);
  }
  servTickets(){
    let url =this.NetWorkUrl + "ServTiketeraCargarTicketButton.php";
    return this.http.post(url,null);
  }
}
