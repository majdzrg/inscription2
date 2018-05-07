import { Component } from '@angular/core';
import { Dialogs } from '@ionic-native/dialogs';
import { UserServiceProvider } from '../../providers/user-service/user-service';
import { NavController, NavParams } from 'ionic-angular';
import { QuestionProvider } from '../../providers/question/question';


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
  question ={
    sujet: "",
    contenu: "",
    date: Date.now(),
    commune:0,
  }

  constructor(public navCtrl: NavController, public navParams: NavParams,private _dialog: Dialogs, private _userService:UserServiceProvider, private _questionService: QuestionProvider ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad QuestionFormPage');
  }

  sendQes() {
    if (this.question.contenu.length > 20 && this.question.sujet.length > 20 && this.question.commune != 0) {
      // send to api
      this._questionService.sendQuestion(this.question).subscribe((data_back)=>{
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

}
