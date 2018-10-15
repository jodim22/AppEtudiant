import { Injectable } from "@angular/core";
import { SQLite, SQLiteObject } from "@ionic-native/sqlite";

@Injectable()
export class BDProvider {
  constructor(private sqlite: SQLite) {}

  public getDB() {
    return this.sqlite.create({
      name: "etudiant.db",
      location: "default"
    });
  }

  public createDatabase() {
    return this.getDB()
      .then((db: SQLiteObject) => {
        // Creating as tables
        this.createTables(db);

        // insert data
        this.insertDefaultItems(db);
      })
      .catch(e => console.log(e));
  }

  private createTables(db: SQLiteObject) {
    // Creating as tables
    db
      .sqlBatch([
        [
          "CREATE TABLE IF NOT EXISTS `Faculte` ( `idFaculte` INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, `nomFaculte` TEXT )"
        ]
      ])
      .then(() => console.log("Table faculte creee"))
      .catch(e => console.error("Erreur lors de la creation des tables", e));
  }

  private insertDefaultItems(db: SQLiteObject) {
    db
      .executeSql("select COUNT(id) as qtd from Faculte", {})
      .then((data: any) => {
        //If there is no record
        if (data.rows.item(0).qtd == 0) {
          // insert data

          db
            .sqlBatch([
              [
                "insert into Faculte (nomfaculte) values (?)",
                [
                  "Faculte des Sciences"
                ]
              ]
            ])
            .then(() => console.log("La faculte par defaut est sauvegardee"))
            .catch(e => console.error("Erreur de sauvegarde des donnees par defaut", e));
        }
      })
      .catch(e => console.error("Erreur de verification des donnees", e));
  }
}
