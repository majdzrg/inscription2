import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AddpersonPage } from '../addperson/addperson';
import { AuthentificationProvider } from '../../providers/authentification/authentification';
import { Dialogs } from '@ionic-native/dialogs';
import { HomePage } from '../home/home';
import { TabsPage } from '../tabs/tabs';
import { LoadingController } from 'ionic-angular';
import { UserServiceProvider } from '../../providers/user-service/user-service';
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
  private user_save={
    name_u:'',
    last_name:'',
    username:'',
    email:'',
    commune:[],
  };

  addperson = AddpersonPage;
  private loader;
  constructor(public navCtrl: NavController, public navParams: NavParams, private _auth: AuthentificationProvider, private _dialog: Dialogs, public loadingCtrl: LoadingController, private _userService:UserServiceProvider) {
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
          this._auth.setSession(data["data"]).then((val) => {
            // save also profile whene login
            this._userService.getUser(data["data"]).subscribe((val) => {
              if(val["status"] == true ){
                val = val['data'];
                this.user_save.email = val['email'];
                this.user_save.name_u = val['prenom'];
                this.user_save.last_name = val['nom'];
                if (val['communes'] != "Aucune commune")
                {
                  let tmpc = val['communes'];
                  tmpc.forEach(element => {
                    this.user_save.commune.push({id:element.id,name:element.nom});
                  });
                }
                else
                {
                  this.user_save.commune = [];
                }
                // save to storage
                this._auth.saveUserSession(this.user_save);
                this.navCtrl.setRoot(HomePage);
              }
              else{
                console.log("empty data");
                this.navCtrl.setRoot(HomePage);
              }

            }, err => {
              console.log(err);
              this.navCtrl.setRoot(HomePage);
            })
            // keep in logic and go
          }, (err) => {
            this._dialog.alert('The app is crushing , plz restart it', 'error', 'ok').then(() => {
              console.log("oh shit");
              return false;
            })
              .catch((e) => {
                console.log("we keep crashing");
              })
          });
          this._dialog.alert('you are succesfully authentified','success', 'ok')
            .then(() => {
              console.log('Dialog dismissed');
              // save session
            })
            .catch(e => {
              console.log('Error displaying dialog', e);
              this.navCtrl.setRoot(HomePage);
            });
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
