const express = require('express');
const router = express.Router();
const axios = require('axios');
const falaUser_botID = require('./falaUser_botID');

router.get('/', function(req, res, next) {
    console.log(req.headers);
    console.log(req.query);
    res.json({
        fruta: 'lichia'
    });
});

// router.get('/id/:id', function(req, res, next) {
//     console.log(req.headers);
//     res.json({
//         fruta: 'lichia'
//     });
// });

router.post('/', function(req, res, next) {
    console.log(req.body);
    console.log(req.query);
    // var falaUser_botURL `= 'http://localhost:3000/api/v1/bots/features/converse/MyNiggas/'
    var falaUser_botURL = `http://localhost:3000/api/v1/bots/features/converse/${req.body.sessionID}/`
        // falaUser_botURL = `http://localhost:3000/api/v1/bots/features/converse/123abc/`
    req.body = { text: req.body.text }
    axios
    // .post(falaUser_botID(), req.body)
        .post(falaUser_botURL, req.body)
        .then((dataBot) => {
            console.log(dataBot.data.responses);
            res.json({
                "responses": dataBot.data.responses
            });
        })
        .catch((error) => {
            console.error(error);
            res.status(500).json(error);
        })
});

module.exports = router;