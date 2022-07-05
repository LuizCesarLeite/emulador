// Template dos retornos typing
const pauseImage = "http://127.0.0.1:3000/api/v1/bots/zildo/media/typo.png"

// Template dos retornos text
const templateMensagens = (message, from) => `
<div class="from-${from}">
  <div class="message-inner">
    <p>${message}</p>
  </div>
</div>
`;

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

/////////////////////////////////////////////////
// tratamento do Carrosel //////////////////////////////////
/////////////////////////////////////////////////////////

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

/////////////////////////////////////////////////////////
// Template final dos retornos "choices" ////////////////////////
//////////////////////////////////////////////////////////

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

//////////////////////////////////////////////////////////////
// Tratamento do Dropdown ////////////////////////////////////
/////////////////////////////////////////////////////////////

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