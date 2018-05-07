import { Component } from '@angular/core';
import { NavController, Note } from 'ionic-angular';
import { PopoverController } from 'ionic-angular';
import { MoreMenuPage } from '../more-menu/more-menu';
import { ChosecommunePage } from '../chosecommune/chosecommune';
import { ListeprojectPage} from '../listeproject/listeproject';
import { SondagePage} from '../sondage/sondage';
import { ReclamationPage} from '../reclamation/reclamation';
import { UserServiceProvider } from '../../providers/user-service/user-service';
import {ContactPage} from '../contact/contact';
import {InformationPage} from '../information/information';
import {QuestionPage} from '../question/question';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  items: any
  itemsNames = ['commune', 'cytoi', 'contact', 'about']
  isCommuneexiste:boolean;

  constructor(public navCtrl: NavController, private popoverCtrl: PopoverController,private _userService:UserServiceProvider ) {
    //this.items = {'project':false , 'cytoi':false, 'contact':false , 'about':false};
    this.items = [false,false,false,false]
    // this.isCommuneexiste = this._userService.isCommuneSeted();
    // optimise commune chose access
  }
  // show up the top menu
  presentPopover(myEvent) {
    let popover = this.popoverCtrl.create(MoreMenuPage);
    popover.present({
      ev: myEvent
    });
  }

  // chnage the item from show to hide and inverse
  public chnageItem(currentitem) {
    if(this.items[currentitem]){
      this.items[currentitem] = !this.items[currentitem];
    }
    else{
      for(let i=0;i<this.items.length;i++){
        this.items[i] = false
      }
      this.items[currentitem] = true;
    }
    }
  redirect(pageto){
    console.log('start check');
    // test if he have localstorage variable with commu id
    // else
    switch (pageto) {
      case 'projets':
        this.navCtrl.push(ListeprojectPage);
        break;
      case 'sondage':
        this.navCtrl.push(SondagePage);
        break;
      case 'reclamation':
          this.navCtrl.push(ReclamationPage);
          break;
      case 'contact':
          this.navCtrl.push(ContactPage);
          break;
      case 'information':
          this.navCtrl.push(InformationPage);
          break;
      case 'question':
              this.navCtrl.push(QuestionPage);
              break;
      default:
        break;
    }
  }


}
