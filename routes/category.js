//Luodaan SQL-yhteys
const connection = require('../connection');

module.exports = function (app) {

    app.route('/api/category')
        //Kategorioiden haku API
        .get(function (req, res) {
            var { loggedin, id } = req.session;

            if (req.session && loggedin && id) {
                //Haetaan kaikki kategoriat
                connection.query('SELECT * FROM category', function (err, result) {
                    if (err) throw err;

                    res.json([{ loggedin: true }, result]);
                });
            } else {
                res.json([{ loggedin: false }]);
                //res.redirect("http://localhost:3000");
            }
        })
}