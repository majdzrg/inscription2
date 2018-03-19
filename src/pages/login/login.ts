import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {AddpersonPage} from '../addperson/addperson';
import {HomePage} from '../home/home';
import { TabsPage } from '../tabs/tabs';
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: 'login-page',
  segment: 'login'
})
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  user={
    email:"",
    pass:""
  };
  verifed_user = {
    email:"majd-zr@live.com",
    pass:"azerty"
  }
  addperson = AddpersonPage;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  loginForm () {
    // use loader
    console.log("this is login form submit");
    if ((this.user.email == this.verifed_user.email) && (this.user.pass == this.verifed_user.pass)) {
      //this.navCtrl.push('home');

      this.navCtrl.setRoot(TabsPage);
    }
    else{
      // user ionic alert
      alert("wrong password or email");
    }
  }

  goToRegister(){
    this.navCtrl.push("addperson");
  }
}
