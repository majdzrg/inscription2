import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {ProjectPage} from '../project/project';
import { ModalController } from 'ionic-angular';
import { UserServiceProvider } from '../../providers/user-service/user-service';
import {ProjectsProvider} from '../../providers/projects/projects';
import { ChosecommunePage } from '../chosecommune/chosecommune';
import { Storage } from '@ionic/storage';

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
  project_list = [
    {
      id:1,
      title:'some thing of project',
      add_date:'2018/05/05',
      descrp:'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
      img:'https://picsum.photos/600/400?random'
    },
    {
      id:2,
      title:'some thing of project',
      add_date:'2018/05/05',
      descrp:'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
      img:'https://picsum.photos/600/400?random'
    }
  ]
  constructor(public navCtrl: NavController, public navParams: NavParams,public modalCtrl: ModalController,private _userService:UserServiceProvider,private _storage:Storage,private _projectService:ProjectsProvider) {
        this.getprojectsList();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListeprojectPage');
  }
  openProj(proj_id){
    let projModal = this.modalCtrl.create(ProjectPage, { projId: proj_id });
    projModal.present();
  }

  ionViewWillEnter(){
    this._storage.get('id_commune').then((val)=>{
      console.log(val);
      if(val == null){
        this.navCtrl.push(ChosecommunePage);
      }
    },(err)=>{
      this.navCtrl.push(ChosecommunePage);
    });
  }
  getprojectsList(){
    this._storage.get('id_commune').then((val)=>{
      //run serves request
      this._projectService.ProjectListe(val)
      .subscribe(data=>{
        console.log(data);
        console.log(data["status "]);
        if(data["status "]==true){
          let tmp=data["data "]
          console.log(tmp);
          for(let i=0;i<tmp.length;i++){
            this.project_list.push(  {
                id:tmp[i].id,
                title:tmp[i].sujet,
                add_date:tmp[i]["Date de debut"],
                descrp:tmp[i].contenu,
                img:'https://picsum.photos/600/400?random'
              })
          }
        }
        else{}



      },err=>{
        console.log(err)
      });
    },(err)=>{
      this.navCtrl.push(ChosecommunePage);
    });
  }
}
