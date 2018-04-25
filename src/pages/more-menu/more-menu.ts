import { Component } from '@angular/core';
import { IonicPage,  NavController,  NavParams, ViewController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { ProfilePage } from '../profile/profile';
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
  private isConnected:boolean = false;
  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, private _auth: AuthentificationProvider) {
    console.log("more menu on");
    this._auth.isAuthenticated();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MoreMenuPage');
  }

  close() {
    this.viewCtrl.dismiss();
  }
  logout(){
    this._auth.logout();
    this.viewCtrl.dismiss();
    this.navCtrl.push(HomePage);
  }
  login(){
    this.navCtrl.push(LoginPage);
  }
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this._auth.userAuthUpdated.subscribe((iscon)=>{
      this.isConnected = iscon;
    },(err)=>{
      console.log(err);
    });
  }
  Toprofile():void{
    this.navCtrl.push(ProfilePage);
  }


}
