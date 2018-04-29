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
  project_info = {
    id: 1,
    title: 'some project from the community',
    dscrp: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut.',
    date: "November 12 , 2018",
    img: 'https://picsum.photos/600/400?random',
    date_post: '28/03/2018'
  }
  project_recation = [{
    reaction_id: 1,
    user_id: 1,
    comment: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    reaction: '1',
    date: '2018/12/12'
  },
  {
    reaction_id: 2,
    user_id: 15,
    comment: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    reaction: '0',
    date: '2018/12/12'
  },
  {
    reaction_id: 3,
    user_id: 5,
    comment: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    reaction: '',
    date: '2018/12/12'
  },
  {
    reaction_id: 4,
    user_id: 40,
    comment: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    reaction: '1',
    date: '2018/12/12'
  }
  ]
  projId: string;
  communeId: string;
  token: string;
  constructor(public viewCtrl: ViewController, public navCtrl: NavController, public navParams: NavParams, private dialogs: Dialogs, private _projectService: ProjectsProvider, private _auth: AuthentificationProvider) {
    this._auth.getToken().then((val) => {
      if (val.length > 0) {
        this.token = val;
      }
      else {
        this.navCtrl.setRoot(HomePage);
      }
    }).catch((err) => {
      this.navCtrl.setRoot(HomePage);
    });
    this.projId = navParams.get("projId");
    this.communeId = navParams.get('communeId');
    this.getCommentList();


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProjectPage');
  }
  showComment() {
    this.dialogs.prompt("svp donne votre commentaire", 'commnet', ["send", 'cancel'], 'comment_text')
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
  onPrompt(results) {
    console.log("You selected button number " + results.buttonIndex + " and entered " + results.input1);
  }
  getCommentList() {
    this._projectService.ProjectCommentaire(this.communeId, this.projId).subscribe((data) => {
      console.log(data);

    }, err => {
      console.log(err);

    });
  }
}
