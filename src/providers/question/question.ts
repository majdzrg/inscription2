import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthentificationProvider } from '../authentification/authentification';

/*
  Generated class for the QuestionProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

@Injectable()
export class QuestionProvider {
  _headers: HttpHeaders;
  token;
  constructor(public http: HttpClient, private _authService: AuthentificationProvider) {
    console.log('Hello QuestionProvider Provider');
  }
  getQuestionList(token:string){
    let url = "http://192.168.1.94:8000/api/question/?token=" + token;
    console.log(url);
    return this.http.get(url, { headers: this._headers })
}
getQuestionInfo(id: string, token: String){
  let url = "http://192.168.1.36:8000/api/question/id?token=" + token;
  console.log(url);
  return this.http.get(url, { headers: this._headers })


}
  sendQuestion(question) {
    let sujet = question.sujet;
    let contenu = question.contenu;
    let date = question.date;

    let url = "http://192.168.1.36:8000/api/question/new";
    const body = new HttpParams()
      .set('token', this.token)
      .set('contenu', contenu)
      .set('commune', question.commune)

    return this.http.post(url, body.toString(), { headers: this._headers });
  }
  public Delete_Question(token) {
    let url = "http://192.168.1.36:8000/api/question/id/";
    //this._headers.set("token",token);
    this._headers = this._headers.append('token', token);
    let headerAbc = new HttpHeaders({ 'token': token });
    return this.http.delete(url, { headers: headerAbc });

    //method delete
  }
}
