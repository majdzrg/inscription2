import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Dialogs } from '@ionic-native/dialogs';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Geolocation } from '@ionic-native/geolocation';
import { UserServiceProvider } from '../../providers/user-service/user-service';
import { HomePage } from '../home/home';
import { ReclamationProvider } from '../../providers/reclamation/reclamation';

/**
 * Generated class for the ReclamationFormPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-reclamation-form',
  templateUrl: 'reclamation-form.html',
})
export class ReclamationFormPage {
  reclamation = {
    sujet: "",
    contenu: "",
    image: '',
    date: Date.now(),
    lat:'',
    long:'',
    commune:0,
  }
  commune_list;
  options: CameraOptions = {
    quality: 100,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
    mediaType: this.camera.MediaType.PICTURE,
    correctOrientation: true,
    saveToPhotoAlbum: true
  }
  Geooptions = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0
};
  constructor(public navCtrl: NavController, public navParams: NavParams, private _dialog: Dialogs, private camera: Camera, private geolocation: Geolocation, private _userService:UserServiceProvider, private _reclamatioService: ReclamationProvider ) {
    this.geolocation.getCurrentPosition(this.Geooptions).then((resp) => {
      this.reclamation.lat =   resp.coords.latitude.toString()
      this.reclamation.long =  resp.coords.longitude.toString()
    }).catch((error) => {
      console.log('Error getting location', JSON.stringify(error));
    });
    let watch = this.geolocation.watchPosition();
    watch.subscribe((data) => {
      // data can be a set of coordinates, or an error (if an error occurred).
      // data.coords.latitude
      // data.coords.longitude
      this.reclamation.lat = data.coords.latitude.toString()
      this.reclamation.long = data.coords.longitude.toString()
    });
    this._userService.getProfile().then((val)=>{
      let parsed = JSON.parse(val);
      this.commune_list = parsed.commune;
    })
    .catch((err)=>{
      console.log(err);
      this.navCtrl.setRoot(HomePage)
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReclamationFormPage');
  }
  sendRec() {
    if (this.reclamation.contenu.length > 50 && this.reclamation.sujet.length > 20 && this.reclamation.image.length > 0 && this.reclamation.commune != 0) {
      // send to api
      this._reclamatioService.sendReclamation(this.reclamation).subscribe((data_back)=>{
        console.log(data_back);
        if (data_back['status']=== true) {
          // show done 
          console.log("it's added");
          
        } else {
          console.log("some thing happen");
        }
      },err=>{
        console.log(err);
        // show error
      })
    } else {
      this._dialog.alert('there is a missing required field check again please', 'missing argument', 'try again')
        .then((val) => {
          console.log(val);
        })
        .catch((err) => {
          console.log(err);
        })
    }
  }
  async takePic() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      saveToPhotoAlbum: true
    }
    try {
      //take photo and store result in result
      const result = await this.camera.getPicture(options);

      //Append this to the dom
      this.reclamation.image = 'data:image/jpeg:base64, + ${result}';
    }
    catch (e) {
      console.error(e);
    }
  }
  async pickPic() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
    }
    try {
      //take photo and store result in result
      const result = await this.camera.getPicture(options);
      //Append this to the dom
      this.reclamation.image = 'data:image/jpeg:base64, + ${result}';
    }
    catch (e) {
      console.error(e);
    }
  }
}
