import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
/*
  Generated class for the UserServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UserServiceProvider {

  constructor(public http: HttpClient,private _storage:Storage) {
    console.log('Hello UserServiceProvider Provider');
  }
  public setCommune(id:string){
    this._storage.set('id_commune',id).then((val)=>{
      console.log(val);
    },(err)=>{
      console.log(err);
    });
  }
  public isCommuneSeted():any{
    console.log("call commune id checker");
    this._storage.get('id_commune').then((val)=>{
      console.log(val);
      if(val != null){
        console.log("yes commune is there");
        return true;
      }
      else{
        console.log("no commune");
        return false;
      }
    },(err)=>{
      console.log("no commune");
      return false;
    });
  }
  public getCommune(){

  }
  
}
