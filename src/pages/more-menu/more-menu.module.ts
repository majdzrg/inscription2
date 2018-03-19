import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MoreMenuPage } from './more-menu';

@NgModule({
  declarations: [
    MoreMenuPage,
  ],
  imports: [
    IonicPageModule.forChild(MoreMenuPage),
  ],
})
export class MoreMenuPageModule {}
