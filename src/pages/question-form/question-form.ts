import { Component } from '@angular/core';
import { Dialogs } from '@ionic-native/dialogs';
import { UserServiceProvider } from '../../providers/user-service/user-service';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { QuestionProvider } from '../../providers/question/question';
import { HomePage } from '../home/home';
import { AuthentificationProvider } from '../../providers/authentification/authentification';


/**
 * Generated class for the QuestionFormPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-question-form',
  templateUrl: 'question-form.html',
})
export class QuestionFormPage {
  question = {
    contenu: "",
    date: Date.now(),
    commune: 0,
  }
  commune_list;
  token;
  constructor(public viewCtrl:ViewController , private _auth: AuthentificationProvider, public navCtrl: NavController, public navParams: NavParams, private _dialog: Dialogs, private _userService: UserServiceProvider, private _questionService: QuestionProvider) {
    this._userService.getProfile().then((val) => {
      let parsed = JSON.parse(val);
      this.commune_list = parsed.commune;
    })
      .catch((err) => {
        console.log(err);
        this.navCtrl.setRoot(HomePage)
      })
    this._auth.getToken().then((val) => {
      if (val != null && val != undefined && val.length > 0) {
        this.token = val;
      } else {
        this.navCtrl.setRoot(HomePage);
      }
    })
      .catch(err => {
        console.log(err);
        this.navCtrl.setRoot(HomePage);
      })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad QuestionFormPage');
  }

  sendQes() {
    if (this.question.contenu.length > 20 && this.question.commune != 0) {
      // send to api
      this._questionService.sendQuestion(this.question, this.token).subscribe((data_back) => {
        console.log(data_back);
        if (data_back['status'] === true) {
          // show done
          console.log("it's added");
this._dialog.alert("Question bien Ajoouté .","Success","ok")
this.navCtrl.push(HomePage);
        } else {
          console.log("some thing happen");
    this._dialog.alert(data_back["msg"],"error","try again");
        }
      }, err => {
        console.log(err);
        // show error
        this._dialog.alert("We cant reach our server , check your internet connexion","Server not visible","try later")
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

}
