import { AboutPage } from './../pages/about/about';
import { Component,ViewChild } from '@angular/core';
import { StatusBar } from "@ionic-native/status-bar";
import { SplashScreen } from '@ionic-native/splash-screen';
import { Platform, Nav } from "ionic-angular";
import { HomePage } from '../pages/home/home';
import { ContactPage } from '../pages/contact/contact';
import { TabsPage } from '../pages/tabs/tabs';
import { Storage } from '@ionic/storage/dist/storage';
import { PresentationPage } from '../pages/presentation/presentation';
import { AddStudentPage } from '../pages/add-student/add-student';
import { FacultePage } from '../pages/faculte/faculte';
import { IonicStorageModule } from "@ionic/storage";
import { SQLite, SQLiteObject } from "@ionic-native/sqlite";
import { ListFacultePage } from '../pages/list-faculte/list-faculte';
import { ListDepartementPage } from '../pages/list-departement/list-departement';
import { DepartementPage } from '../pages/departement/departement';
import { ListStudentPage } from '../pages/list-student/list-student';
import { ProfilPage } from '../pages/profil/profil';


const DataB: string = "membre.db";
export interface PageInterface {
  title: string;
  component: any;
  icon: string;
}

@Component({
  templateUrl: "app.html"
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  private db: SQLiteObject;
  pages: PageInterface[] = [

    { title: "Facultes", component: ListFacultePage, icon: "contact" },
    { title: "Departement", component: ListDepartementPage, icon: "home" },
    { title: "Etudiant", component: ListStudentPage, icon: "contacts" }
  ];
  rootPage: any;

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public storage: Storage,
    public sqlite: SQLite
  ) {
    storage.get("presentation").then(presentation => {
      if (presentation) {
        this.rootPage = PresentationPage;
      } else {
        this.rootPage = PresentationPage;
      }
      this.platformReady();
    });

  }

  platformReady() {
    this.platform.ready().then(() => {
      this.statusBar.overlaysWebView(false);

      this.splashScreen.hide();
      this.statusBar.backgroundColorByHexString("#488aff");
    });
  }
  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
    /*  this.rootPage=page.component; */
  }

}
