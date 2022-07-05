function makeid_num(length) {
    var text = "";
    var possible = "123456789";

    for (var i = 0; i < length; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
}

function makeid_let(length) {
    var text = "";
    var possible = "ABCDEFGHIJKLMNPQRSTUVXWZ";

    for (var i = 0; i < length; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
}

function falaUser_botID() {
    var randomNumber = makeid_num(3) + makeid_let(3);
    return randomNumber;
};

module.exports = falaUser_botID;