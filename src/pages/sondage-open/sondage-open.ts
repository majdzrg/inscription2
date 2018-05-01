import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController,ViewController } from 'ionic-angular';


/**
 * Generated class for the SondageOpenPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-sondage-open',
  templateUrl: 'sondage-open.html',
})
export class SondageOpenPage {
  private vote = '' ;
  private sondage = {
    id:1,
    title:'Journée Espaces verts',
    dscrp:'planification d\'un jour pour netoyer les espaces verts de centre urbain , avec la participation des ecoles , lycées etc ...',
    start_date:'2018/06/04',
    active:true, // if true show buttons else show results
    positive:'Participer', // positive button name
    negative:'Participe pas', // negative button name
    positiveStat:25, // total positive vote
    negativeStat:3, // total negative vote
    isVoted:false // if the user voted show result , else show button to vote if active
  }
  constructor(public viewCtrl: ViewController,public navCtrl: NavController, public navParams: NavParams, public toastCtrl: ToastController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SondageOpenPage');
  }
  applyVote(){
    if (this.vote == null ||this.vote.length == 0) {
      let toast = this.toastCtrl.create({
        message: 'Select one choice from the option below',
        duration: 3000
      });
      toast.present();
    } else {
      // send vote
      // change is voted to true
      // call the api again to get recent result
      this.sondage.isVoted = true;
    }
  }

}
