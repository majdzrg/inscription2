import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController,ViewController } from 'ionic-angular';
import { SondageProvider } from '../../providers/sondage/sondage';


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
  private id_sondage ; 
  private id_commune ;
  private stat = true;
  private sondage = {
    id:1,
    title:'Journée Espaces verts',
    dscrp:'planification d\'un jour pour netoyer les espaces verts de centre urbain , avec la participation des ecoles , lycées etc ...',
    date:'2018/06/04',
    active:true, // if true show buttons else show results
    positive:'Participer', // positive button name
    negative:'Participe pas', // negative button name
    positiveStat:25, // total positive vote
    negativeStat:3, // total negative vote
    isVoted:false // if the user voted show result , else show button to vote if active
  }
  constructor(public viewCtrl: ViewController,public navCtrl: NavController, public navParams: NavParams, public toastCtrl: ToastController, private _sondageService:SondageProvider) {
    this.id_commune = this.navParams.get('communeId');
    this.id_sondage = this.navParams.get('sondageId');
    this.stat = this.navParams.get('stat');
    this.sondage.active = this.stat;
    this.getSondage()
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
  getSondage(){
    if(this.id_sondage != null && this.id_commune != null ){
      this._sondageService.getSondage(this.id_sondage,this.id_commune)
      .subscribe(data=>{
        if(data["status"]=== true){
          let tmp_sndg = data['data'];
          this.sondage.dscrp = tmp_sndg.description;
          this.sondage.id = tmp_sndg.id;
          this.sondage.positiveStat = Number.parseInt(tmp_sndg.pour);
          this.sondage.negativeStat = Number.parseInt(tmp_sndg.contre);
          this.sondage.date = tmp_sndg.fin.timestamp;
        }
        else{
          console.log("delted");
          this.viewCtrl.dismiss();
        }
      },err=>{
        console.log(err);
        this.viewCtrl.dismiss();
      })
    }
    else{
      console.log("maybe its parse prob");
      this.viewCtrl.dismiss();
    }
  }

}
