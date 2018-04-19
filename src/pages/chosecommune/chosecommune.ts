import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ListeprojectPage } from '../listeproject/listeproject';
import { SondagePage } from '../sondage/sondage';
import { UserServiceProvider } from '../../providers/user-service/user-service';
<<<<<<< HEAD
import { GouvernoratProvider } from '../../providers/gouvernorat/gouvernorat';
=======
import { HomePage } from '../home/home';
>>>>>>> 48c0ac3d3bddbead231fce8010b3c40a8e23f670
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
  constructor(public navCtrl: NavController, public navParams: NavParams, private _userService: UserServiceProvider, private _govService:GouvernoratProvider) {
    this.gov_list =
      [
        // {
        //   id: 1,
        //   name: 'Ariana'
        // },
        // {
        //   id: 2,
        //   name: 'Béja'
        // },
        // {
        //   id: 3,
        //   name: '	Ben Arous'
        // },
        // {
        //   id: 4,
        //   name: 'Bizerte'
        // },
        // {
        //   id: 5,
        //   name: 'Gabès'
        // },
        // {
        //   id: 6,
        //   name: '	Gafsa'
        // },
        // {
        //   id: 7,
        //   name: 'Jendouba'
        // },
        // {
        //   id: 8,
        //   name: 'Kairouan'
        // },
        // {
        //   id: 9,
        //   name: 'Kasserine'
        // },
        // {
        //   id: 10,
        //   name: '	Kébili'
        // },
        // {
        //   id: 11,
        //   name: 'Le Kef'
        // },
        // {
        //   id: 12,
        //   name: 'Mahdia'
        // },
        // {
        //   id: 13,
        //   name: 'La Manouba'
        // },
        // {
        //   id: 14,
        //   name: 'Médenine'
        // },
        // {
        //   id: 15,
        //   name: 'Monastir'
        // },
        // {
        //   id: 16,
        //   name: 'Nabeul'
        // },
        // {
        //   id: 17,
        //   name: 'Sfax'
        // },
        // {
        //   id: 18,
        //   name: 'Sidi Bouzid'
        // },
        // {
        //   id: 19,
        //   name: 'Siliana'
        // },
        // {
        //   id: 20,
        //   name: '	Sousse'
        // },
        // {
        //   id: 21,
        //   name: 'Tataouine'
        // },
        // {
        //   id: 22,
        //   name: 'Tozeur'
        // },
        // {
        //   id: 23,
        //   name: 'Tunis'
        // },
        // {
        //   id: 24,
        //   name: 'Zaghouan'
        // },
      ]
    this.commune_list =
      [{
<<<<<<< HEAD
        id: 1,
        name: 'bardo'
      }];
      this._govService.getGovList()
      .subscribe(data=>{
        if (data['status'] === true){
          let tmp = data['data'];
          for (let index = 0; index < tmp.length; index++) {
            const element = tmp[index];
            this.gov_list.push({
              id: element.id,
              name: element.nom
            })
          }
        }
        else{
          console.log("no data here ");
        }
      },err=>{
        console.log(err);
      });
=======
          id: 1,
          name: 'bardo'

        },
        {
            id: 3,
            name: 'dandan'

          },

      ]
>>>>>>> 48c0ac3d3bddbead231fce8010b3c40a8e23f670

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
