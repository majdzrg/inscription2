import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { PopoverController } from 'ionic-angular';
import { MoreMenuPage } from '../more-menu/more-menu';
import { ChosecommunePage } from '../chosecommune/chosecommune';
import {ListeprojectPage} from '../listeproject/listeproject';
import {SondagePage} from '../sondage/sondage';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  items: any
  itemsNames = ['commune', 'cytoi', 'contact', 'about']
  constructor(public navCtrl: NavController, private popoverCtrl: PopoverController) {
    //this.items = {'project':false , 'cytoi':false, 'contact':false , 'about':false};
    this.items = [false,false,false,false]
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
  redirect(){
    console.log('start check');
    // test if he have localstorage variable with commu id
    // else
    this.navCtrl.setRoot(ChosecommunePage);
  }


}
