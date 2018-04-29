import { Component } from '@angular/core';
import {Camera, CameraOptions  } from '@ionic-native/camera';
import { Geolocation } from '@ionic-native/geolocation';


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
    image: string;

  constructor(private camera:Camera, private geolocation: Geolocation) {

  }
  async pictureFromCamera() {
    const options:CameraOptions = {
      quality:100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      saveToPhotoAlbum: true
    }
      //take a photo
     this.takePhoto(options);

 }

pictureFromGallery() {
  const options:CameraOptions = {
    quality:100,
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
   const result =  await this.camera.getPicture(options);

     //Append this to the dom
     this.image ='data:image/jpeg:base64, + ${result}';
   }
     catch (e) {
       console.error(e);
     }
  }
  const subscription = this.geolocation.watchPosition()
                              .filter((p) => p.coords !== undefined) //Filter Out Errors
                              .subscribe(position => {
  console.log(position.coords.longitude + ' ' + position.coords.latitude);
});

// To stop notifications
subscription.unsubscribe();
  this.geolocation.getCurrentPosition().then((resp) => {
   // resp.coords.latitude
   // resp.coords.longitude
  }).catch((error) => {
    console.log('Error getting location', error);
  });

  let watch = this.geolocation.watchPosition();
  watch.subscribe((data) => {
   // data can be a set of coordinates, or an error (if an error occurred).
   // data.coords.latitude
   // data.coords.longitude
  });
 // show up the top menu


  ionViewDidLoad() {
    console.log('ionViewDidLoad ReclamationPage');
  }

}
