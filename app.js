const express = require('express');
const ejs = require('ejs');
const app = express();

var falaUser = require("./routes/falaUser");

app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.static('public'));
app.use("/falauser", falaUser);

app.get('/', function(req, res) {
    res.render('pages/index');
});

app.listen(4682, () => {
    console.log('Rodando fino na porta 4682');
});