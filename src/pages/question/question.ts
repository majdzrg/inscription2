import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { ModalController } from 'ionic-angular';
import {QuestionFormPage} from "../question-form/question-form";
import { QuestionProvider } from '../../providers/question/question';
import { AuthentificationProvider } from '../../providers/authentification/authentification';
import { HomePage } from '../home/home';
import { Dialogs } from '@ionic-native/dialogs';
import { QuestionInfoPage } from '../question-info/question-info';

/**
 * Generated class for the QuestionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-question',
  templateUrl: 'question.html',
})
export class QuestionPage {
  question_list ;
  token_tmp;
  constructor(public _dialog : Dialogs,public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController , public viewCtrl:ViewController, private _questionService:QuestionProvider, private _auth:AuthentificationProvider) {
    this._auth.getToken().then((val)=>{
      if(val != null && val != undefined && val.length > 0){
        this.token_tmp = val;
        this._questionService.getQuestionList(val)
        .subscribe((data)=>{
          console.log(data);
          if(data["status"] === true){
            this.question_list = data["data"];
          }
          else{
            this.navCtrl.setRoot(HomePage);
          }
        },err=>{
          this._dialog.alert("we cant reach server","connexion error");
          this.navCtrl.setRoot(HomePage);
        })
      }
    })
    .catch((e)=>{
      console.log(e);
      this.navCtrl.setRoot(HomePage);
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad QuestionPage');
  }
  addnewQ(){
    let modal = this.modalCtrl.create(QuestionFormPage);
    modal.present();
  }
  showQes(idquestion:string){
    let modal = this.modalCtrl.create(QuestionInfoPage,{"idquestion":idquestion,"token":this.token_tmp});
    modal.present();
  }
}
