import { Component } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Geolocation } from '@ionic-native/geolocation';
import { ModalController, NavController } from 'ionic-angular';
import { ReclamationInfoPage } from "../reclamation-info/reclamation-info";
import { ReclamationFormPage } from "../reclamation-form/reclamation-form";
import { ReclamationProvider } from '../../providers/reclamation/reclamation';
import { Dialogs } from '@ionic-native/dialogs';
import { HomePage } from '../home/home';
import { AuthentificationProvider } from '../../providers/authentification/authentification';
import { LoginPage } from '../login/login';

/**
 * Generated class for the ReclamationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-reclamation',
  templateUrl: 'reclamation.html',
})
export class ReclamationPage {
  image;
  token;
  reclamation_list: Array<any> = [];
  constructor(private camera: Camera, private geolocation: Geolocation, public modalCtrl: ModalController, private _reclamationService: ReclamationProvider, private _dialog: Dialogs, public navCtrl: NavController, private _auth:AuthentificationProvider) {
    this._auth.getToken().then((token)=>{
      if (token != null && token.length > 0 && token != undefined) {
        this.token = token;
        this._reclamationService.getReclamationList(token)
        .subscribe((data) => {
          console.log(data); // for test only
          if (data['status'] === true) {
            if (data['data'].length > 0){
              this.reclamation_list = data['data'];
            }
          }
          else {
            // si pas des rec
            this._dialog.alert('some thing went wrong' + data['msg'], 'error', 'oki').then((v) => {
              console.log(v);
            }).catch((e) => {
              console.log(e);
            })
            this.navCtrl.setRoot(HomePage);
          }
        },
          (err) => {
            this._dialog.alert('some thing went wrong', 'error', 'oki').then((v) => {
              console.log(v);
            }).catch((e) => {
              console.log(e);
            })
            this.navCtrl.setRoot(HomePage);
          });
      } else {
        // no token : not connected
        this.navCtrl.setRoot(LoginPage);
      }
    })
    .catch((err)=>{
      console.log(err);
      this.navCtrl.setRoot(HomePage)
    })

  }
  async pictureFromCamera() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      saveToPhotoAlbum: true
    }
    //take a photo
    this.takePhoto(options);
  }

  pictureFromGallery() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      saveToPhotoAlbum: true
    }
    this.takePhoto(options);
  }
  async takePhoto(options: CameraOptions) {
    try {
      //take photo and store result in result
      const result = await this.camera.getPicture(options);

      //Append this to the dom
      this.image = 'data:image/jpeg:base64, + ${result}';
    }
    catch (e) {
      console.error(e);
    }
  }
  // show up the top menu
  ionViewDidLoad() {
    console.log('ionViewDidLoad ReclamationPage');
  }
  addnew() {
    let modal = this.modalCtrl.create(ReclamationFormPage);
    modal.present();
  }
  showRec(id) {
    let modal = this.modalCtrl.create(ReclamationInfoPage,{'id':id,'token':this.token});
    modal.present();
  }

}
