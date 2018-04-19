import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the CommuneProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CommuneProvider {

  communeApi = "http://localhost:8000/api/gouvernorat/";
  private _headers: HttpHeaders;
  constructor(public http: HttpClient) {
    console.log('Hello CommuneProvider Provider');
    this._headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    this._headers.set('Accept-Charset', 'utf-8');
  }
  getCommuneList() {
    // return list of all gov
    return this.http.get(this.communeApi, { headers: this._headers });
  }

}
