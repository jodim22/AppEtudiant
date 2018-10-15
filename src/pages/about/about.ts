import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { PopoverController } from "ionic-angular";

@Component({
  selector: "page-about",
  templateUrl: "about.html"
})
export class AboutPage {
  conferenceDate = "2047-05-17";

  constructor(public navCtrl: NavController) {}
}
