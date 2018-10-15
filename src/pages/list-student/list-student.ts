import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  AlertController,
  Platform,
  ActionSheetController
} from "ionic-angular";
import { IonicStorageModule } from "@ionic/storage";
import { Storage } from "@ionic/storage";
import { SQLite, SQLiteObject } from "@ionic-native/sqlite";
import { Camera, CameraOptions } from "@ionic-native/camera";
import { FilePath } from "@ionic-native/file-path";

import { AddStudentPage } from '../add-student/add-student';
import { ProfilPage } from "../profil/profil";

/**
 * Generated class for the ListStudentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

/* @IonicPage() */
@Component({
  selector: "page-list-student",
  templateUrl: "list-student.html"
})
export class ListStudentPage {

  Students: any[] = [];
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private actionSheet: ActionSheetController,
    private camera: Camera,
    private filePath: FilePath,
    private platform: Platform,
    private sqlite: SQLite
  ) {}

  ionViewDidLoad() {
    console.log("ionViewDidLoad ListStudentPage");
  }

  addNewStudent() {
    this.navCtrl.push(AddStudentPage);
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
          .executeSql(
            "select idEtudiant, photoEtudiant,nomEtudiant, postnomEtudiant, prenomEtudiant, idDepartement, nomDepartement from Etudiant  NATURAL JOIN Departement",
            {}
          )

          .then(res => {
            /*  this.photos = [];  JOIN departments USING (department_id)

            , ageEtudiant, sexeEtudiant,promotionEtudiant, telephoneEtudiant, idDepartement from Etudiant NATURAL JOIN Departement
            */

            for (let i = 0; i < res.rows.length; i++) {
              this.Students.push(res.rows.item(i));
            }
          });
      })

      .catch(e => console.log("Erreur : " + e));
  }

  onProfil(idEtudiant) {
    this.navCtrl.push(ProfilPage, { idEtudiant: idEtudiant });
  }

}
