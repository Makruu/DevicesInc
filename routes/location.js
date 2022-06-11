//Luodaan SQL-yhteys
const connection = require('../connection');

module.exports = function (app) {

    app.route('/api/location')
        //Sijaintien haku API
        .get(function (req, res) {
            var { loggedin, id } = req.session;

            if (req.session && loggedin && id) {
                //Haetaan kaikki sijainnit
                connection.query("SELECT l.id AS id, CONCAT(s.name, ', ', l.shelf) AS name FROM location l JOIN site s ON l.site_id = s.id", function (err, result) {
                    if (err) throw err;

                    res.json([{ loggedin: true }, result]);
                });
            } else {
                res.json([{ loggedin: false }]);
                //res.redirect("http://localhost:3000");
            }
        })
}