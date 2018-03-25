import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ViewController } from 'ionic-angular';
import { LoginPage } from "../login/login";
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

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
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
    //this.navCtrl.setRoot(LoginPage);
    this.navCtrl.push(LoginPage)
  }

}
