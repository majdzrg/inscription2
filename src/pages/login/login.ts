import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AddpersonPage } from '../addperson/addperson';
import { AuthentificationProvider } from '../../providers/authentification/authentification';
import { Dialogs } from '@ionic-native/dialogs';
import { HomePage } from '../home/home';
import { TabsPage } from '../tabs/tabs';
import { LoadingController } from 'ionic-angular';
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
  user = {
    email: "",
    pass: ""
  };

  addperson = AddpersonPage;
  private loader;
  constructor(public navCtrl: NavController, public navParams: NavParams, private _auth: AuthentificationProvider, private _dialog: Dialogs, public loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  loginForm() {
    if (this.user.email.length > 5 && this.user.pass.length > 7) {
      // use loader
    this.presentLoading();
    console.log("this is login form submit");
    this._auth.loginUser(this.user.email, this.user.pass)
      .subscribe(data => {
        this.loader.dismiss();
        console.log(data);
        if (data['status'] === true) {
          console.log("authentifier");
          this._dialog.alert('you are succesfully authentified','success', 'ok')
            .then(() => {
              console.log('Dialog dismissed');
              // save session
              this._auth.setSession(data["data"]).then((val)=>{
                this.navCtrl.setRoot(HomePage);
              },(err)=>{
                this._dialog.alert('The app is crushing , plz restart it','error','ok').then(()=>{
                  console.log("oh shit");
                })
                .catch((e)=>{
                  console.log("we keep crashing");
                })
              });
            })
            .catch(e => console.log('Error displaying dialog', e));
        } else {
          console.log(data['msg']);
          this._dialog.alert(data['msg'])
          .then(() => console.log('Dialog dismissed'))
          .catch(e => console.log('Error displaying dialog', e));
        }
      }, err => {
        this.loader.dismiss();
        this._dialog.alert('no internet connection or problem with our servers , try later','Error')
          .then(() => console.log('Dialog dismissed'))
          .catch(e => console.log('Error displaying dialog', e));
        console.log(err);
      });
    } else {
      this._dialog.alert('All firld are required','Missing arguments','retry')
      .then(()=>{
        console.log("missing");
      })
      .catch(e =>{
        console.log(e);
      })
    }
  }
  goToRegister() {
    this.navCtrl.push("addperson");
  }
  presentLoading() {
    this.loader = this.loadingCtrl.create({
      content: "Please wait...",
    });
    this.loader.present();
  }

}
