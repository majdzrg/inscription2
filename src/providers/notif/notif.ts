import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthentificationProvider } from '../authentification/authentification';

/*
  Generated class for the NotifProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class NotifProvider {
  apiURL = "http://localhost:8000/api/notification";
  token =''
  _headers: HttpHeaders;
  constructor(public http: HttpClient,private _auth:AuthentificationProvider) {
    console.log('Hello NotifProvider Provider');
    this._headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    this._headers.set('Accept-Charset', 'utf-8');
    this._auth.getToken()
    .then((data)=>{
      if(data && data!=undefined && data.length > 0){
        this.token = data
      }
    })
    .catch((error)=>{
      console.log(error);
    })
  }
  getNotifs(token){
    let url = this.apiURL+'?token='+token;
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
