import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ReclamationInfoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-reclamation-info',
  templateUrl: 'reclamation-info.html',
})
export class ReclamationInfoPage {
  reclamation = {
    sujet: "",
    contenu: "",
    image: '',
    date: "",
  }
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReclamationInfoPage');
  }

}
