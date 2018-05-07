import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ProjectPage } from '../project/project';
import { ModalController } from 'ionic-angular';
import { UserServiceProvider } from '../../providers/user-service/user-service';
import { ProjectsProvider } from '../../providers/projects/projects';
import { ChosecommunePage } from '../chosecommune/chosecommune';
import { Storage } from '@ionic/storage';
import { AuthentificationProvider } from '../../providers/authentification/authentification';
import { ProfilePage } from '../profile/profile';

/**
 * Generated class for the ListeprojectPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-listeproject',
  templateUrl: 'listeproject.html',
})
export class ListeprojectPage {
  private isConnected: boolean = false;
  project_list :Array<any>=[];
  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController, private _userService: UserServiceProvider, private _storage: Storage, private _projectService: ProjectsProvider, private _auth: AuthentificationProvider) {
    this._auth.isAuthenticated();
    //this.getprojectsList();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListeprojectPage');
  }
  openProj(proj_id,commune_id,proj) {
    let projModal = this.modalCtrl.create(ProjectPage, { projId: proj_id,communeId:commune_id,projData:proj});
    projModal.present();
  }

  ionViewWillEnter() {
    this._userService.getProfile().then((vali) => {
      console.log(vali);
      let val = JSON.parse(vali);
      console.log("next is val");
      console.log(val);
      if (val != null  && val.commune.length != 0) {
        console.log("it's ok we have user with things");
      }
      else if(val != null && val['commune'].length === 0){
        this.navCtrl.push(ProfilePage);
      }
      else if(val === null) {
        console.log("not ok dude");
        this._storage.get('id_commune').then((val) => {
          console.log(val);
          if (val == null) {
            this.navCtrl.push(ChosecommunePage);
          }
        }, (err) => {
          this.navCtrl.push(ChosecommunePage);
        });
      }
    }).catch((err) => {
      console.log(err);
      this.navCtrl.push(ChosecommunePage);
    });
  }
  getprojectsList() {
    if (this.isConnected === true) {
      //
      // get all commune if user connected
      let communes_id = [];
      this._userService.getProfile().then((val) => {
        if (val.length > 0 && val != "Aucune commune") {
          console.log("ahla frais");
          let profile_in_memo = JSON.parse(val);
          console.log(profile_in_memo);
          profile_in_memo.commune.forEach(element => {
            communes_id.push(element.id);
            this.addInList(element.id);
          });
          console.log(communes_id);
        }
        else {
          // no communes
          this.navCtrl.push(ProfilePage);
        }
      })
        .catch((err) => {
          console.log(err);
        });
    }
    else {
      this._storage.get('id_commune').then((val) => {
        //run serves request
        this.addInList(val);
      }, (err) => {
        console.log("fired up for error");
        this.navCtrl.push(ChosecommunePage);
      });
    }
  }
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this._auth.userAuthUpdated.subscribe((iscon) => {
      this.isConnected = iscon;
      this.getprojectsList();
    }, (err) => {
      console.log(err);
    });
  }
  /**
   * addInList
   */
  public addInList(id) {
    this._projectService.ProjectListe(id)
      .subscribe(data => {
        if (data["status"] == true) {
          let tmp = data["data"]
          console.log(tmp);
          for (let i = 0; i < tmp.length; i++) {
            let ispic = './assets/imgs/in-app/default_proj.jpg';
            if (tmp[i].image != null && tmp[i].image.length > 0 && !tmp[i].image.endsWith("imageProjet/"))
            {
              ispic = tmp[i].image;
            }
            this.project_list.push({
              id: tmp[i].id,
              title: tmp[i].sujet,
              add_date: tmp[i]["datedebut"],
              timerange:tmp[i]["duree"],
              descrp: tmp[i].contenu,
              img: ispic,
              idCommune:id,
              comments:tmp[i].commentaires,
              likes:tmp[i].votes
            })
          }
        }
        else {
          console.log(data);
        }
      }, err => {
        console.log(err)
      });
  }
}
