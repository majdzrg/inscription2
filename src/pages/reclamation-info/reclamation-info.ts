import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Dialogs } from '@ionic-native/dialogs';
import { ReclamationProvider } from '../../providers/reclamation/reclamation';
import { HomePage } from '../home/home';
import { DomSanitizer } from '@angular/platform-browser';

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
    id: "chargement",
    contenu: "chargement",
    image: null,
    createdat: "chargement",
  }
  token;
  constructor(protected sanitizer: DomSanitizer,public viewCtrl:ViewController,private _reclamatioService:ReclamationProvider,private _dialog:Dialogs,public navCtrl: NavController, public navParams: NavParams) {
    let id = this.navParams.get("id");
    let token = this.navParams.get("token");
    this.token = token;
    if (id != null) {
      // work goes here 
      this._reclamatioService.getReclamationInfo(id,token).subscribe(data => {
        console.log(data);
        if (data["status"] === true) {
          this.reclamation = data["data"];
          this.reclamation.image = this.sanitizer.bypassSecurityTrustResourceUrl("data:image/jpeg;base64,"+this.reclamation.image);
          console.log(this.reclamation);  
        }
        else {
          this._dialog.alert(data['msg'], "error", "ok");
          this.viewCtrl.dismiss()
        }
      }, err => {
        this._dialog.alert("we cant connect the server , try later", "error to connect", "try later");
        this.viewCtrl.dismiss()
      })
    }
    else {
      this._dialog.alert("Unexpected bug please close the app and try again", "error", "try later");
      this.viewCtrl.dismiss();
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReclamationInfoPage');
  }
  deletRec(id){
    this._reclamatioService.Delete_Reclamation(id,this.token)
      .subscribe(data => {
        if (data["status"] === true) {
          this._dialog.alert("your Reclamation completly deleted ", "Done", "ok");
          this.navCtrl.setRoot(HomePage);
        }
        else {
          this._dialog.alert(data["msg"], "error", "ok");
        }
      }, err => {
        this._dialog.alert("we cant connect the server", "connexion error", "try later");
      })
  }

}
