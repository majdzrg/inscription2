
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
 HEAD
  public communeAPI = "http://192.168.1.90:8000/api/commune/";
  public commentaireAPI ="http://192.168.1.90:8000/api/commune/";
  public voteAPI ="http://192.168.1.90:8000/api/commune/";
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
      console.log(id_commune+"   "+id_projet);

        const listUrl= this.commentaireAPI+id_commune+"/projets/"+id_projet+"/commentaires/";
        return this.http.get(listUrl, { headers: this._headers });


    }
    public ProjectVote(id_commune: string,id_projet: string) {
      console.log(id_commune+"   "+id_projet);
        const listUrl= this.voteAPI+id_commune+"/projets/"+id_projet+"/votes/";
       return this.http.get(listUrl, { headers: this._headers });
    }

    /**
     * commentProject
     */
    public commentProject(token:string,id_proj:string,id_commune:string,commentaire:string) {
      let body = new HttpParams()
      .set("token",token)
      .set("contenu",commentaire);
      let send_url = this.commentaireAPI+id_commune+"/projets/"+id_proj+"/commentaires/new";
      return this.http.post(send_url,body,{headers:this._headers});
    }

    /**
     * voteProject
     */

    public voteProject(token:string,id_project:string,id_commune:string) {
      let urlToLike = this.voteAPI+id_commune+"/projets/"+id_project+"/votes/new";
      let body = new HttpParams()
      .set("token",token);
      return this.http.post(urlToLike,body,{headers:this._headers});
    }


}
