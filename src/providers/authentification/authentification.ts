import { catchError } from 'rxjs/operators';
import { retry } from 'rxjs/operator/retry';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable, EventEmitter } from '@angular/core';
import { Storage } from '@ionic/storage';
import { NavController } from 'ionic-angular';
import { HomePage } from '../../pages/home/home';
/*
  Generated class for the AuthentificationProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

@Injectable()
export class AuthentificationProvider {
  private registerAPI: string = "http://192.168.1.94:8000/api/register";
  private loginAPI: string = "http://192.168.1.94:8000/api/login";
  private _headers: HttpHeaders;
  public isConnected = false;
  userAuthUpdated:EventEmitter<boolean> = new EventEmitter();

  constructor(public http: HttpClient, private _storage: Storage) {
    console.log('Hello AuthentificationProvider Provider');
    this._headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    this._headers.set('Accept-Charset', 'utf-8');
    // call on construct run
    this.isAuthenticated();
  }

  public registerUser(nom: string, prenom: string, email: string, password: string) {
    const body = new HttpParams()
      .set('nom', nom)
      .set('prenom', prenom)
      .set('email', email)
      .set('password', password)
    return this.http.post(this.registerAPI, body.toString(), { headers: this._headers });
  }

  public loginUser(email: string, password: string) {
    const body = new HttpParams()
      .set('email', email)
      .set('password', password)
    return this.http.post(this.loginAPI, body.toString(), { headers: this._headers });
  }

  /**
   *
   * @param authResult
   */

  public setSession(token) {
    // set session by add token key and value in local storage
    return this._storage.set('token', token);
  }
  /**
   * logout
   */
  public logout() {
    this._storage.clear().then(val => {
      console.log("done");
    }, err => {
      console.log("Error");
    });
  }

  public isAuthenticated() {
    // check if there is token in local storage or not
    this._storage.get('token').then((val)=>{
      if(val != null){
        this.userAuthUpdated.emit(true);
      }
      else
      {
        this.userAuthUpdated.emit(false);
      }
    },(err)=>{
      this.userAuthUpdated.emit(false);
      console.log(err);
    });
  }
  // bech nbadlo 7ajat fama mochekla binet el observable w el promise
  // mala 4alttaa xD
  public getToken(){
    return this._storage.get('token')
  }
  public saveUserSession(user:object){
    this._storage.set("profile",JSON.stringify(user)).then((data)=>{
      console.log("saved in storage");
    })
    .catch((err)=>{
      console.log("we cant save");
    })
  }
}
