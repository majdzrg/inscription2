import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from "@angular/common/http";
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { Dialogs } from '@ionic-native/dialogs';
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import {InformationPage} from '../pages/information/information';
import { TabsPage } from '../pages/tabs/tabs';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginPage } from '../pages/login/login';
import { AddpersonPage } from '../pages/addperson/addperson';
import { MoreMenuPage } from "../pages/more-menu/more-menu";
import {ChosecommunePage} from "../pages/chosecommune/chosecommune";
import {ListeprojectPage} from "../pages/listeproject/listeproject";
import {ProjectPage} from "../pages/project/project";
import {SondagePage} from "../pages/sondage/sondage";
import { SondageOpenPage } from "../pages/sondage-open/sondage-open";
import { AuthentificationProvider } from '../providers/authentification/authentification';
import { IonicStorageModule } from '@ionic/storage';
import { UserServiceProvider } from '../providers/user-service/user-service';
import { ProjectsProvider } from '../providers/projects/projects';
@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    LoginPage,
    AddpersonPage,
    MoreMenuPage,
    ChosecommunePage,
    ListeprojectPage,
    ProjectPage,
    SondagePage,
    SondageOpenPage,
    InformationPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    LoginPage,
    AddpersonPage,
    MoreMenuPage,
    ChosecommunePage,
    ListeprojectPage,
    ProjectPage,
    SondagePage,
    SondageOpenPage,
    InformationPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Dialogs,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthentificationProvider,
    UserServiceProvider,
    ProjectsProvider
  ]
})
export class AppModule {}
