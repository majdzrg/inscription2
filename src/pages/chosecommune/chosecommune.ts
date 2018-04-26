import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ListeprojectPage } from '../listeproject/listeproject';
import { SondagePage } from '../sondage/sondage';
import { UserServiceProvider } from '../../providers/user-service/user-service';
import { GouvernoratProvider } from '../../providers/gouvernorat/gouvernorat';
import { HomePage } from '../home/home';
import { CommuneProvider } from '../../providers/commune/commune';

/**
 * Generated class for the ChosecommunePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
// @IonicPage({
//   name: 'chosecommune-page',
//   segment: 'chosecommune'
// })
@Component({
  selector: 'page-chosecommune',
  templateUrl: 'chosecommune.html',
})
export class ChosecommunePage {
  gov_list: any; //              liste des gov
  commune_list: any; //
  user_gov = 0;
  user_commune = 0;
  constructor(public navCtrl: NavController, public navParams: NavParams, private _userService: UserServiceProvider, private _govService: GouvernoratProvider, private _comService: CommuneProvider) {
    this.gov_list = [];
    this.commune_list =[];
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
  get_commune(obj) {
    this._comService.getCommuneList(obj)
      .subscribe(data => {
        if (data['status'] === true) {
          let tmp = data["data"];
          for (let index = 0; index < tmp.length; index++) {
            const element = tmp[index];
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
  ionViewDidLoad() {
    console.log('ionViewDidLoad ChosecommunePage');
  }
  goListProject() {
    this.navCtrl.push(ListeprojectPage)
  }
  goSondage() {
    this.navCtrl.push(SondagePage)
  }
  saveCommune() {
    this._userService.setCommune(this.user_commune.toString());
    // else pop
    this.navCtrl.setRoot(HomePage);
  }
}
