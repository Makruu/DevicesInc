//Luodaan SQL-yhteys
const connection = require('../connection');
const bcrypt = require('bcrypt');

module.exports = function (app) {

    //Kirjautumis API
    app.post('/api/login', function (req, res) {
        var { username, password } = req.body;
        let messages = [];

        //Tarkistetaan onko kentät täytetty
        if (!username || !password) {
            messages.push({ success: false, msg: 'Täytä käyttäjänimi ja salasana' })
        }

        //Tarkistetaan tuliko virheitä ja palautetaan frontendiin
        if (messages.length > 0) {
            res.json(messages);
        }
        //Läpi meni, suoritetaan kirjautuminen
        else {
            connection.query('SELECT * FROM user WHERE user = ?', [username], function (error, results) {
                //Tarkistetaan, että tuloksia vain yksi
                if (results.length !== 1) {
                    messages.push({ success: false, msg: 'Väärä käyttäjätunnus tai salasana' })
                } else {
                    //Tarkistetaan salasana
                    if (!(bcrypt.compareSync(password, results[0].pwd))) {
                        messages.push({ success: false, msg: 'Väärä käyttäjätunnus tai salasana' })
                    }
                }

                //Tarkistetaan tuliko virheitä ja palautetaan frontendiin
                if (messages.length > 0) {
                    res.json(messages);
                }
                //Ei virheitä, asetetaan kirjautuminen sessioon
                else {
                    req.session.loggedin = true;
                    req.session.uid = results[0].id;
                    req.session.user = results[0].user;

                    console.log("Kirjautuminen onnistui: " + req.session.user);
                    messages.push({ success: true, msg: 'Kirjautuminen ok' })

                    //res.redirect('http://localhost:3000/devices');
                    res.json(messages);
                }
                res.end();
            });
        }
    });

    //Uloskirjautumis API
    app.get('/api/logout', function (req, res) {
        console.log("User logged out: " + req.session.user);
        req.session.destroy(function (err) {
            if (err) console.log(err);
            res.redirect('http://localhost:3000');
        });
    });
}