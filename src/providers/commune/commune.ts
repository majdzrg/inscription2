import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the CommuneProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CommuneProvider {

  communeApi = "http://192.168.1.90:8000/api/commune/";
  private _headers: HttpHeaders;
  constructor(public http: HttpClient) {
    console.log('Hello CommuneProvider Provider');
    this._headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    this._headers.set('Accept-Charset', 'utf-8');
  }
  getCommuneList(gov) {
    // return list of all gov
    let url = this.communeApi+"?gouvernorat="+gov;
    console.log(url);
    return this.http.get(url, { headers: this._headers });
  }

}
