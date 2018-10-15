import { Injectable } from "@angular/core";
import { SQLiteObject } from "@ionic-native/sqlite";


import "rxjs/add/operator/map";
import { BDProvider } from "../database/bd.provider";
import { Fac } from "../local/etudiantLocal";


@Injectable()
export class DaoFaculteProvider {
  constructor(private dbProvider: BDProvider) {}

  public insert(fac: Fac) {
    return this.dbProvider
      .getDB()
      .then((db: SQLiteObject) => {
        let sql =
          "insert into Faculte (nomFaculte) values (?)";
        let data = [fac.nom];

        // as sqlite does not support boolean variables use 1 or 0 for typescript to understand true and false

        return db
          .executeSql(sql, data)
          .then((data: any) => {
            return true;
          })
          .catch(e => console.error(e));
      })
      .catch(e => console.error(e));
  }

  public update(fac: Fac) {
    return this.dbProvider
      .getDB()
      .then((db: SQLiteObject) => {
        let sql =
          "update  set nomFaculte = ? where idFaculte = ?";
        let data = [
         fac.nom,
         fac.id
        ];

        return db
          .executeSql(sql, data)
          .then((data: any) => {
            return true;
          })
          .catch(e => console.error(e));
      })
      .catch(e => console.error(e));
  }

  public getAll() {
    return this.dbProvider
      .getDB()
      .then((db: SQLiteObject) => {
        let sql = "SELECT idFaculte, nomfaculte FROM Faculte";
        var data: any[];

        return db
          .executeSql(sql, data)
          .then((data: any) => {
            if (data.rows.length > 0) {
              let Events: any[] = [];

              // I made the query return an array to make it easier to manipulate and reuse this structure for other queries

              for (var i = 0; i < data.rows.length; i++) {
                var Event = data.rows.item(i);
                Events.push(Event);
              }
              return Events;
            } else {
              return [];
            }
          })
          .catch(e => console.error(e));
      })
      .catch(e => console.error(e));
  }

  public get(id: number) {
    return this.dbProvider
      .getDB()
      .then((db: SQLiteObject) => {
        let sql = "select * from faculte where idFaculte = ?";
        let data = [id];

        return db
          .executeSql(sql, data)
          .then((data: any) => {
            if (data.rows.length > 0) {
              let Events: any[] = [];

              // I made the query return an array to make it easier to manipulate and reuse this structure for other queries

              for (var i = 0; i < data.rows.length; i++) {
                var Event = data.rows.item(i);
                Events.push(Event);
              }
              return Events;
            } else {
              return [];
            }
          })
          .catch(e => console.error(e));
      })
      .catch(e => console.error(e));
  }

  public remove(id: number) {
    return this.dbProvider
      .getDB()
      .then((db: SQLiteObject) => {
        let sql = "delete from Faculte where idFaculte = ?";
        let data = [id];

        return db
          .executeSql(sql, data)
          .then((data: any) => {
            return true;
          })
          .catch(e => console.error(e));
      })
      .catch(e => console.error(e));
  }
}
