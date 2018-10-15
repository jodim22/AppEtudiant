import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { SQLite, SQLiteObject } from "@ionic-native/sqlite";
import { FacultePage } from "../faculte/faculte";
import { DepartementPage } from '../departement/departement';

/**
 * Generated class for the ListDepartementPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

/* @IonicPage() */
@Component({
  selector: "page-list-departement",
  templateUrl: "list-departement.html"
})
export class ListDepartementPage {
  Depart: any[] = [];

  constructor(public sqlite:SQLite,public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log("ionViewDidLoad ListDepartementPage");
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
          .executeSql("select nomDepartement, idDepartement, idFaculte, photoFaculte from Departement NATURAL JOIN Faculte ", {})

          .then(res => {
                         /*  this.photos = [];  JOIN departments USING (department_id)*/

                         for (let i = 0; i < res.rows.length; i++) {
                           this.Depart.push(res.rows.item(i));
                         }
                       });
      })

      .catch(e => console.log("Erreur : " + e));
  }

  addNewDepartement() {
    this.navCtrl.push(DepartementPage);
  }
}
