import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthentificationProvider } from '../../providers/authentification/authentification';

/**
 * Generated class for the AddpersonPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: 'addperson-page',
  segment: 'addperson'
})
@Component({
  selector: 'page-addperson',
  templateUrl: 'addperson.html',
})
export class AddpersonPage {
  private user = {
    name : '',
    last_name :'',
    email:'',
    password:'',
    conf_password:''
  }
  constructor(public navCtrl: NavController, public navParams: NavParams , private _auth : AuthentificationProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddpersonPage');
  }
  RegisterForm(){
    if (this.user.password === this.user.conf_password) {
      if (this.user.name.length > 3 && this.user.last_name.length > 2 && this.user.password.length >= 8) {
        this._auth.registerUser(this.user.name,this.user.last_name,this.user.email,this.user.password)
        .subscribe(data => {
          if (data['ok']== true) {
            console.log("registred");
          } else {
            console.log(data['msg']);
          }
        },err =>{
          console.log(err);
        });
      } else {
        console.log("params not valid");
      }
    } else {
      console.log("password not match");
    }
    console.log("register form");
  }
}
