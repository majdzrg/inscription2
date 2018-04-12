import { Component } from '@angular/core';
import { IonicPage,  NavController,  NavParams, ViewController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { AuthentificationProvider } from '../../providers/authentification/authentification';
import { HomePage } from '../home/home';
import { AddpersonPage } from '../addperson/addperson';
/**
 * Generated class for the MoreMenuPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-more-menu',
  templateUrl: 'more-menu.html',
})
export class MoreMenuPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, private _auth: AuthentificationProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MoreMenuPage');
  }

  close() {
    this.viewCtrl.dismiss();
  }
  logout(){
    //this.viewCtrl.dismiss();
    // clear session
    // rooting
    this._auth.logout();
    this.viewCtrl.dismiss();
    this.navCtrl.push(HomePage);
  }
  login(){
    this.navCtrl.push(LoginPage);
  }



}
