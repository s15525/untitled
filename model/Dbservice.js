const wyborca = require('../model/Wyborca');
const kandydat = require('../model/Kandydat');

const db = require('../db/mysql');

class Dbservice {

    static list() {
        return db.execute('SELECT * FROM `portal`.`Kandydujew` INNER JOIN `portal`.`Kandydat` ON `portal`.`Kandydat`.`idkandydat` = `portal`.`Kandydujew`.`idkandydat` INNER JOIN `portal`.`wybory` ON `portal`.`Wybory`.`idwybory` = `portal`.`Kandydujew`.`idwybory`');
    }

    static getListFromId(idkandydat, idwybory) {
        return db.execute('SELECT * FROM `portal`.`Kandydujew` INNER JOIN `portal`.`Kandydat` ON `portal`.`Kandydat`.`idkandydat` = `portal`.`Kandydujew`.`idkandydat` INNER JOIN `portal`.`wybory` ON `portal`.`Wybory`.`idwybory` = `portal`.`Kandydujew`.`idwybory` WHERE `portal`.`Kandydat`.`idkandydat` = ? and `portal`.`Wybory`.`idwybory` = ? ', [idkandydat, idwybory]);
    }

    static edit(wybory, kandydatprz) {
        wyborca.edit(wybory);
        kandydat.edit(kandydatprz);
    }

    static delete(idwybory, idkandydat) {
        return db.execute('DELETE FROM `portal`.`Kandydujew` WHERE `idwybory`= ? AND `idkandydat` = ?', [idwybory, idkandydat]);
    }

    static add(wybory, kandydatprz) {
        wyborca.findindex().then(
            ([x, metadata]) => {
                kandydat.findindex().then(([c, metadata]) => {
                    var maxkandydat = c[0].b;
                    var maxwybory = x[0].a;
                    return db.execute('insert into `portal`.`Kandydujew` (idkandydat,idwybory) values (?, ?)', [maxkandydat,maxwybory ])
                })
    });
    }


    static addWybory(idKandydat, wybory) {
        wyborca.findindex().then(
            ([x, metadata]) => {
                return db.execute('insert into `portal`.`Kandydujew` (idkandydat,idwybory) values (?, ?)', [idKandydat, x[0].a]);
            });
    }

    static addKandydat(idWybory, kandydatprz) {
        kandydat.findindex().then(([c, metadata]) => {
        return db.execute('insert into `portal`.`Kandydujew` (idkandydat,idwybory) values (?, ?)', [c[0].b, idWybory]);
        });
    }
}

module.exports = Dbservice;