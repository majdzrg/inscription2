import {HomePage} from '../home/home';
import {UserServiceProvider} from '../../providers/user-service/user-service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController, ModalController, LoadingController } from 'ionic-angular';
import { EditProfilePage } from "../edit-profile/edit-profile";
import { AuthentificationProvider } from '../../providers/authentification/authentification';
import { EmptyExpr } from '@angular/compiler';
/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  private user={
    name_u:'',
    last_name:'',
    username:'',
    email:'',
    commune:[],
  };
  pic_url ;
  constructor(public navCtrl: NavController, public loadingCtrl: LoadingController, public navParams: NavParams, private _userService: UserServiceProvider, private modalCtrl: ModalController, private _auth:AuthentificationProvider) {  
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    this._auth.getToken().then(val=>{
      this._userService.getUser(val).subscribe((val) => {
        loading.dismiss();
        console.log(val);
        if(val["status"] == true ){
          val = val['data'];
          this.user.email = val['email'];
          this.user.name_u = val['prenom'];
          this.user.last_name = val['nom'];
          this.pic_url = "https://ui-avatars.com/api/?name=" + this.user.name_u + " " + this.user.last_name + "&rounded=true&size=128";
          if (val['communes'] != "Aucune commune")
          {
            let tmpc = val['communes'];
            tmpc.forEach(element => {
              this.user.commune.push({id:element.id,name:element.nom});
            });
          }
          else
          {
            this.user.commune = [];
          }
        }
        else{
          console.log("empty data");
          this.navCtrl.setRoot(HomePage);
        }
        
      }, err => {
        console.log(err);
        this.navCtrl.setRoot(HomePage);
      })
    })
    .catch(err=>{
      console.log(err);
      this.navCtrl.setRoot(HomePage);
    });
    
    // el promise moch kima el observable  
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }
  EditProfile(myEvent){
    let modal = this.modalCtrl.create(EditProfilePage,{user:this.user});
    modal.present({
      ev: myEvent
    });
  }
// tawa bech n3adiw el param lel modal
// narj3o l rabtan el api tawa 
}
