import { Note } from 'ionic-angular/es2015';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Dialogs } from '@ionic-native/dialogs';

/**
 * Generated class for the EditProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-profile',
  templateUrl: 'edit-profile.html',
})
export class EditProfilePage {
user;
  constructor(public navCtrl: NavController, public navParams: NavParams, private _dialog: Dialogs) {
    this.user = navParams.get('user');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditProfilePage');
  }
  delete(i:number){
    let new_array:Array<any>;
    new_array  = this.user.commune;
    new_array.splice(i,1);
    this.user.commune = new_array;
  }
  add_save_commune(id_commune:number){
    if(this.user.commune.length < 3)
      this.user.commune.push(id_commune);
    console.log("only 3 commune are gven per user");
    this._dialog.alert('you are succesfully authentified', 'success', 'ok')
    .then(()=>{
      console.log("done");
    })
    .catch(()=>{
      console.log("dalogs not supported");
    })
    
  }

}
// nterface jaw beh -> mba3ed rabten m3a les service 