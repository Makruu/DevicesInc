//Luodaan SQL-yhteys
const connection = require('../connection');
const bcrypt = require('bcrypt');

module.exports = function (app) {

    //Rekisteröitymis API
    app.post('/api/register', function (req, res) {

        var { username, password, type, name, phone, type } = req.body;
        let messages = [];

        // type = 1; //kovakoodaus testiä varten!

        //Tarkistetaan onko kaikki kentät täytetty
        if (!username || !password || !type || !name || !phone) {
            messages.push({ msg: 'Please fill in all fields' })
        }

        // Tarkastetaan, että ei pääse livahtamaan vääriä tyyppejä.
        if (type != 1 && type != 2){
            messages.push({msg: 'Please give an appropriate value for type' })
        }

        //Tarkistetaan salasanan pituus
        if (password.length < 6) {
            messages.push({ msg: 'Password must be at least 6 characters' })
        }

        //Tarkistetaan onko käyttäjätunnus jo käytössä
        connection.query('SELECT user FROM user WHERE user = ?', [username], async (err, results) => {
            if (err) throw err;

            if (results.length > 0) {
                messages.push({ msg: 'Username is already in use' })
            }

            //Tarkistetaan tuliko virheitä ja palautetaan frontendiin
            if (messages.length > 0) {
                res.json(messages);
            }
            //Läpi meni, suoritetaan rekisteröityminen 
            else {
                //Hashataan salasana
                let hashedPassword = bcrypt.hashSync(password, 8);
                console.log(hashedPassword); //testi

                //Lisätään käyttäjä tietokantaan
                connection.query('INSERT INTO user(user, pwd, type, name, phone) VALUES (?, ?, ?, ?, ?)', [username, hashedPassword, type, name, phone], (err, results) => {
                    if (err) throw err;

                    console.log("User registered: " + username);
                    messages.push({ msg: 'Register ok' })
                    res.json(messages);
                    //res.redirect('/');
                });
            }
        });
        
    });
}