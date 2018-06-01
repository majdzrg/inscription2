import { MoreMenuPage } from '../more-menu/more-menu';
import { Component } from '@angular/core';
import { PopoverController, NavController, NavParams, ModalController,LoadingController } from 'ionic-angular';
import { SondageOpenPage } from "../sondage-open/sondage-open";
import { Dialogs } from '@ionic-native/dialogs';
import { AuthentificationProvider } from '../../providers/authentification/authentification';
import { SondageProvider } from '../../providers/sondage/sondage';
import { UserServiceProvider } from '../../providers/user-service/user-service';
import { ProfilePage } from '../profile/profile';
import { Storage } from '@ionic/storage';
import { ChosecommunePage } from '../chosecommune/chosecommune';
import { HomePage } from '../home/home';
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
  private isConnected: boolean = false;
  private sondage: string = "active"
  private sondageActive: Array<any> = [];
  private sondageArchive: Array<any> = [];
  private communesId: Array<number> = [];
  private mode="ON";
  constructor(public navCtrl: NavController, public navParams: NavParams, private popoverCtrl: PopoverController, public modalCtrl: ModalController, private dialogs: Dialogs, private _auth: AuthentificationProvider, private _sondageService: SondageProvider, private _userService: UserServiceProvider, private _storage: Storage,public loadingCtrl: LoadingController) {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    this.sondageActive = []
    this.sondageArchive = []

    // fill the communesId -> if connected get all his communes id else get default commune id else back to chose commune
    this._userService.getProfile().then((vali) => {
      loading.dismiss();
      //const val = JSON.parse(vali);
      console.log("we are here");
      
      if (vali != null && vali != undefined) {
        const val = JSON.parse(vali);
        // we have profile so get all communes if there is else send to profile
        if (val.commune.length === 0) {
          console.log("no commune for user");
          this.navCtrl.push(ProfilePage);
        }
        else {
          this.communesId = val.commune;
          this.getSondageListes();
        }
      }
      else {
        this.mode = "OFF"
        // we don't have profile so get the default id_Commune
        this._storage.get('id_commune').then((val) => {
          if (val != null && val.length > 0) {
            this.communesId.push(Number.parseInt(val));
            this.getSondageListes();
          }
          else {
            console.log("no default also");
            this.navCtrl.push(ChosecommunePage);
          }
        })
          .catch((err) => {
            console.log(err);
            this.navCtrl.push(ChosecommunePage);
          });
      }
    }).catch((err) => {
      // got err show msg and send back to home
      //console.log(err);
      this.navCtrl.setRoot(HomePage);
    });
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad SondagePage');
  }
  presentPopover(myEvent) {
    let popover = this.popoverCtrl.create(MoreMenuPage);
    popover.present({
      ev: myEvent
    });
  }
  openSondage(id,id_commune,stat) {
    if(this.mode == "OFF"){
      this.dialogs.alert("Only Connected user are able to access there");
      return false
    }
    let projModal = this.modalCtrl.create(SondageOpenPage, { sondageId: id, communeId: id_commune, stat: stat });
    projModal.present();
  }
  // get all sondages depand on his communes {connected or no }
  getSondageListes() {
    if (this.communesId.length > 0) {
      this.communesId.forEach(element => {
        let searchId = 0;
        if(this.mode === "OFF")
        {
          searchId = element;
        }
        else{
          searchId = element['id'];
        }
        console.log("get for commune -> " + element);
        this._sondageService.getSondageList(searchId+"").subscribe((data) => {
          console.log(data);
          if (data['status'] === true) {
            // here w go
            let idcom = element['id'];
            let tmp_arch = data['data'].arch;
            let tmp_nonarch = data['data'].nonarch;
            if (tmp_arch != null) {
              tmp_arch.forEach(element => {
                element.id_commune = idcom;
                this.sondageArchive.push(element);
              });
            }
            if (tmp_nonarch != null) {
              tmp_nonarch.forEach(element => {
                element.id_commune = idcom;
                this.sondageActive.push(element);
              });
            }
          }
          else {
            console.log(data['msg']);
          }
        }, (err) => {
          console.log(err);
        });
      });
    }
    else {
      console.log("failer no communes");
      this.navCtrl.push(HomePage);
    }
  }

}
