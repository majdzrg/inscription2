import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { QuestionProvider } from '../../providers/question/question';
import { Dialogs } from '@ionic-native/dialogs';
import { HomePage } from '../home/home';

/**
 * Generated class for the QuestionInfoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-question-info',
  templateUrl: 'question-info.html',
})
export class QuestionInfoPage {
  question= {
    id:0,
    question:"chargement ....",
    createdat:"chargement ....",
    reponse:'chargement ....'
  };
  token;
  constructor(private _dialog:Dialogs,public viewCtrl:ViewController,private _questioService:QuestionProvider,public navCtrl: NavController, public navParams: NavParams) {
    let id = this.navParams.get("idquestion");
    let token = this.navParams.get("token");
    this.token = token ;
    if(id != null){
      // work goes here 
      this._questioService.getQuestionInfo(id,token).subscribe(data=>{
        console.log(data);
        if(data["status"]===true){
          this.question = data["data"];
        }
        else{
          this._dialog.alert(data['msg'], "error", "ok");
          this.viewCtrl.dismiss()
        }
      },err=>{
        this._dialog.alert("we cant connect the server , try later","error to connect","try later");
        this.viewCtrl.dismiss()
      })
    }
    else{
      this._dialog.alert("Unexpected bug please close the app and try again", "error", "try later");      
      this.viewCtrl.dismiss();
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad QuestionInfoPage');
  }
  deleteQuest(id){
    this._questioService.Delete_Question(this.token,id)
    .subscribe(data=>{
      if(data["status"]===true){
        this._dialog.alert("your question completly deleted ", "Done", "ok");
        this.navCtrl.setRoot(HomePage);
      }
      else{
        this._dialog.alert(data["msg"], "error", "ok");        
      }
    },err=>{
      this._dialog.alert("we cant connect the server","connexion error","try later");
    })
  }

}
