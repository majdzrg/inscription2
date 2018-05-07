import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from "@angular/common/http";
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { Dialogs } from '@ionic-native/dialogs';
import { AboutPage } from '../pages/about/about';
import { HomePage } from '../pages/home/home';
import { InformationPage } from '../pages/information/information';
import { TabsPage } from '../pages/tabs/tabs';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginPage } from '../pages/login/login';
import { AddpersonPage } from '../pages/addperson/addperson';
import { MoreMenuPage } from "../pages/more-menu/more-menu";
import { ChosecommunePage } from "../pages/chosecommune/chosecommune";
import { ListeprojectPage } from "../pages/listeproject/listeproject";
import { ProjectPage } from "../pages/project/project";
import { SondagePage } from "../pages/sondage/sondage";
import { SondageOpenPage } from "../pages/sondage-open/sondage-open";
import { AuthentificationProvider } from '../providers/authentification/authentification';
import { IonicStorageModule } from '@ionic/storage';
import { UserServiceProvider } from '../providers/user-service/user-service';
import { GouvernoratProvider } from '../providers/gouvernorat/gouvernorat';
import { ProjectsProvider } from '../providers/projects/projects';
import { CommuneProvider } from '../providers/commune/commune';
import { SondageProvider } from '../providers/sondage/sondage';
import { ReclamationPage } from '../pages/reclamation/reclamation';
import { Camera } from '@ionic-native/camera';
import { Geolocation } from '@ionic-native/geolocation';
import { ContactPage } from '../pages/contact/contact';
import { ProfilePage } from '../pages/profile/profile';
import { EditProfilePage } from '../pages/edit-profile/edit-profile';
import { ReclamationInfoPage } from "../pages/reclamation-info/reclamation-info";
import { ReclamationFormPage } from "../pages/reclamation-form/reclamation-form";
import { ReclamationProvider } from '../providers/reclamation/reclamation';
import {QuestionPage} from '../pages/question/question';
import {QuestionFormPage} from '../pages/question-form/question-form';
import { QuestionProvider } from '../providers/question/question';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
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
    ReclamationPage,
    ContactPage,
    InformationPage,
    ProfilePage,
    EditProfilePage,
    ReclamationFormPage,
    ReclamationInfoPage,
    QuestionPage,
    QuestionFormPage
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
    ReclamationPage,
    ContactPage,
    InformationPage,
    ProfilePage,
    EditProfilePage,
    ReclamationFormPage,
    ReclamationInfoPage,
    QuestionPage,
    QuestionFormPage

  ],
  providers: [
    StatusBar,
    SplashScreen,
    Dialogs,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    AuthentificationProvider,
    UserServiceProvider,
    GouvernoratProvider,
    ProjectsProvider,
    CommuneProvider,
    SondageProvider,
    Camera,
    Geolocation,
    ReclamationProvider,
    QuestionProvider
  ]
})
export class AppModule { }
