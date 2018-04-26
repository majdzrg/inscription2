import { Note } from 'ionic-angular/es2015';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Dialogs } from '@ionic-native/dialogs';
import { GouvernoratProvider } from '../../providers/gouvernorat/gouvernorat';
import { CommuneProvider } from '../../providers/commune/commune';

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
  gov_list: any; //              liste des gov
  commune_list: any; //
  gov = -1;
  commune;
  constructor(public navCtrl: NavController, public navParams: NavParams, private _dialog: Dialogs, private _govService: GouvernoratProvider, private _comService: CommuneProvider) {
    this.user = navParams.get('user');
    this.gov_list = [];
    this.commune_list = [];
    this._govService.getGovList()
      .subscribe(data => {
        if (data['status'] === true) {
          let tmp = data['data'];
          for (let index = 0; index < tmp.length; index++) {
            const element = tmp[index];
            this.gov_list.push({
              id: element.id,
              name: element.nom
            })
          }
        }
        else {
          console.log("no data here ");
        }
      }, err => {
        console.log(err);
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditProfilePage');
  }
  delete(i: number) {
    let new_array: Array<any>;
    new_array = this.user.commune;
    new_array.splice(i, 1);
    this.user.commune = new_array;
  }
  add_save_commune(commune) {
    if (this.user.commune.length < 3)
    {
      this.commune_list.forEach(element => {
        if(element.id == commune){
          this.user.commune.push(element);
        }
      });
    }
      
    else {
      console.log("only 3 commune are gven per user");
      this._dialog.alert('you are succesfully authentified', 'success', 'ok')
        .then(() => {
          console.log("done");
        })
        .catch(() => {
          console.log("dalogs not supported");
        })
    }


  }
  get_commune(obj) {
    this._comService.getCommuneList(obj)
      .subscribe(data => {
        if (data['status'] === true) {
          let tmp = data["data"];
          for (let index = 0; index < tmp.length; index++) {
            const element = tmp[index];
            this.commune_list = []
            this.commune_list.push({
              id: element.id,
              name: element.nom
            })
          }
        }
        else {
          console.log("no data");

        }
      }, err => {
        console.log(err);

      });
  }

}
// nterface jaw beh -> mba3ed rabten m3a les service 