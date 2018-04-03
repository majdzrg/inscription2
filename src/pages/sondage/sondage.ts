import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { MoreMenuPage } from '../more-menu/more-menu';

/**
 * Generated class for the SondagePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-sondage',
  templateUrl: 'sondage.html',
})
export class SondagePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }
  presentPopover(myEvent) {
    let popover = this.popoverCtrl.create(MoreMenuPage);
    popover.present({
      ev: myEvent
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SondagePage');
  }

}
