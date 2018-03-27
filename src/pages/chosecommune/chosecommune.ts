import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ListeprojectPage} from '../listeproject/listeproject';
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
  gov_list: any; // hetha fih liste des gov
  commune_list: any; //
  user_gov = 0;
  user_commune = 0;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.gov_list =
      [
        {
          id: 1,
          name: 'Ariana'
        },
        {
          id: 2,
          name: 'Béja'
        },
        {
          id: 3,
          name: '	Ben Arous'
        },
        {
          id: 4,
          name: 'Bizerte'
        },
        {
          id: 5,
          name: 'Gabès'
        },
        {
          id: 6,
          name: '	Gafsa'
        },
        {
          id: 7,
          name: 'Jendouba'
        },
        {
          id: 8,
          name: 'Kairouan'
        },
        {
          id: 9,
          name: 'Kasserine'
        },
        {
          id: 10,
          name: '	Kébili'
        },
        {
          id: 11,
          name: 'Le Kef'
        },
        {
          id: 12,
          name: 'Mahdia'
        },
        {
          id: 13,
          name: 'La Manouba'
        },
        {
          id: 14,
          name: 'Médenine'
        },
        {
          id: 15,
          name: 'Monastir'
        },
        {
          id: 16,
          name: 'Nabeul'
        },
        {
          id: 17,
          name: 'Sfax'
        },
        {
          id: 18,
          name: 'Sidi Bouzid'
        },
        {
          id: 19,
          name: 'Siliana'
        },
        {
          id: 20,
          name: '	Sousse'
        },
        {
          id: 21,
          name: 'Tataouine'
        },
        {
          id: 22,
          name: 'Tozeur'
        },
        {
          id: 23,
          name: 'Tunis'
        },
        {
          id: 24,
          name: 'Zaghouan'
        },
      ]
    this.commune_list =
      [{
          id: 1,
          name: 'bardo'
        }]
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ChosecommunePage');
  }
  goLink(){
    this.navCtrl.push(ListeprojectPage)
  }
}
