import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { SQLite, SQLiteObject } from "@ionic-native/sqlite";
import { FacultePage } from '../faculte/faculte';
/**
 * Generated class for the ListFacultePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

/* @IonicPage() */
@Component({
  selector: "page-list-faculte",
  templateUrl: "list-faculte.html"
})
export class ListFacultePage {
  photos: any[] = [];
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public sqlite: SQLite
  ) {}

  ionViewDidLoad() {
    console.log("ionViewDidLoad ListFacultePage");
  }

  ngOnInit() {
    this.sqlite
      .create({
        name: "etudiant.db",
        location: "default"
      })
      .then((db: SQLiteObject) => {


/*
    db.executeSql("CREATE TABLE IF NOT EXISTS Faculte (`idFaculte` INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, `nomFaculte` TEXT , photoFaculte NULL TEXT)", {})
.then(res=>console.log("table creee"))
    .catch(e => console.log(e)); */



return db
  .executeSql("select * from Faculte", {})

  .then(res => {

    this.photos = [];

    for (let i = 0; i < res.rows.length; i++) {
      this.photos.push(res.rows.item(i));
    }
  });

      })

      .catch(e => console.log("Erreur : " + e));
  }

  addNewFaculte(){
    this.navCtrl.push(FacultePage);
  }
}
