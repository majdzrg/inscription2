
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { retry } from 'rxjs/operator/retry';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { NavController } from 'ionic-angular';
import { HomePage } from '../../pages/home/home';

/*
  Generated class for the ProjectsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ProjectsProvider {
  public communeAPI = "http://192.168.1.12:8000/api/commune/";
  public commentaireAPI ="http://192.168.1.12:8000/api/commune/projets/";
    public voteAPI ="http://192.168.1.12:8000/api/commune/projets/";
  private _headers: HttpHeaders;
  constructor(public http: HttpClient, private _storage: Storage) {
    console.log('Hello ProjectsProvider Provider');
    this._headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    this._headers.set('Accept-Charset', 'utf-8');
  }
  public ProjectListe(id_commune: string) {
    const listUrl= this.communeAPI+id_commune+"/projets/";
    console.log(listUrl)
    return this.http.get(listUrl);
  }
    public ProjectCommentaire(id_commune: string,id_projet: string) {
        const listUrl= this.commentaireAPI+id_commune+id_projet+"/commentaires/";
        return this.http.get(this.commentaireAPI, { headers: this._headers });


    }
    public ProjectVote(id_commune: string,id_projet: string) {
        const listUrl= this.voteAPI+id_commune+id_projet+"/votes/";
       return this.http.get(this.voteAPI, { headers: this._headers });
    }


}
