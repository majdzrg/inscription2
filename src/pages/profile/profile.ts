import {HomePage} from '../home/home';
import {UserServiceProvider} from '../../providers/user-service/user-service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController, ModalController } from 'ionic-angular';
import { EditProfilePage } from "../edit-profile/edit-profile";
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
    name_u:'Majd',
    last_name:'Zrigui',
    username:'@ZriguiMajd',
    email:'Majd@email.com',
    commune:['Bardo','Zahrouni'],
  };
  pic_url ;
  constructor(public navCtrl: NavController, public navParams: NavParams, private _userService: UserServiceProvider, private modalCtrl: ModalController) {
    // fel construct njibo les info mel service 
    // this._userService.getUser().then((val)=>{
    //   if(val != null){
    //     console.log("we got dat");
    //     this.u = val ;
    //     // bind the data to user 
    //     /*this.user.name_u = val['name'];
    //     this.user.last_name = val['last_name'];
    //     this.user.email = val['email'];
    //     this.user.username = val['username'];
    //     this.user.commune = val['commune'];*/
    //   }
    //   else{
    //     // error not hundlaed -> error mahoch metwa9a3 
    //     console.log("nuuulll");     
    //   }
    // },(err)=>{
    //   // error metwa9a3
    //   console.log(err);
    //   this.navCtrl.setRoot(HomePage); //-> nraj3oh lel home
    // });
    this.pic_url = "https://ui-avatars.com/api/?name=" + this.user.name_u + " " + this.user.last_name +"&rounded=true&size=128";
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
}
