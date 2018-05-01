import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { retry } from 'rxjs/operator/retry';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { NavController } from 'ionic-angular';
import { HomePage } from '../../pages/home/home';


/*
  Generated class for the SondageProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SondageProvider {
    public sondageAPI = "http://192.168.1.95:8000/api/commune/";
    public participationAPI = "http://192.168.1.95:8000/api/commune/";
  private _headers: HttpHeaders;
  constructor(public http: HttpClient, private _storage: Storage) {
    console.log('Hello SondageProvider Provider');
    this._headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    this._headers.set('Accept-Charset', 'utf-8');
    // token adding to header should be in Httpinterceptor -> 1*
    let token = "";
    this._storage.get("token").then((data)=>{
      if(data.length != 0){
        token = data;
      }
      else{
        console.log("no token for user");
      }
    },err=>{
      console.log("shit bad things happen");
    });
    this._headers.set('token',token);

  }
  // list des sondages
public getSondageList(id_commune: string,id_sondage: string) {
      const listUrl= this.sondageAPI+id_commune+"/sondages/";
      return this.http.get(this.sondageAPI, { headers: this._headers });
}
public SondageParticipation(token: string,participation: boolean,commune: string,id_sondage:string) {
  const listUrl = this.participationAPI+commune+"/sondages/" + id_sondage + "participation/new";
   return this.http.post(this.participationAPI, { headers: this._headers });
}
}
