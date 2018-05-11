import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthentificationProvider } from '../../providers/authentification/authentification';
import { Dialogs } from '@ionic-native/dialogs';
import { LoadingController } from 'ionic-angular';
import { LoginPage } from '../login/login';
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
  private loader;
  constructor(public navCtrl: NavController, public navParams: NavParams , private _auth : AuthentificationProvider ,private _dialog : Dialogs ,public loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddpersonPage');
  }
  RegisterForm(){
    if (this.user.password === this.user.conf_password) {
      if (this.user.name.length > 3 && this.user.last_name.length > 2 && this.user.password.length >= 8) {
        // load here
        this.presentLoading();
        this._auth.registerUser(this.user.name,this.user.last_name,this.user.email,this.user.password)
        .subscribe(data => {
          this.loader.dismiss();
          if (data['ok']== true) {
            console.log("registred");
            this._dialog.alert('you are succesfully registred , you are able to connect right now . ','User added','connect now')
              .then(() => {
                console.log('Dialog dismissed');
              })
              .catch(e => console.log('Error displaying dialog', e));
            this.navCtrl.setRoot(LoginPage);
          } else {
            this._dialog.alert(data['msg'])
              .then(() => console.log('Dialog dismissed'))
              .catch(e => console.log('Error displaying dialog', e));
          }
        },err =>{
          this.loader.dismiss();
          this._dialog.alert('no internet connection or problem with our servers , try later')
            .then(() => console.log('Dialog dismissed'))
            .catch(e => console.log('Error displaying dialog', e));
            console.log(err);
        });
      } else {
        this._dialog.alert('all the field are required')
          .then(() => console.log('Dialog dismissed'))
          .catch(e => console.log('Error displaying dialog', e));
      }
    } else {
      this._dialog.alert('bad password confirmation')
        .then(() => console.log('Dialog dismissed'))
        .catch(e => console.log('Error displaying dialog', e));
    }
  }
  presentLoading() {
    this.loader = this.loadingCtrl.create({
      content: "Please wait...",
    });
    this.loader.present();
  }
}
