import  { } from '@angular/common/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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
  constructor(public http: HttpClient) {
    console.log('Hello AuthentificationProvider Provider');
  }

  public registerUser(nom: string , prenom: string ,email: string , password :string){
    const params = {
      'nom':nom,
      'prenom':prenom,
      'email':email,
      'password':password
    }
    let newhead = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' });
    const options = new RequestOptions({
      method: RequestMethod.Post,
      headers: new Headers({ 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' })
    });
    new_option = new htt
    return this.http.post(this.registerAPI,params,{headers:newhead});
  }
}
