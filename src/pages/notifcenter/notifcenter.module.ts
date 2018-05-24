import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NotifcenterPage } from './notifcenter';

@NgModule({
  declarations: [
    NotifcenterPage,
  ],
  imports: [
    IonicPageModule.forChild(NotifcenterPage),
  ],
})
export class NotifcenterPageModule {}
