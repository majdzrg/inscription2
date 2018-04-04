import {MoreMenuPage} from '../more-menu/more-menu';
import { Component } from '@angular/core';
import {PopoverController, NavController,  NavParams, ModalController} from 'ionic-angular';
import { SondageOpenPage } from "../sondage-open/sondage-open";
/**
 * Generated class for the SondagePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-sondage',
  templateUrl: 'sondage.html',
})
export class SondagePage {
  private sondage:string = "active"
  private sondageActive:Array<any> = [];
  private sondageArchive: Array<any> = [];  
  constructor(public navCtrl: NavController, public navParams: NavParams, private popoverCtrl: PopoverController, public modalCtrl: ModalController) {
    this.sondageActive = [{
      id:1,
      title:'Journée Espaces verts',
      dscrp:'planification d\'un jour pour netoyer les espaces verts de centre urbain , avec la participation des ecoles , lycées etc ...',
      start_date:'2018/06/04'
    },
      {
        id: 2,
        title: 'Coret sert nor',
        dscrp: 'lorem ipsum lar car sar dar far je w mché w 4dwa 3id l7asel chway ktiba 3al 3in ',
        start_date: '2018/16/04'
      },
  ]
    this.sondageArchive = [{
      id: 3,
      title: 'Journée Espaces verts',
      dscrp: 'planification d\'un jour pour netoyer les espaces verts de centre urbain , avec la participation des ecoles , lycées etc ...',
      end_date: '2018/06/04'
    },
    {
      id: 4,
      title: 'Coret sert nor',
      dscrp: 'lorem ipsum lar car sar dar far je w mché w 4dwa 3id l7asel chway ktiba 3al 3in ',
      end_date: '2018/16/04'
    },
    ]
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad SondagePage');
  }
  presentPopover(myEvent) {
    let popover = this.popoverCtrl.create(MoreMenuPage);
    popover.present({
      ev: myEvent
    });
  }
  openSondage(id){
    let projModal = this.modalCtrl.create(SondageOpenPage, { sondagejId: id });
    projModal.present();
  }

}
