import {catchError} from 'rxjs/operators';
import {retry} from 'rxjs/operator/retry';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
/*
  Generated class for the AuthentificationProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthentificationProvider {
  private registerAPI: string = "http://192.168.1.93:8000/api/register";
  private loginAPI: string = "http://192.168.1.93:8000/api/login_check";
  private _headers : HttpHeaders;
  constructor(public http: HttpClient,private _storage: Storage) {
    console.log('Hello AuthentificationProvider Provider');
    this._headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    this._headers.set('Accept-Charset','utf-8');
  }
  public registerUser(nom: string , prenom: string ,email: string , password :string){
    const body = new HttpParams()
      .set('nom', nom)
      .set('prenom', prenom)
      .set('email', email)
      .set('password', password)
    return this.http.post(this.registerAPI,body.toString(),{headers:this._headers});
  }
  public loginUser(email: string , password :string){
    const body = new HttpParams()
      .set('email', email)
      .set('password', password)
    return this.http.post(this.loginAPI,body.toString(),{headers:this._headers});
  }

  /**
   *
   * @param authResult
   */

  public setSession(authResult) {
    // set session by add token key and value in local storage
    this._storage.set('token',authResult.token).then(val=> {
      // done job
      console.log(val);

    },err =>{
      // ooh shit err here
      console.log(err);

    })
  }
  /**
   * logout
   */
  public logout() {
    // logout user by delete his token
    this._storage.remove('token').then(val=>{
      console.log(val);
    },err =>{
      console.log(err);
    });
  }

  public isAuthenticated() {
    // check if there is token in local storage or not
    let flag = false;
    this._storage.get('token').then((val) => {
      return true;
    },(err)=>{
      return false
    });
  }
}
