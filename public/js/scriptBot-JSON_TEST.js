var textInput
var chat
var sessionID

window.onload = function() {
    textInput = document.getElementById('textInput');
    chat = document.getElementById('chat');
    sessionID = makeSessionID(7);
    // Fala alguma coisa, mano!
    textInput.addEventListener('keydown', (event) => {
        if (event.keyCode === 13 && textInput.value) {
            pegaMensagemBPInsertaTemplate(textInput.value);

            const template = templateMensagens(textInput.value, 'user');
            injetaTemplatenoChat(template);

            textInput.value = '';
        }
    });
}

// gera sessionID
function makeSessionID(length) {
    var text = "";
    var possible = "ABCDEFGHIJKLMNPQRSTUVXWZabcdefghijklmnopqrstuvxz0123456789";

    for (var i = 0; i < length; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
}

// Template dos retornos text
const templateMensagens = (message, from) => `
<div class="from-${from}">
  <div class="message-inner">
    <p>${message}</p>
  </div>
</div>
`;

//Monta um botão do card

const templateBotaoCard = function(action) {
    var ret = '';
    if (action.action == 'Say something') {
        ret = `
        Title: ${action.title}<br/>
        Text: ${action.text}<br/>
        `;

    } else if (action.action == 'Open URL') {
        ret = `
        Title: ${action.title}<br/>
        Text: ${action.url}<br/>
        `;

    } else if (action.action == 'Postback') {
        ret = `
        Title: ${action.title}<br/>
        Text: ${action.payload}<br/>
        `;
    }
    return ret;
};

// Monta a lista de botões do card
const templateBotoesCard = (actions) => {
    var ret_ = ``;
    actions.forEach(action => {
        ret_ +=
            `
  ${templateBotaoCard(action)}
  `
    });
    return ret_;
};

// monta o card
const templateCard = (chicotEletriko, from) => `
    <div id="um_card">
    <p>
        <img src="${chicotEletriko.imag_card}" alt="${from}" style="height:350; width:250"><br/></br>
        Tit imagem: ${chicotEletriko.tit_card}<br/>
        Subti imagem: ${chicotEletriko.subtit_card}<br/>
        ${templateBotoesCard(chicotEletriko.actions)}<br/>
    </p>
</div>
`;

// cria os elementos do chat usando seus respectivos templates
const injetaTemplatenoChat = (template) => {
    const div = document.createElement('div');
    div.innerHTML = template;

    chat.appendChild(div);
    chat.scrollTop = chat.scrollHeight;
};

function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split('&');
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split('=');
        if (decodeURIComponent(pair[0]) == variable) {
            console.log('Query variable %s = %s', variable, decodeURIComponent(pair[1]));
            return decodeURIComponent(pair[1]);
        }
    }
    console.log('Query variable %s not found', variable);
}

// Feel the magic :-)
const pegaMensagemBPInsertaTemplate = async() => {
    const uri = "http://localhost:4682/falauser/";

    const payload = {
        "text": textInput.value,
        // "sessionID": getQueryVariable('id')
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
            console.log('retorno1', retorno1);
            return retorno1.json();
        })
        .then(function(retorno2) {
            console.log('retorno2', retorno2);
            console.log(JSON.stringify(retorno2));
            var lista = retorno2.responses;
            for (var i = 0; i < lista.length; i++) {
                element = lista[i];

                if (element.type == 'text') {
                    const template = templateMensagens(element.text, 'bp');
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
                }
            };
        })
        .catch(function(ovoPodre) {
            console.log('ovoPodre', ovoPodre);
        });
};