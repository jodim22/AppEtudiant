import { Component,ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams,Slides , MenuController} from 'ionic-angular';
import { Storage } from "@ionic/storage";
import { TabsPage } from '../tabs/tabs';



/**
 * Generated class for the PresentationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

/* @IonicPage() */
@Component({
  selector: "page-presentation",
  templateUrl: "presentation.html"
})
export class PresentationPage {
  showSkip = true;

  @ViewChild("slides") slides: Slides;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public storage: Storage,
    public menu: MenuController
  ) {}
  startApp() {
    /* this.navCtrl.push(TabsPage).then(() => {
      this.storage.set('presentation', 'true');
    }); */

    this.navCtrl.setRoot(TabsPage).then(()=>{
      this.storage.set('presentation','true')
    })
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad PresentationPage");
  }

  onSlideChangeStart(slider: Slides) {
    this.showSkip = !slider.isEnd();
  }

  ionViewWillEnter() {
    this.slides.update();
  }

  ionViewDidEnter() {
    // the root left menu should be disabled on the tutorial page
    this.menu.enable(false);
  }

  ionViewDidLeave() {
    // enable the root left menu when leaving the tutorial page
    this.menu.enable(true);
  }
}
