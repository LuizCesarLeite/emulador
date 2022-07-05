var textInput
var chat

window.onload = function() {
    textInput = document.getElementById('textInput');
    chat = document.getElementById('chat');
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

// Template dos retornos text
const templateMensagens = (message, from) => `
<div class="from-${from}">
  <div class="message-inner">
    <p>${message}</p>
  </div>
</div>
`;

// Template dos retornos typing
const pauseImage = "http://127.0.0.1:3000/api/v1/bots/zildo/media/typo.png"

const templatePause = (pause, from) => `
<div class="from-${from}">
  <div class="message-inner">
    <p>
    <img src="${pauseImage}">
    </p>
  </div>
</div>
`;

// Template dos retorno imagens
const templateImagens = (nomeImagem, endImagem, from) => `
<div class="from-${from}">
  <div class="message-inner">
    <p>
    ${nomeImagem}
    <img src="${endImagem}" style="height:500; width:700">
    </p>
  </div>
</div>
`;

// Template dos retorno arquivos
const templateArquivo = (nomeArquivo, endArquivo, from) => `
<div class="from-${from}">
  <div class="message-inner">
    <p>
    ${nomeArquivo}
    <img src="${endArquivo}" style="height:500; width:700">
    </p>
  </div>
</div>
`;

// Daqui pra frente, tratamento do Carrosel

// Template pai do Carrossel - o mais "externo"
const templateCarousel = (itens, from) => `
<div class="from-${from}">
  <div class="message-inner">
    <p>
    ${templateItensCarousel(itens)}
    </p>
  </div>
</div>
`;

// Monta os cards do Carrosel - segundo nível
const templateItensCarousel = (itens) => {
    var ret = '';
    ret += '<div id="lista_cards">'
    itens.forEach(item => {
        ret +=
            `
    <p>
    ${templateItemCarousel(item)}
    </p>
  `
    });
    ret += '</div>'
    return ret;
};

// Monta um card do carrossel - terceiro nível
const templateItemCarousel = (item) => `
<div id="um_card">
  <p>
    <img src="${item.picture}" style="height:350; width:250"><br/></br>
    Tit imagem: ${item.title}<br/>
    Subti imagem: ${item.subtitle}<br/>
    ${templateBotoesCarousel(item.buttons)}<br/>
  </p>
</div>
`;

// Monta a lista de botões do carrosel - quarto nível
const templateBotoesCarousel = (botoes) => {
    var ret = ``;
    botoes.forEach(botao => {
        ret +=
            `
  ${templateBotaoCarousel(botao)}
  `
    });
    return ret;
};

// Captura tipo/titulo/subtitulo dos botões - quinto nível
const templateBotaoCarousel = (botao) => `
  Type: ${botao.type}<br/>
  Text: ${botao.text}<br/>
  Title: ${botao.title}<br/>
`;

// FIM do tratamento do Carrosel


// Template final dos retornos "choices"
const templateChoices = (escolhas, tit_quickies, from) => `
<div class="from-${from}">
  <div class="message-inner">
    <p>
    ${tit_quickies} </br> </br>
    ${templateItensChoices(escolhas)}
    </p>
  </div>
</div>
`;

// Lista os botões das choices
const templateItensChoices = (escolhas) => {
    var ret = '';
    escolhas.forEach(escolha => {
        ret +=
            `
    ${templateItemChoices(escolha)}
  `
    });
    return ret;
};

// Monta um botão
const templateItemChoices = (escolha) => `
    Tit botao: ${escolha.title}<br/>
    Payload botao: ${escolha.payload}<br/>
`;
// FIM do tratamento das "choices"

// Tratamento do Dropdown

// Monta o Dropdown
const templateDropdown = (lista, tit_drop, placeholder_drop, from) => `
<div class="from-${from}">
  <div class="message-inner">
    <p>
    ${tit_drop}</br>
    ${placeholder_drop} </br> </br>
    ${templateItensDropdown(lista)}
    </p>
  </div>
</div>
`;

// Monta a lista de opções
const templateItensDropdown = (lista) => {
    var ret = '';
    lista.forEach(item => {
        ret +=
            `
${templateItemDropdown(item)}
`
    });
    return ret;
};

// Monta a a opção
const templateItemDropdown = (item) => `
Tit drop: ${item.label}<br/>
Payload drop: ${item.value}<br/>
`;

// Fim do tratamento do Dropdown

// cria os elementos do chat usando seus respectivos templates
const injetaTemplatenoChat = (template) => {
    const div = document.createElement('div');
    div.innerHTML = template;

    chat.appendChild(div);
    chat.scrollTop = chat.scrollHeight;
};

// Feel the magic :-)
const pegaMensagemBPInsertaTemplate = async() => {
    const uri = "http://localhost:4682/falauser/";

    const payload = {
        "text": textInput.value
    };

    fetch(uri, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload),
        })
        .then(function(retorno1) {
            return retorno1.json();
        })
        .then(function(retorno2) {
            console.log(JSON.stringify(retorno2));
            var lista = retorno2.responses;
            for (var i = 0; i < lista.length; i++) {
                element = lista[i];

                if (element.type == "text") {
                    const template = templateMensagens(element.text, 'bp');
                    injetaTemplatenoChat(template);

                } else if (element.type == 'typing') {
                    const template = templatePause(element.typing, 'bp');
                    injetaTemplatenoChat(template);

                } else if (element.type == 'image') {
                    var nomeImagem = element.title;
                    var endImagem = element.image;
                    const template = templateImagens(nomeImagem, endImagem, 'bp');
                    injetaTemplatenoChat(template);

                } else if (element.type == 'file') {
                    var nomeArquivo = element.title;
                    var endArquivo = element.file;
                    const template = templateArquivo(nomeArquivo, endArquivo, 'bp');
                    injetaTemplatenoChat(template);

                } else if (element.type == 'carousel') {
                    var lista_carousel = element.elements;
                    const template = templateCarousel(lista_carousel, 'bp');
                    injetaTemplatenoChat(template);

                } else if (element.component == 'QuickReplies') {
                    var tit_quickies = element.wrapped.text;
                    var lista_quickies = element.quick_replies;
                    const template = templateChoices(lista_quickies, tit_quickies, 'bp');
                    injetaTemplatenoChat(template);

                } else if (element.component == 'Dropdown') {
                    var tit_drop = element.message;
                    var placeholder_drop = element.buttonText;
                    var lista_drop = element.options;
                    const template = templateDropdown(lista_drop, tit_drop, placeholder_drop, 'bp');
                    injetaTemplatenoChat(template);
                }
            };
        })
        .catch(function(ovoPodre) {
            console.log(ovoPodre);
        });
};