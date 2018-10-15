import { ProfilPage } from './../pages/profil/profil';
import { FilePath } from '@ionic-native/file-path';
import { Camera } from '@ionic-native/camera';
import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { SuperTabsModule } from "ionic2-super-tabs";
import { PresentationPage } from '../pages/presentation/presentation';
import { Storage } from '@ionic/storage';
import { IonicStorageModule } from "@ionic/storage";
import { AddStudentPage } from '../pages/add-student/add-student';
import { DepartementPage } from '../pages/departement/departement';
import { FacultePage } from '../pages/faculte/faculte';
import { SQLite, SQLiteObject } from "@ionic-native/sqlite";
import { DaoFaculteProvider } from '../providers/dao/daoFaculte';
import { BDProvider } from '../providers/database/bd.provider';
import { CameraProvider } from '../providers/util/camera.provider';
import { ListFacultePage } from '../pages/list-faculte/list-faculte';
import { ListDepartementPage } from '../pages/list-departement/list-departement';
import { ListStudentPage } from '../pages/list-student/list-student';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    PresentationPage,
    AddStudentPage,
    DepartementPage,
    FacultePage,
    ListFacultePage,
    ListDepartementPage,
    ListStudentPage,
    AddStudentPage,
    ProfilPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    SuperTabsModule.forRoot(),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    PresentationPage,
    AddStudentPage,
    DepartementPage,
    FacultePage,
    ListFacultePage,
    ListDepartementPage,
    ListStudentPage,
    AddStudentPage,
    ProfilPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    IonicStorageModule,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    SQLite,
    DaoFaculteProvider,
    BDProvider,
    CameraProvider,
    Camera,
    FilePath
  ]
})
export class AppModule {}
