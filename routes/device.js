//Luodaan SQL-yhteys
const connection = require('../connection');

module.exports = function (app) {

    app.route('/api/device')
        //Laitteiden haku API
        .get(function (req, res) {
            var { loggedin, uid } = req.session;

            if (req.session && loggedin && uid) {
                //Haetaan kaikki laitteet
                connection.query('SELECT id, name, description, category_id AS category, user_id AS user, location_id AS location FROM device', function (err, result) {
                    if (err) throw err;

                    res.json([{ loggedin: true }, result]);
                });
            } else {
                res.json([{ loggedin: false }]);
                //res.redirect("http://localhost:3000");
            }
        })
        //Laitteen lisäys API
        .post(function (req, res) {
            var { type, format, search, name, description, categoryid, userid, locationid, count } = req.body;
            var { loggedin, uid } = req.session;
            let messages = [];

            if (req.session && loggedin && uid) {
                if (type == "get" && format == "grid") {
                    if (!search || search == "") {
                        //Haetaan kaikki laitteet
                        connection.query('SELECT d.id AS id, d.name AS name, d.description AS description, c.name AS category, u.name AS user, s.name AS site, l.shelf AS location FROM device d JOIN category c ON d.category_id = c.id JOIN user u ON d.user_id = u.id JOIN location l ON d.location_id = l.id JOIN site s ON d.location_id = s.id', function (err, result) {
                            if (err) throw err;

                            res.json([{ loggedin: true }, result]);
                        });
                    } else {
                        //Haetaan kaikki laitteet
                        connection.query("SELECT d.id AS id, d.name AS name, d.description AS description, c.name AS category, u.name AS user, s.name AS site, l.shelf AS location FROM device d JOIN category c ON d.category_id = c.id JOIN user u ON d.user_id = u.id JOIN location l ON d.location_id = l.id JOIN site s ON d.location_id = s.id WHERE d.id LIKE '%" + search + "%' OR d.name LIKE '%" + search + "%' OR d.description LIKE '%" + search + "%' OR c.name LIKE '%" + search + "%' OR u.name LIKE '%" + search + "%' OR s.name LIKE '%" + search + "%' OR l.shelf LIKE '%" + search + "%'", function (err, result) {
                            if (err) throw err;

                            res.json([{ loggedin: true }, result]);
                        });
                    }
                } else {
                    //Tarkistetaan onko kaikki kentät täytetty
                    if (!name || !description || !categoryid || !userid || !locationid) {
                        messages.push({ msg: 'Täytä kaikki kentät' })
                    }

                    //Tarkistetaan tuliko virheitä ja palautetaan frontendiin
                    if (messages.length > 0) {
                        res.json(messages);
                    }
                    //Läpi meni, suoritetaan laitteen lisäys
                    else {
                        //Lisätään laite tietokantaan
                        for (i = 0; i < count; i++) {
                            connection.query('INSERT INTO device(name, description, category_id, user_id, location_id) VALUES (?, ?, ?, ?, ?)', [name, description, categoryid, userid, locationid], (err, result) => {
                                if (err) throw err;
                            });
                        }

                        console.log(count + " laitetta lisätty: " + name);
                        messages.push({ msg: count + ' laitetta lisätty' })
                        res.json([{ loggedin: true }, messages]);
                        //res.json(messages);
                    }
                }
            } else {
                res.json([{ loggedin: false }]);
            }
        })
        //Laitteen muokkaus API
        .put(function (req, res) {
            var { name, description, categoryid, userid, locationid, deviceid } = req.body;
            var { loggedin, uid } = req.session;
            let messages = [];

            if (req.session && loggedin && uid) {
                //Tarkistetaan onko kaikki kentät täytetty
                if (!name || !description || !categoryid || !userid || !locationid) {
                    messages.push({ msg: 'Täytä kaikki kentät' })
                }

                //Tarkistetaan tuliko virheitä ja palautetaan frontendiin
                if (messages.length > 0) {
                    res.json(messages);
                }
                //Läpi meni, suoritetaan laitteen muokkaus
                else {
                    //Muokataan laitetta tietokannassa
                    connection.query('UPDATE device SET name=?, description=?, category_id=?, user_id=?, location_id=? WHERE id=?', [name, description, categoryid, userid, locationid, deviceid], (err, results) => {
                        if (err) throw err;

                        console.log("Laite muokattu: " + name);
                        messages.push({ msg: 'Laite muokattu' })
                        res.json([{ loggedin: true }, messages]);
                    });
                }
            } else {
                res.json([{ loggedin: false }]);
            }
        })
        //Laitteen poisto API
        .delete(function (req, res) {
            var { deviceid } = req.body;
            var { loggedin, uid } = req.session;
            let messages = [];

            if (req.session && loggedin && uid) {
                //Poistetaan laite tietokannasta
                connection.query('DELETE FROM device WHERE id=?', [deviceid], (err, results) => {
                    if (err) throw err;

                    console.log("Laite poistettu: " + deviceid);
                    messages.push({ msg: 'Laite poistettu' })
                    res.json([{ loggedin: true }, messages]);
                });
            } else {
                res.json([{ loggedin: false }]);
            }
        });
}