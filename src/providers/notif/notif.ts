import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the NotifProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class NotifProvider {
  apiURL = "192.168.1.94:8000/api/notification";
  token =''
  _headers: HttpHeaders;
  constructor(public http: HttpClient) {
    console.log('Hello NotifProvider Provider');
    this._headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    this._headers.set('Accept-Charset', 'utf-8');
  }
  getNotifs(){
    let url = this.apiURL+'?token='+this.token;
    return this.http.get(url,{headers:this._headers});
  }
  vueNotif(id:string){
    let url = this.apiURL+'/vue/'+id;
    const body = new HttpParams()
      .set('token', this.token)
    return this.http.post(url,body.toString(),{headers:this._headers})
  }
  vueAll(){
    let url = this.apiURL + '/vue';
    const body = new HttpParams()
      .set('token', this.token)
    return this.http.post(url, body.toString(), { headers: this._headers })
  }

}
