import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the AuthentificationProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthentificationProvider {
  private registerAPI: string = "http://localhost:8000/api/register";
  private loginAPI: string = "http://localhost:8000/api/login_check";
  private _headers : HttpHeaders;
  constructor(public http: HttpClient) {
    console.log('Hello AuthentificationProvider Provider');
    this._headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    this._headers.set('Accept-Charset','utf-8');
  }

  public registerUser(nom: string , prenom: string ,email: string , password :string){
    let params = {
      'nom':nom,
      'prenom':prenom,
      'email':email,
      'password':password
    }
    const body = new HttpParams()
      .set('nom', nom)
      .set('prenom', prenom)
      .set('email', email)
      .set('password', password)
    return this.http.post(this.registerAPI,body.toString(),{headers:this._headers});
  }
}
