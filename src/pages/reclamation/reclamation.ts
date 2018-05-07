import { Component } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Geolocation } from '@ionic-native/geolocation';
import { ModalController } from 'ionic-angular';
import { ReclamationInfoPage } from "../reclamation-info/reclamation-info";
import { ReclamationFormPage } from "../reclamation-form/reclamation-form";

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

  constructor(private camera: Camera, private geolocation: Geolocation, public modalCtrl: ModalController) {

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
  addnew(){
    let modal = this.modalCtrl.create(ReclamationFormPage);
    modal.present();
  }
  showRec(id){
    let modal = this.modalCtrl.create(ReclamationInfoPage);
    modal.present();
  }

}
