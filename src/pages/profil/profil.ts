import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,Platform,ActionSheetController } from 'ionic-angular';
import { IonicStorageModule } from "@ionic/storage";
import { Storage } from "@ionic/storage";
import { SQLite, SQLiteObject } from "@ionic-native/sqlite";
import { Camera, CameraOptions } from "@ionic-native/camera";
import { FilePath } from "@ionic-native/file-path";

/**
 * Generated class for the ProfilPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

// @IonicPage()
@Component({
  selector: "page-profil",
  templateUrl: "profil.html"
})
export class ProfilPage {
  Students: any[] = [];
  user = {
    name: "Cosima Niehaus",
    profileImage: "assets/girl-avatar.png",
    coverImage: "assets/background-5.jpg",
    occupation: "Designer",
    location: "Seattle, WA",
    description:
      "Passionate Designer. Recently focusing on developing mobile hybrid apps and web development.",
    address: "27 King's College Cir, Toronto, ON M5S, Canada",
    phone: "555 555 555",
    email: "cosima@niehaus.com",
    whatsapp: "555 555 555"
  };

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private actionSheet: ActionSheetController,
    private camera: Camera,
    private filePath: FilePath,
    private platform: Platform,
    private sqlite: SQLite
  ) {
    this.getCurrentData(navParams.get("idEtudiant"));
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad ProfilPage");
  }

  getCurrentData(idEtudiant) {
    this.sqlite
      .create({ name: "etudiant.db", location: "default" })
      .then((db: SQLiteObject) => {
        /*
    db.executeSql("CREATE TABLE IF NOT EXISTS Faculte (`idFaculte` INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, `nomFaculte` TEXT , photoFaculte NULL TEXT)", {})
.then(res=>console.log("table creee"))
    .catch(e => console.log(e)); */

        return (db
            // .executeSql(
            //   "select photoEtudiant,photocoverEtudiant, nomEtudiant, postnomEtudiant, prenomEtudiant, descriptionEtudiant, adresseEtudiant,occupationEtudiant, telephoneEtudiant, idDepartement from Etudiant NATURAL JOIN Departement USING (idDepartement) where idEtudiant=?",
            //   [idem]
            // )
            .executeSql("select * from Etudiant  where idEtudiant=?", [
              idEtudiant
            ])

            .then(res => {
              /*  this.photos = [];  JOIN departments USING (department_id)

            , ageEtudiant, sexeEtudiant,promotionEtudiant, telephoneEtudiant, idDepartement from Etudiant NATURAL JOIN Departement
            */

              for (let i = 0; i < res.rows.length; i++) {
                this.Students.push(res.rows.item(i));
              }
            }) );
      })

      .catch(e => console.log("Erreur : " + e));
  }
}
