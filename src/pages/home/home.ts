import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { PopoverController } from 'ionic-angular';
import { MoreMenuPage } from '../more-menu/more-menu';
//import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  items = [{ 'project': true }, { 'cytoi': false }, { 'contact': false }, { 'about': false }]
  itemsNames = ['project','cytoi','contact','about']
  constructor(public navCtrl: NavController, private popoverCtrl: PopoverController) {
    //this.items = {'project':false , 'cytoi':false, 'contact':false , 'about':false};

    for (let i = 0; i < this.items.length; i++) {
      console.log(this.items[i])
    }
  }

  // show up the top menu
  presentPopover(myEvent) {
    let popover = this.popoverCtrl.create(MoreMenuPage);
    popover.present({
      ev: myEvent
    });
  }
  // chnage the item from show to hide and inverse
  public chnageItem(currentitem,event) {
    //console.log(event);
    //console.log(currentitem);
    let targetIndex = this.items[currentitem];
    let target = targetIndex[this.itemsNames[currentitem]]
    //console.log(target)

  //    console.log(' incerse it to true')
      this.items.about = false;
      this.items.project = false;
      this.items.contact = false;
      this.items.cytoi = false;
      target = !target;
      //this.items.project= true;
    //  console.log("new value is "+target)
    // }
    // for (let i = 0; i < this.items.length; i++) {
    //   console.log(this.items[i])
    // }
  //  ChangeDetectorRef.detectChanges();
    return true;
  }

}
