import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the ProjectsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ProjectsProvider {

  private _headers: HttpHeaders;
  constructor(public http: HttpClient,, private _storage: Storage) {
    console.log('Hello ProjectsProvider Provider');
    this._headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    this._headers.set('Accept-Charset', 'utf-8');
  }
  public ProjectListe(id_commune: string) {
    const listUrl="http://127.0.0.1:8000/api/commune/"+id_commune+"/projets";
    return this.http.get(listUrl, { headers: this._headers });
  }


}
