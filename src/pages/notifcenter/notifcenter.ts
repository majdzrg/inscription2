import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NotifProvider } from '../../providers/notif/notif';
import { Dialogs } from '@ionic-native/dialogs';

/**
 * Generated class for the NotifcenterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-notifcenter',
  templateUrl: 'notifcenter.html',
})
export class NotifcenterPage {
  all_notif = [];
  constructor(public navCtrl: NavController, public navParams: NavParams, public _dialog: Dialogs, private _notif: NotifProvider) {
    this.all_notif = this.navParams.get('notif');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NotifcenterPage');
  }
  vueNotif(index: number) {
    const id = this.all_notif[index].id;
    this._notif.vueNotif(id)
      .subscribe(data => {
        if (data['status'] === true) {
          this.all_notif.splice(index, 1);
        }
      },
        err => {
          console.log(err);
          this._dialog.alert("Problem to connect the server", "error");
        })
  }
  vueAll() {
    this._notif.vueAll()
      .subscribe(data => {
        if (data['status'] === true) {
          this.all_notif = [];
        }
      },
        err => {
          console.log(err);
          this._dialog.alert("Problem to connect the server", "error");
        })
  }

}
