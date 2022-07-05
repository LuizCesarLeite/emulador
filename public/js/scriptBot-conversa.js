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