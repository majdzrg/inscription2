import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ReclamationFormPage } from './reclamation-form';

@NgModule({
  declarations: [
    ReclamationFormPage,
  ],
  imports: [
    IonicPageModule.forChild(ReclamationFormPage),
  ],
})
export class ReclamationFormPageModule {}
