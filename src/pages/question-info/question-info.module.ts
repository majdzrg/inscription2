import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { QuestionInfoPage } from './question-info';

@NgModule({
  declarations: [
    QuestionInfoPage,
  ],
  imports: [
    IonicPageModule.forChild(QuestionInfoPage),
  ],
})
export class QuestionInfoPageModule {}
