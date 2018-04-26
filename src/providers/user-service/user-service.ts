import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { AuthentificationProvider } from '../authentification/authentification';
import { Observable } from 'rxjs/Observable';
/*
  Generated class for the UserServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UserServiceProvider {
  _headers: HttpHeaders;
  constructor(public http: HttpClient, private _storage: Storage, private _auth: AuthentificationProvider) {
    console.log('Hello UserServiceProvider Provider');
    this._headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    this._headers.set('Accept-Charset', 'utf-8');
  }
  public setCommune(id: string) {
    this._storage.set('id_commune', id).then((val) => {
      console.log(val);
    }, (err) => {
      console.log(err);
    });
  }
  public isCommuneSeted(): any {
    console.log("call commune id checker");
    this._storage.get('id_commune').then((val) => {
      console.log(val);
      if (val != null) {
        console.log("yes commune is there");
        return true;
      }
      else {
        console.log("no commune");
        return false;
      }
    }, (err) => {
      console.log("no commune");
      return false;
    });
  }
  public getCommune() {

  }
  public getUser(token: String) {
    let url = "http://localhost:8000/api/profil?token="+token;
    console.log(url);
    return this.http.get(url, { headers: this._headers })
  }

}
