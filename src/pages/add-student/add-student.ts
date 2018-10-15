
import { StudentInterface } from '../../interfaces/studentInterface';
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
import { ListStudentPage } from '../list-student/list-student';
/**
 * Generated class for the AddStudentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

 const DataB: string = "membre.db";

/* @IonicPage() */
@Component({
  selector: "page-add-student",
  templateUrl: "add-student.html"
})
export class AddStudentPage {
  signUp: StudentInterface = {};
  private db: SQLiteObject;
  nomEtudiant: string;
  postnomEtudiant: string;
  prenomEtudiant: string;
  ageEtudiant: string;
  promotionEtudiant: string;
  telEtudiant: string;
  sexeEtudiant: string;
  myPhoto = "assets/profil.png";
  occupation: string;
  adresse: string;
  description: string;
  email: string;
  departement: any[] = [];
  Departements: any[] = [];
  nomDep: string;
  placeholder: "assets/profil.png";
  myPhoto2 = "assets/profil.png";
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
    console.log("ionViewDidLoad AddStudentPage");
  }

  ngOnInit() {
    this.sqlite
      .create({
        name: "etudiant.db",
        location: "default"
      })
      .then((db: SQLiteObject) => {
        return db
          .executeSql("select nomDepartement from Departement", {})

          .then(res => {
            /*  this.photos = []; */

            for (let i = 0; i < res.rows.length; i++) {
              this.Departements.push(res.rows.item(i));
            }
          });
      })

      .catch(e => console.log("Erreur : " + e));
  }

  onAddStudent() {}

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
            this.takePhoto(this.camera.PictureSourceType.PHOTOLIBRARY); //escolher photo da libraria
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

  saveEtudiant(id) {
    this.sqlite
      .create({
        name: "etudiant.db",
        location: "default"
      })
      .then((db: SQLiteObject) => {
        return db.executeSql(
          'INSERT INTO Etudiant (photoEtudiant,photocoverEtudiant,nomEtudiant,postnomEtudiant, prenomEtudiant, ageEtudiant, sexeEtudiant, promotionEtudiant, telephoneEtudiant, occupationEtudiant, adresseEtudiant,descriptionEtudiant, emailEtudiant, idDepartement) VALUES ("' +
            this.myPhoto2 +
            '","' +
            this.myPhoto +
            '","' +
            this.nomEtudiant +
            '", "' +
            this.postnomEtudiant +
            '", "' +
            this.prenomEtudiant +
            '","' +
            this.ageEtudiant +
            '","' +
            this.sexeEtudiant +
            '","' +
            this.promotionEtudiant +
            '", "' +
            this.telEtudiant +
            '", "' +
            this.occupation +
            '", "' +
            this.adresse +
            '","' +
            this.description +
            '", "' +
            this.email +
            '", "' +
            id.idDepartement +
            '")',
          {}
        );
      })
      .then(() => {
        /* this.navCtrl.push(ListFacultePage); */

        this.navCtrl.setRoot(ListStudentPage);
      })
      .catch(e => console.log(e));
  }

  private takePhoto(source: number = 1, mediaType: number = 0) {
    const options: CameraOptions = {
      quality: 50,
      allowEdit: true,
      sourceType: source,
      cameraDirection: this.camera.Direction.BACK,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      targetWidth: 720,
      targetHeight: 720,
      correctOrientation: true
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

  pickId() {
    this.sqlite
      .create({ name: "etudiant.db", location: "default" })
      .then((db: SQLiteObject) => {
        return db
          .executeSql(
            "select idDepartement from Departement where nomDepartement= '" +
              this.nomDep +
              "'   ",
            {}
          )

          .then(res => {
            for (let i = 0; i < res.rows.length; i++) {
              this.departement.push(res.rows.item(i));
            }
          });
      })

      .catch(e => console.log("Erreur : " + e));
  }

  choosePhoto2() {
    let actionSheet = this.actionSheet.create({
      title: "Selectionner une image",
      buttons: [
        {
          text: "Prendre une photo",
          handler: () => {
            this.takePhoto2(
              this.camera.PictureSourceType.CAMERA,
              this.camera.MediaType.PICTURE
            ); // tirar foto com a cam
          }
        },
        {
          text: "Importer photo",
          handler: () => {
            this.takePhoto2(
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

  private takePhoto2(source: number = 1, mediaType: number = 0) {
    const options: CameraOptions = {
      quality: 50,
      allowEdit: true,
      mediaType: mediaType,
      sourceType: source,
      cameraDirection: this.camera.Direction.BACK,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      targetWidth: 720,
      targetHeight: 720,
      correctOrientation: true
    };
    this.camera
      .getPicture(options)
      .then(imageData => {
        if (source == 0 && this.platform.is("android")) {
          // se for photolibrary
          this.filePath.resolveNativePath(imageData).then(filePath => {
            this.myPhoto2 = filePath;
          });
        } else {
          this.myPhoto2 = imageData;
        }
      })
      .catch(err => {
        console.log(err);
      });
  }
}
