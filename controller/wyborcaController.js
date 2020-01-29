const express = require('express');
const router = express.Router();

const Wyborca = require('../model/Wyborca');
const User = require('../model/User');
const Kandydat = require('../model/Kandydat');
const Dbservice = require('../model/Dbservice');
const DbValidate = require('../model/DbValidate');

router.get("/", (req, res, next) => {
    res.render('Home', {});
});

router.get("/Zarejestruj", (req, res, next) => {
    res.render('Zarejestruj', {});
});
router.get("/Glosuj", (req, res, next) => {
    res.render('Glosuj', {});
});
router.get("/Kontakt", (req, res, next) => {
    res.render('Kontakt', {});
});
router.get("/Dyskusja", (req, res, next) => {
    res.render('Dyskusja', {});
});

router.get("/PanelAdministratora", (req, res, next) => {
    Wyborca.list()
        .then(([wyborcaList, metadata]) => {
            res.render('PanelAdministratora', {
                wyborcaList: wyborcaList,
                page_last: req.query.page_last,
                page_next: req.query.page_next
            });
        }).catch(err => {
        console.log(err);
    });

});

router.get("/PanelAdministratoraKandydat", (req, res, next) => {
    Kandydat.list()
        .then(([kandydatList, metadata]) => {
            res.render('PanelAdministratoraKandydat', {
                kandydatList: kandydatList,
                page_last: req.query.page_last,
                page_next: req.query.page_next
            });
        }).catch(err => {
        console.log(err);
    });

});

router.get("/PanelAdministratoraUser", (req, res, next) => {
    User.list()
        .then(([userList, metadata]) => {
            res.render('PanelAdministratoraUser', {
                userList: userList,
                page_last: req.query.page_last,
                page_next: req.query.page_next
            });
        }).catch(err => {
        console.log(err);
    });

});
router.get("/NowyRekordKandydat", (req, res, next) => {
    res.render('NowyRekordKandydat', {wyboryId: req.query.wyboryId});
});

router.get("/NowyRekordWybory", (req, res, next) => {
    res.render('NowyRekordWybory', {kandydatId: req.query.kandydatId});
});

router.get("/Edycja", (req, res, next) => {
    Wyborca.getListFromId(req.query.wyborca_id).then(
        ([wyborcaList, metadata]) => {
            res.render('Edycja', {wyborcaId: req.query.wyborca_id, wyborcaList: wyborcaList});
        }).catch(err => {
        console.log(err);
    });
});

router.get("/EdycjaKandydat", (req, res, next) => {
    Kandydat.getListFromId(req.query.kandydat_id).then(
        ([kandydatList, metadata]) => {
            res.render('EdycjaKandydat', {kandydatId: req.query.kandydat_id, kandydatList: kandydatList});
        }).catch(err => {
        console.log(err);
    });
});

router.get("/EdycjaUser", (req, res, next) => {
    User.getListFromId(req.query.user_id).then(
        ([userList, metadata]) => {
            res.render('EdycjaUser', {userId: req.query.user_id, userList: userList});
        }).catch(err => {
        console.log(err);
    });
});

router.get("/Usun", (req, res, next) => {
    Wyborca.delete(req.query.wyborca_id);
    res.redirect("/PanelAdministratora?page_last=0&page_next=10");
});

router.get("/UsunKandydat", (req, res, next) => {
    Kandydat.delete(req.query.kandydat_id);
    res.redirect("/PanelAdministratoraKandydat?page_last=0&page_next=10");
});

router.get("/UsunUser", (req, res, next) => {
    User.delete(req.query.user_id);
    res.redirect("/PanelAdministratoraKandydat?page_last=0&page_next=10");
});

router.get("/Szczegoly", (req, res, next) => {
    Wyborca.getListFromId(req.query.wyborca_id).then(
        ([wyborcaList, metadata]) => {
            res.render('Szczegoly', {wyborcaId: req.query.wyborca_id, wyborcaList: wyborcaList});
        }).catch(err => {
        console.log(err);
    });
});

router.get("/SzczegolyKandydat", (req, res, next) => {
    Kandydat.getListFromId(req.query.kandydat_id).then(
        ([kandydatList, metadata]) => {
            res.render('SzczegolyKandydat', {wyborcaId: req.query.kandydat_id, kandydatList: kandydatList});
        }).catch(err => {
        console.log(err);
    });
});

router.get("/SzczegolyUser", (req, res, next) => {
    User.getListFromId(req.query.user_id).then(
        ([userList, metadata]) => {
            res.render('SzczegolyUser', {userId: req.query.user_id, userList: userList});
        }).catch(err => {
        console.log(err);
    });
});

router.get("/PanelAdministratoraWieledoWiele", (req, res, next) => {
    Dbservice.list()
        .then(([wyborcaKandydat, metadata]) => {
            res.render('PanelAdministratoraWieledoWiele', {
                wyborcaKandydat: wyborcaKandydat,
                page_last: req.query.page_last,
                page_next: req.query.page_next
            });
        }).catch(err => {
        console.log(err);
    });
});

router.get("/UsunWieleDoWiele", (req, res, next) => {
    Dbservice.delete(req.query.wyborca_id, req.query.kandydat_id);
    res.redirect("/PanelAdministratoraWieledoWiele?page_last=0&page_next=10");
});

router.get("/SzczegolyWieleDoWiele", (req, res, next) => {
    Dbservice.getListFromId(req.query.kandydat_id, req.query.wyborca_id).then(
        ([wyborcaKandydat, metadata]) => {
            res.render('SzczegolyWieleDoWiele', {
                kandydatId: req.query.kandydat_id,
                wyborcaId: req.query.wyborca_id,
                wyborcaKandydat: wyborcaKandydat
            })
        }).catch(err => {
        console.log(err);
    });

});
router.get("/EdycjaWieleDoWiele", (req, res, next) => {
    Dbservice.getListFromId(req.query.kandydat_id, req.query.wyborca_id).then(
        ([wyborcaKandydat, metadata]) => {
            res.render('EdycjaWieleDoWiele', {
                kandydatId: req.query.kandydat_id,
                wyborcaId: req.query.wyborca_id,
                wyborcaKandydat: wyborcaKandydat
            })
        }).catch(err => {
        console.log(err);
    });
});
router.get("/NowyRekordWieledoWiele", (req, res, next) => {
    Wyborca.list()
        .then(([wyborcaList, metadata]) => {
            Kandydat.list().then(([kandydatList, metadata]) => {
                res.render('NowyRekordWieleDoWiele', {
                    kandydatList: kandydatList,
                    wyborcaList: wyborcaList
                });
            })
        }).catch(err => {
        console.log(err);
    });
});

router.get("/Dodajistniejace", (req, res, next) => {
    Wyborca.list()
        .then(([wyborcaList, metadata]) => {
            Kandydat.list().then(([kandydatList, metadata]) => {
                console.log(wyborcaList);
                res.render('Dodajistniejace', {
                    kandydatList: kandydatList,
                    wyborcaList: wyborcaList
                });
            })
        }).catch(err => {
        console.log(err);
    });
});

router.post("/addWybory", (req, res, next) => {
    const newWyborca = new Wyborca(req.body.ING, req.body.godzinaZ, req.body.godzinaR, req.body.frekwencja, req.body.data);
    DbValidate.checkWyborcaExist(newWyborca).then(check => {
        if (req.body.kandydatId == "") {
            if (check == true) {
                console.log("Istnieje juz taki rekord !!!");
                res.redirect("/PanelAdministratora?page_last=0&page_next=10");
            } else {
                Wyborca.add(newWyborca);
                res.redirect("/PanelAdministratora?page_last=0&page_next=10");
            }
        } else {
            if (check == true) {
                console.log("Istnieje juz taki rekord !!!");
                res.redirect("/takirekordistniejeWybory");
            } else {
                Wyborca.add(newWyborca).then(
                    Dbservice.addWybory(req.body.kandydatId, newWyborca));
                res.redirect("/PanelAdministratoraWieleDoWiele?page_last=0&page_next=10");
            }
        }
    })
});

router.post("/addKandydat", (req, res, next) => {
    const newKandydat = new Kandydat(req.body.miejsce, req.body.imie, req.body.nazwisko, req.body.nrLegitymacjiPoselskiej, req.body.idLista, req.body.idUgrupowanie, req.body.idKandydujeDo);
    DbValidate.checkKandydatExist(newKandydat).then(check => {
        if (req.body.wyboryId == "") {
            if (check == true
            ) {
                console.log("Istnieje juz taki rekord !!!");
                res.redirect("/PanelAdministratoraKandydat?page_last=0&page_next=10");
            } else {
                Kandydat.add(newKandydat);
                res.redirect("/PanelAdministratoraKandydat?page_last=0&page_next=10");
            }
        } else {
            if (check == true) {
                console.log("Istnieje juz taki rekord !!!");
                res.redirect("/takirekordistniejeKandydat");
            } else {
                Kandydat.add(newKandydat).then(
                    Dbservice.addKandydat(req.body.wyboryId, newKandydat));
                res.redirect("/PanelAdministratoraWieleDoWiele?page_last=0&page_next=10");
            }
        }
    })
});

router.post("/addMoreToMore", (req, res, next) => {
    const newWyborca = new Wyborca(req.body.ING, req.body.godzinaZ, req.body.godzinaR, req.body.frekwencja, req.body.data);
    const newKandydat = new Kandydat(req.body.miejsce, req.body.imie, req.body.nazwisko, req.body.nrLegitymacjiPoselskiej, req.body.idLista, req.body.idUgrupowanie, req.body.idKandydujeDo);
    DbValidate.checkKandydatExist(newKandydat).then(checkkandydat => {
        DbValidate.checkWyborcaExist(newWyborca).then(checkwyborca => {
            if (checkkandydat == true) {
                console.log("Istnieje juz taki rekord !!!");
                res.redirect("/PanelAdministratoraWieleDoWiele?page_last=0&page_next=10");
            } else if (checkwyborca == true) {
                console.log("Istnieje juz taki rekord !!!");
                res.redirect("/PanelAdministratoraWieleDoWiele?page_last=0&page_next=10");
            } else {
                Kandydat.add(newKandydat).then(
                    Wyborca.add(newWyborca).then(
                        Dbservice.add(newWyborca, newKandydat)
                    )
                )
                res.redirect("/PanelAdministratoraWieleDoWiele?page_last=0&page_next=10");
            }

        })
    })
});

router.post("/addExistToExist", (req, res, next) => {
    Dbservice.addExistToExist(req.body.kandydat,req.body.wybory)
    res.redirect("/PanelAdministratoraWieleDoWiele?page_last=0&page_next=10");
});

router.post("/edit", (req, res, next) => {
    const newWyborca = new Wyborca(req.body.ING, req.body.godzinaZ, req.body.godzinaR, req.body.frekwencja, req.body.data, req.body.idwybory);
    Wyborca.edit(newWyborca);
    res.redirect("/PanelAdministratora?page_last=0&page_next=10");
});

router.post("/editKandydat", (req, res, next) => {
    const newKandydat = new Kandydat(req.body.miejsce, req.body.imie, req.body.nazwisko, req.body.nrLegitymacjiPoselskiej, req.body.idLista, req.body.idUgrupowanie, req.body.idKandydujeDo, req.body.kandydatId);
    Kandydat.edit(newKandydat);
    res.redirect("/PanelAdministratoraKandydat?page_last=0&page_next=10");
});

router.post("/editUser", (req, res, next) => {
    const newUser = new User(req.body.email, req.body.login, req.body.haslo, req.body.imie, req.body.nazwisko, req.body.pesel, req.body.dataUrodzenia,req.body.nrDowodu ,req.body.userId, );
    User.edit(newUser);
    res.redirect("/PanelAdministratoraUser?page_last=0&page_next=10");
});

router.post("/editMoreToMore", (req, res, next) => {
    const newWyborca = new Wyborca(req.body.ING, req.body.godzinaZ, req.body.godzinaR, req.body.frekwencja, req.body.data, req.body.idwybory);
    const newKandydat = new Kandydat(req.body.miejsce, req.body.imie, req.body.nazwisko, req.body.nrLegitymacjiPoselskiej, req.body.idLista, req.body.idUgrupowanie, req.body.idKandydujeDo, req.body.kandydatId);
    Dbservice.edit(newWyborca, newKandydat);
    res.redirect("/PanelAdministratoraWieleDoWiele?page_last=0&page_next=10");
});

router.post("/addUser", (req, res, next) => {
    const newUser = new User(req.body.email, req.body.login, req.body.haslo, req.body.imie, req.body.nazwisko, req.body.pesel, req.body.dataurodzenia, req.body.nrdowodu);
    DbValidate.checkUserExist(newUser).then(check => {
        if (check == true) {
            console.log("Istnieje juz taki rekord !!!");
            res.redirect("/");
        } else {
            User.addUser(newUser);
            res.redirect("/");
        }
    })
});

module.exports.route = router;