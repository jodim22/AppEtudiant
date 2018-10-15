import { ListFacultePage } from './../list-faculte/list-faculte';
import { Faculte } from './../../models/faculte.model';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,AlertController, Platform, ActionSheetController} from 'ionic-angular';
import { IonicStorageModule } from "@ionic/storage";
import { Storage } from "@ionic/storage";
import { SQLite, SQLiteObject } from "@ionic-native/sqlite";
import { Camera, CameraOptions } from "@ionic-native/camera";
import { FilePath } from "@ionic-native/file-path";


/**
 * Generated class for the FacultePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
const DataB: string = "membre.db";
/* @IonicPage() */
@Component({
  selector: "page-faculte",
  templateUrl: "faculte.html"
})
export class FacultePage {
  nomF: string;
  faculte: any = [];
  myPhoto = "assets/profil.png";
  


  private db: SQLiteObject;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private actionSheet: ActionSheetController,
    private camera: Camera,
    private filePath: FilePath,
    private platform: Platform,
    private sqlite: SQLite
  ) {
    /* this.createDB(); */

    this.sqlite
      .create({ name: "etudiant.db", location: "default" })
      .then((db: SQLiteObject) => {
        db

          .executeSql(
            "CREATE TABLE IF NOT EXISTS `Faculte` ( `idFaculte` INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, `nomFaculte` TEXT, photoFaculte VARCHAR(250) )",
            {}
          )
          .then(() => {
            console.log("Table Faculte créee!");
            db
              .executeSql(
                "CREATE TABLE IF NOT EXISTS `Departement` ( `idDepartement` INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT , `nomDepartement` TEXT, `idFaculte` INTEGER REFERENCES Faculte(idFaculte) );",
                {}
              )
              .then(() => {
                console.log("Table DEPARTEMENT creee");
                db
                  .executeSql(
                    "CREATE TABLE IF NOT EXISTS `Etudiant` ( `idEtudiant` INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT ,photoEtudiant VARCHAR(250),photocoverEtudiant VARCHAR(250), `nomEtudiant` TEXT, postnomEtudiant TEXT, prenomEtudiant TEXT , ageEtudiant TEXT, sexeEtudiant TEXT, promotionEtudiant TEXT, telephoneEtudiant TEXT,occupationEtudiant TEXT,adresseEtudiant TEXT, descriptionEtudiant TEXT, emailEtudiant TEXT, idDepartement INTEGER REFERENCES Departement(idDepartement) );",
                    {}
                  )
                  .then(() => {
                    console.log("Table Etudiant creee");
                  })
                  .catch(e => console.log(e));
              })
              .catch(e => console.log(e));
          })
          .catch(e => console.log(e));
      });
  }

  ionViewDidLoad() {}

  choosePhoto() {
    let actionSheet = this.actionSheet.create({
      title: "Selectionner une image",
      buttons: [
        {
          text: "Prendre une photo",
          handler: () => {
            this.takePhoto(
              this.camera.PictureSourceType.CAMERA,
              this.camera.MediaType.PICTURE
            ); // tirar foto com a cam
          }
        },
        {
          text: "Importer photo",
          handler: () => {
            this.takePhoto(
              this.camera.PictureSourceType.PHOTOLIBRARY,
              this.camera.MediaType.PICTURE
            ); //escolher photo da libraria
          }
        },
        {
          text: "Annuler",
          role: "cancel"
        }
      ]
    });
    actionSheet.present();
  }

  save() {
    this.sqlite
      .create({
        name: "etudiant.db",
        location: "default"
      })
      .then((db: SQLiteObject) => {
        return db.executeSql(
          'INSERT INTO Faculte (nomFaculte,photoFaculte) VALUES ("' +
            this.nomF +
            '","' +
            this.myPhoto +
            '")',
          {}
        );
      })
      .then(() => {
        /* this.navCtrl.push(ListFacultePage); */

        this.navCtrl.setRoot(ListFacultePage);
      })
      .catch(e => console.log(e));
  }

  private takePhoto(source: number = 1, mediaType: number = 0) {
    const options: CameraOptions = {
      quality: 50,
      allowEdit: false,
      mediaType: mediaType,
      sourceType: source,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      targetWidth: 720,
      targetHeight: 720,
      correctOrientation: false
    };
    this.camera
      .getPicture(options)
      .then(imageData => {
        if (source == 0 && this.platform.is("android")) {
          // se for photolibrary
          this.filePath.resolveNativePath(imageData).then(filePath => {
            this.myPhoto = filePath;
          });
        } else {
          this.myPhoto = imageData;
        }
      })
      .catch(err => {
        console.log(err);
      });
  }
}
