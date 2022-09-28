var textInput
var chat
var sessionID

// gera sessionID
function makeSessionID(length) {
    var text = "";
    var possible = "ABCDEFGHIJKLMNPQRSTUVXWZabcdefghijklmnopqrstuvxz0123456789";

    for (var i = 0; i < length; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
}

// Fala alguma coisa, mano!
window.onload = function() {
    textInput = document.getElementById('textInput');
    chat = document.getElementById('chat');
    sessionID = makeSessionID(7);

    textInput.addEventListener('keydown', (event) => {
        if (event.keyCode === 13 && textInput.value) {
            tdb(textInput.value);
            textInput.value = '';
        }
    });
};

const tdb = (textDigitado) => {
    pegaMensagemBPInsertaTemplate(textDigitado);
    const template = templateMensagensUser(textDigitado, 'user');
    injetaTemplatenoChat(template);
}

// cria os elementos do chat usando seus respectivos templates
const injetaTemplatenoChat = (template) => {
    const div = document.createElement('div');
    div.innerHTML = template;

    chat.appendChild(div);
    chat.scrollTop = chat.scrollHeight;
};

// Feel the magic :-)
const pegaMensagemBPInsertaTemplate = async(textEn_viado) => {
    const uri = "http://localhost:4682/falauser/";

    const payload = {
        "text": textEn_viado,
        "sessionID": sessionID,
    };

    fetch(uri, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload),
        })
        .then(function(retorno1) {
            // console.log('retorno1', retorno1);
            return retorno1.json();
        })
        .then(function(retorno2) {
            // console.log('retorno2', retorno2);
            console.log(JSON.stringify(retorno2));
            var lista = retorno2.responses;

            for (var i = 0; i < lista.length; i++) {
                element = lista[i];
                
            if (!lista) {
                console.log('rolou lista não')
                return
            };

            if (element.type == 'demorinha') {
                const template = templateDelay('bp');
                injetaTemplatenoChat(template);

            } else if (element.type == 'text') {
                const template = templateMensagens(element.text, 'bp');
                injetaTemplatenoChat(template);

            } else if (element.type == 'image') {
                var nomeImagem = element.title;
                var endImagem = element.image;
                const template = templateImagens(nomeImagem, endImagem, 'bp');
                injetaTemplatenoChat(template);

            } else if (element.type == 'audio') {
                var nomeAudio = element.title;
                var endAudio = element.audio;
                const template = templateAudio(nomeAudio, endAudio, 'bp');
                injetaTemplatenoChat(template);

            } else if (element.type == 'video') {
                var nomeVideo = element.title;
                var endVideo = element.video;
                const template = templateVideo(nomeVideo, endVideo, 'bp');
                injetaTemplatenoChat(template);

            } else if (element.type == 'file') {
                var nomeArquivo = element.title;
                var endArquivo = element.file;
                const template = templateArquivo(nomeArquivo, endArquivo, 'bp');
                injetaTemplatenoChat(template);

            } else if (element.type == 'location') {
                var localNome = element.title;
                var localEnder = element.address;
                var localLatid = element.latitude;
                var localLongit = element.longitude;
                const template = templateLocaliza(localNome, localEnder, localLatid, localLongit, 'bp');
                injetaTemplatenoChat(template);

            } else if (element.type == 'dropdown') {
                var messag_drop = element.message;
                var botao_drop = element.buttonText;
                var placeHolder_drop = element.placeholderText;
                const template = templateDrop({
                    messag_drop: messag_drop,
                    botao_drop: botao_drop,
                    placeHolder_drop: placeHolder_drop,
                    maisOptions: element.options
                }, 'bp');
                injetaTemplatenoChat(template);

            } else if (element.type == 'single-choice') {
                var tit_choice = element.text;
                var placeHolder_choice = element.dropdownPlaceholder;
                const template = templateChoice({
                    tit_choice: tit_choice,
                    placeHolder_choice: placeHolder_choice,
                    choices_choice: element.choices
                }, 'bp');
                injetaTemplatenoChat(template);

            } else if (element.type == 'card') {
                var tit_card = element.title;
                var subtit_card = element.subtitle;
                var imag_card = element.image;
                const template = templateCard({
                    tit_card: tit_card,
                    subtit_card: subtit_card,
                    imag_card: imag_card,
                    actions: element.actions
                }, 'bp');
                injetaTemplatenoChat(template);

            } else if (element.type == 'carousel') {
                var carroCardTit = element.items.title;
                var carroCardSubtit = element.items.subtitle;
                var carroCardImag = element.items.image;
                var carroCarBotoes = element.items.actions.action;
                const template = templateCarousel(carroCardTit, carroCardSubtit, carroCardImag, carroCarBotoes, 'bp');
                injetaTemplatenoChat(template);
            }
        };
    })
        .catch(function(ovoPodre) {
            console.log('ovoPodre', ovoPodre);
        });
};