import { DomSanitizer } from '@angular/platform-browser';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Dialogs } from '@ionic-native/dialogs';
import { ProjectsProvider } from '../../providers/projects/projects';
import { AuthentificationProvider } from '../../providers/authentification/authentification';
import { HomePage } from '../home/home';

/**
 * Generated class for the ProjectPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-project',
  templateUrl: 'project.html',
})
export class ProjectPage {
  project_info;
  project_recation = []
  projId: string;
  communeId: string;
  token: string;
  projet;
  constructor(protected sanitizer:DomSanitizer,public viewCtrl: ViewController, public navCtrl: NavController, public navParams: NavParams, private dialogs: Dialogs, private _projectService: ProjectsProvider, private _auth: AuthentificationProvider) {
    this._auth.getToken().then((val) => {
      if (val.length > 0) {
        this.token = val;
      }
      // else {
      //   this.navCtrl.setRoot(HomePage);
      // }
    }).catch((err) => {
      console.log("cant get token we are in guest mode and disable all feautre");
      
      // this.navCtrl.setRoot(HomePage);
    });
    this.projId = navParams.get("projId");
    this.communeId = navParams.get('communeId');
    this.projet = navParams.get("projData");
    this.project_info = this.projet;
    this.project_info.img = this.project_info.img;
    this.getCommentList();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProjectPage');
  }
  showComment() {
    this.dialogs.prompt("svp donne votre commentaire", 'commnet', ["send", 'cancel'], '')
      .then((res) => {
        if (res.buttonIndex == 1) {
          let comm_user = res.input1;
          if (comm_user.length > 0) {
            this._projectService.commentProject(this.token, this.projId, this.communeId, comm_user).subscribe((data) => {
              if (data["status"] === true) {
                this.dialogs.alert("Your comment have been sended", "message seended", "ok").then(() => {
                  console.log("ok");
                })
                  .catch((er) => {
                    console.log(er);
                  })
                  this.project_info.comments++;
              }
              else {

                this.dialogs.alert(data['msg'], "message not seended", "ok").then(() => {
                  console.log("ok");
                })
                  .catch((er) => {
                    console.log(er);
                  })
              }
            }, err => {
              console.log(err);
              this.dialogs.alert("We canr reach the server right now try later", "message not seended", "ok").then(() => {
                console.log("ok");
              })
                .catch((er) => {
                  console.log(er);
                })
            });
          }
          else {
            this.dialogs.alert("comment cant be empty", "error", "ok").then((result) => {
              console.log(result);
            }).catch((err) => {
              console.log(err);
            });
          }
        }
      })
      .catch(e => console.log('Error displaying dialog', e));
  }
  /*  showVote(){
      this.dialogs.prompt("svp voter")
      .then((res) => {
        if (res.buttonIndex == 1) {
          let comm_user = res.input2;
          else {
            this.dialogs.alert("vote cant be empty", "error", "ok").then((result) => {
              console.log(result);
            }).catch((err) => {
              console.log(err);
            });
          }
    } */
    vote(){
      if (this.token===undefined||this.token===null||this.token.length===0) {
        return false
      }
      this._projectService.voteProject(this.token,this.projId,this.communeId).subscribe((data)=>{
        if(data['status']=== true){
          this.dialogs.alert("Your like is registred","Done like","Done").then((val)=>{
            console.log("done");
          })
          .catch((err)=>{
            console.log(err);
          })
          // inc
          this.project_info.likes++;
        }
        else{
          console.log(data);
          this.dialogs.alert(data['msg'],"Fail to like","try later").then((val)=>{
            console.log("done");
          })
          .catch((err)=>{
            console.log(err);
          })
        }
      },(err)=>{
        console.log(err);
        this.dialogs.alert("we cant reach our server"+JSON.stringify(err),"fail to like","try later").then((val)=>{
          console.log("done");
        })
        .catch((err)=>{
          console.log(err);
        })
      });
    }
  onPrompt(results) {
    console.log("You selected button number " + results.buttonIndex + " and entered " + results.input1);
  }
  getCommentList() {
    this._projectService.ProjectCommentaire(this.communeId, this.projId,this.token).subscribe((data) => {
      console.log(data);
      if(data["status"] === true){
        this.project_recation = data['data'];
      }
    }, err => {
      console.log(err);
    });
  }
  getVoteList() {
    this._projectService.ProjectVote(this.communeId, this.projId).subscribe((data) => {
      console.log(data);

    }, err => {
      console.log(err);

    });
  }
}
