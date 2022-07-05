const express = require('express');
const ejs = require('ejs');
const falaUser_botID = require('./routes/falaUser_botID');
const app = express();

var falaUser = require("./routes/falaUser");

app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.static('public'));
app.use("/falauser", falaUser);

app.get('/', function(req, res) {
    // var id = req.query['id'];
    // if (id == undefined) {
    // res.redirect(`?id=${falaUser_botID()}`);
    // } else {
    // res.render('pages/index', (err, html) => { console.log('callback do render') });
    res.render('pages/index');
    // }
});


// app.get('/', function(req, res) {
//     res.render('pages/index');
// })

app.listen(4682, () => {
    console.log('Rodando na porta 4682');
});