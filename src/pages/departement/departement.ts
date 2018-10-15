import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { SQLite, SQLiteObject } from "@ionic-native/sqlite";
import { ListDepartementPage } from '../list-departement/list-departement';

/**
 * Generated class for the DepartementPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

/* @IonicPage() */
@Component({
  selector: "page-departement",
  templateUrl: "departement.html"
})
export class DepartementPage {
  facultes: any[] = [];
  nomFac: string;
  nomDep: string;
  idfacultes: any[]= [];
  id;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public sqlite: SQLite
  ) { }

  ionViewDidLoad() {
    console.log("ionViewDidLoad DepartementPage");
  }

  pickId() {
    this.sqlite
      .create({
        name: "etudiant.db",
        location: "default"
      })
      .then((db: SQLiteObject) => {

        return db
          .executeSql(
            "select idFaculte from Faculte where nomFaculte= '" +
              this.nomFac +
              "'   ",
            {}
          )

          .then(res => {


            for (let i = 0; i < res.rows.length; i++) {
              this.idfacultes.push(res.rows.item(i));


            }
          });
      })

      .catch(e => console.log("Erreur : " + e));
  }




  ngOnInit() {
    this.sqlite
      .create({
        name: "etudiant.db",
        location: "default"
      })
      .then((db: SQLiteObject) => {


        return db
          .executeSql("select nomFaculte from Faculte", {})

          .then(res => {
            /*  this.photos = []; */

            for (let i = 0; i < res.rows.length; i++) {
              this.facultes.push(res.rows.item(i));

            }
          });
      })

      .catch(e => console.log("Erreur : " + e));



  }

  addNewDepartement() {}

  saveDepart(id){

 this.sqlite
   .create({ name: "etudiant.db", location: "default" })
   .then((db: SQLiteObject) => {
     return db.executeSql('INSERT INTO Departement (nomDepartement,idFaculte) VALUES ("' + this.nomDep + '","' + id.idFaculte + '")', {});
   })
   .then(() => {
     this.navCtrl.setRoot(ListDepartementPage);
   })
   .catch(e => console.log(e));



  }
}
