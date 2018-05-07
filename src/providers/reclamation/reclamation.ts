import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthentificationProvider } from '../authentification/authentification';

/*
  Generated class for the ReclamationProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ReclamationProvider {
  _headers: HttpHeaders;
  token;
  constructor(public http: HttpClient, private _authService:AuthentificationProvider) {
    this._authService.getToken().then((val)=>{
      this.token = val ; 
    }).catch((err)=>{
      console.log(err);
    })
    console.log('Hello ReclamationProvider Provider');
  }

  getReclamationList(token: String){
    let url = "http://localhost:8000/api/reclamation/?token=" + token;
    console.log(url);
    return this.http.get(url, { headers: this._headers })

  }

  getReclamationInfo(id: string, token: String){
    let url = "http://localhost:8000/api/reclamation/id?token=" + token;
    console.log(url);
    return this.http.get(url, { headers: this._headers })


  }

  sendReclamation(reclamation){
    let sujet = reclamation.sujet;
    let contenu = reclamation.contenu;
    let image= reclamation.image;
    let date = reclamation.date;
    let lat = reclamation.lat;
    let long = reclamation.long;
    let url = "http://localhost:8000/api/reclamation/new";
    const body = new HttpParams()
      .set('token', this.token)
      .set('contenu', contenu)
      .set('image', image)
      .set('lat', lat)
      .set('long', long)
      .set('commune',reclamation.commune)

    return this.http.post(url, body.toString(), { headers: this._headers });
  }
  public Delete_Reclamation(token) {
    let url = "http://localhost:8000/api/reclamation/id/";
    //this._headers.set("token",token);
    this._headers = this._headers.append('token', token);
    let headerAbc = new HttpHeaders({ 'token': token });
    return this.http.delete(url, { headers: headerAbc });
   
    //method delete
  }

}
