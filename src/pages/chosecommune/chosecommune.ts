import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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
  commune_list: any; // w hetha wa9et eli ya5tar el gov t3abih bel les commune mte3ha el kol
  user_gov = 0 ;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    // hetha taw 3abineha haka mais mba3ed twali ta3mel apl l service bech y3abih
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

  }
  // kamel 3abih emchi w ki tkamel 9oli
  ionViewDidLoad() {
    console.log('ionViewDidLoad ChosecommunePage');
  }

}
