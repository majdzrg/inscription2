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
  public getUser(){
    // 7atech ltawa mzelna majbnech mel base mzelna nchofo 3ando data msajlin ou nn
    // this will return user data from server and save theme on localstorage 
    // check if existe data in local storage 

    /**
     * puisque le server down bech na3mel fake data lel interface w service 
     * 
     */
    return new Promise(function(resolve,reject){
      let user = {
        name: 'Madj',
        last_name: 'Zrighui baw',
        username: 'Zrighui_baw',
        email: 'majd@email.com',
        commune: {
          c1: '2',
          c2: '1',
          c3: '',
        },
      };
      this._storage.set('user',JSON.stringify(user)).then((val)=>{
        console.log(val);
      },err=>{
        console.log(err);
      })
      .catch(err=>{
        console.log(err);
      });

      
      this._storage.get('user').then((val) => {
        if (val != null && val.length != 0) {
          // yes user is in storage
          resolve(JSON.parse(val)) // hethi traja3 el valeur mel storage dans une promise bech el prog yab9a yestana fel resultat
        }
        else {
          // user not in storage
          reject("no user"); // kifkif ama hethi traja3 reject w moch resultat 
        }
      }, err => {
        console.log(err);
      })
        .catch((e) => {
          console.log(e);

        });
    });
     

    
  }
  
}
