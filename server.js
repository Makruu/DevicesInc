const express = require('express');
const dotenv = require('dotenv');
const session = require('express-session');

dotenv.config({ path: './.env' });

const app = express();
const port = 5000;

//Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({ extended: false }));
//Parse JSON bodies (as sent by API clients)
app.use(express.json());

//Express session
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true
    //cookie: { secure: true }
}))

//Kirjautumisen ja uloskirjautumisen API omassa tiedostossa
require('./routes/login')(app);

//Rekisteröitymisen API omassa tiedostossa
require('./routes/register')(app);

//Laitteen haun/lisäyksen/muokkauksen ja poiston API omassa tiedostossa
require('./routes/device')(app);

//Käyttäjän haun/lisäyksen/muokkauksen ja poiston API omassa tiedostossa
require('./routes/user')(app);

//Kategorioiden haun/lisäyksen/muokkauksen ja poiston API omassa tiedostossa
require('./routes/category')(app);

//Sijaintien haun/lisäyksen/muokkauksen ja poiston API omassa tiedostossa
require('./routes/location')(app);


app.listen(port, () => console.log(`Server started on port ${port}`));