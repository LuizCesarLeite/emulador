//////////////////////////////////////////////////////////////////////////////////////////////////////////
// Template bp typing
//
// const pauseImage = "http://localhost:3000/api/v1/bots/features/media/typing.gif"

const templateDelay = function(from) {
  var demorinha = element.valor;
  console.log('templates - linha 8 || ' + demorinha);
  var ret = '';
  ret = `
    <div id="teclando">
      <div class="from-${from}">
        <div class="message-inner">
          <p>
            <img src="http://localhost:3000/api/v1/bots/features/media/teclanda.gif">
          </p>
        </div>
      </div>
    </div>
  `;
  return ret;
};

/////////////////////////////////////////////////////////////////////////////////////////////////////////
// Template texto Bot
//
const templateMensagens = function(message, from) {
  var ret = '';
  ret = `
    <div id="margarida">
      <div class="from-${from}">
        <div class="message-inner">
          <p>
            ${message}
          </p>
        </div>
      </div>
    <div>
    `;
  return ret;
};


/////////////////////////////////////////////////////////////////////////////////////////////////////////
// Template texto User
//
const templateMensagensUser = function(message) {
  var ret = '';
  ret = `
    <div class="from-user">
      <div class="message-inner">
        <p>
          ${message}
        </p>
      </div>
    </div>
  `;
  return ret;
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Template imagens
//
const templateImagens = function(nomeImagem, endImagem, from) {
  var ret = '';
  ret = `
    <div class="from-${from}">
      <div id="um_card">
        <div class="message-inner">
          <p>
            ${nomeImagem}</br></br>
            <img src="${endImagem}" style="height:350; width:350">
          </p>
        </div>
      </div>
    </div>
  `;
  return ret;
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Template audio
//
const templateAudio = function(nomeAudio, endAudio, from) {

  var ret = '';
  ret = `
  <div class="from-${from}">
    <div class="message-inner">
      <p>
        ${nomeAudio}</br></br>
        <audio controls="controls">
        <source src="${endAudio}" type="audio/mp3" />
        Desculpe: seu navegador não suporta HTML5, logo não conseguimos te mandar esse audio :-(
        </audio>
      </p>
    </div>
  </div>
`;
  return ret;
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Template video
//
const templateVideo = function(nomeVideo, endVideo, from) {
  var ret = '';
  ret = `
  <div class="from-${from}">
    <div class="message-inner">
      <p>
        ${nomeVideo}</br></br>
        <video width="350" controls="controls">
        <source src="${endVideo}" type="video/mp4">
        Desculpe: seu navegador não suporta HTML5, logo não conseguimos te mandar esse video :-(
        </video>
      </p>
    </div>
  </div>
  `;
  return ret;
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Template dos arquivos
//
const templateArquivo = function(nomeArquivo, endArquivo, from) {
  var ret = '';
  ret = `
  <div class="from-${from}">
    <div class="message-inner">
      <p>
        ${nomeArquivo}</br>
        <a href="${endArquivo}">Um arquivo qualquer</a> 
      </p>
    </div>
  </div>
  `;
  return ret;
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Template da localização
// https://developers.google.com/maps/documentation/embed/embedding-map
// https://snazzymaps.com/
//

const templateLocaliza = function(localNome, localEnder, localLatid, localLongit, from) {
  var ret = '';
  ret = `
  <div class="from-${from}">
    <div class="message-inner">
      <p>
        Nome: ${localNome}</br>
        Endereço: ${localEnder}</br></br>
        <iframe
          width="350"
          height="450"
          frameborder="0" style="border:0"
          referrerpolicy="no-referrer-when-downgrade"
          mapId="578e70af1c55ef9e"
          src="https://www.google.com/maps/embed/v1/place?key=_CHAVE_AQUI_CARAIO_&q=Conjunto+dos+Bancários&center=${localLongit},${localLatid}&zoom=14"
        >
        </iframe>
      </p>
    </div>
  </div>
  `;
  return ret;
};

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Template dos choices
//

// Monta uma escolha
const templateItem = function(choices) {
  var _id_ = makeSessionID(5);
  var objectId = `escolhas_${_id_}`
  var ret = '';
  ret = `
  <input type="button" name="${objectId}" id="${objectId}" value="${choices.value}" /><br/>
  `;
  return ret;
};

// Monta a lista de escolhas
const templateItemsEscolhas = (botao_escolha) => {
  var ret_ = '';
  botao_escolha.forEach(choices => {
    ret_ +=
      `
      ${templateItem(choices)}
      `
  });
  return ret_;
};

// Monta o componente todo
const templateChoice = function(chicotInsano, from) {
  var ret = '';
  ret = `
    <div class="from-${from}">
      <div class="message-inner">
        <p>
          ${chicotInsano.tit_choice}<br/><br/>
          ${templateItemsEscolhas(chicotInsano.choices_choice)}<br/>
        </p>
      </div>
    </div>
  `;
  return ret;
};

/////////////////////////////////////////////////////////////////////////////////////////////////////////
// Template drop
// https://freefrontend.com/css-dropdown-menus/
//

// Monta as opções do drop
const templateOptDrop = function(options) {
  var ret = '';
  ret = `
  <option value=${options.value}>${options.label}</option>
  `;
  return ret;
};

// Monta a lista de opções do drop
const templateMaisOptsDrop = (maisOptions, botao_drop) => {
  var _id_ = makeSessionID(5);
  var objectId = `dropdown_${_id_}`
  var ret_ = `<select name="${objectId}" id="${objectId}"><option disabled selected>${element.placeholderText}</option>`;
  maisOptions.forEach(options => {
    ret_ +=
      `
      ${templateOptDrop(options)}
      `
  });
  ret_ += `</select>`;
  ret_ += `<br/>`;
  ret_ += `${templateConfirmaDrop(objectId, botao_drop)}`;
  return ret_;
};

// Monta o drop
const templateDrop = function(chicotAtomico, from) {
  var ret = '';
  ret = `
    <div class="from-${from}">
      <div class="message-inner">
        <p>
          ${chicotAtomico.messag_drop}<br/> </br>
          ${templateMaisOptsDrop(chicotAtomico.maisOptions, chicotAtomico.botao_drop)}<br/>
        </p>
      </div>
    </div>
  `;
  return ret;
};

// Lógica do enter
const templateConfirmaDrop = (dropName, butaum_caption) => {
  var _id_ = makeSessionID(5);
  var objectId = `button_${_id_}`
  var ret_ = `<input type="button" name="${objectId}" id="${objectId}" value="${butaum_caption}" onClick="confirmaDropClick('${dropName}')"/>`;
  return ret_;
};

// Enter!
const confirmaDropClick = (dropName) => {
  var select = document.getElementById(dropName);
  // var selectedValue = select.options[select.selectedIndex].value;
  var selectedValue = select.options[select.selectedIndex].label;
  console.log(selectedValue);
  tdb(selectedValue);
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Template card
//

// Monta um botão
const templateBotaoCard = function(actions) {
  var _id_ = makeSessionID(5);
  var objectId = `escolhas_${_id_}`
  var ret = '';
  ret = `
  <input type="button" name="${objectId}" id="${objectId}" value="${actions.title}" /><br/>
  `;
  return ret;
};

// Monta a lista de botões
const templateBotoesCard = (botoes_card) => {
  var ret_ = '';
  botoes_card.forEach(actions => {
    ret_ +=
      `
      ${templateBotaoCard(actions)}
      `
  });
  return ret_;
};

// Monta o card com a imagem
const templateCard = function(chicotEletriko, from) {
  var ret = '';
  ret = `
    <div class="from-${from}">
      <div id="um_card">
        <div class="message-inner">
          <p>
            <img src="${chicotEletriko.imag_card}" <br/></br>
            Tit imagem: ${chicotEletriko.tit_card}<br/>
            Subti imagem: ${chicotEletriko.subtit_card}<br/>
            ${templateBotoesCard(chicotEletriko.actions)}<br/>
          </p>
        </div>
      </div>
    </div>
  `;
  return ret;
};

/////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Template carrossel
//

const templateCarousel = function(items) {
  var ret = '';
  if (items.actions.action == 'Say something') {
      ret = `
  Title: ${items.actions.title}<br/>
  Text: ${items.actions.text}<br/>
  `;

  } else if (items.actions.action == 'Open URL') {
      ret = `
  Title: ${items.actions.title}<br/>
  Text: ${items.actions.url}<br/>
  `;

  } else if (items.actions.action == 'Postback') {
      ret = `
  Title: ${items.actions.title}<br/>
  Text: ${items.actions.payload}<br/>
  `;
  }
  return ret;
};

// Monta a lista de botões do card
const templateBotoesCardCarrossel = (actions) => {
var ret_ = ``;
  actions.forEach(items => {
  ret_ +=
    `
    ${templateBotaoCardCarrossel(items)}
    `
});
return ret_;
};

// monta o card
const templateCardCarrossel = (chicotEnergiko, from) => `
<div class="from-${from}">
<div id="um_card">
  <div class="message-inner">
    <p>
      <img src="${chicotEnergiko.carroCardImag}" <br/></br>
      Tit imagem: ${chicotEnergiko.carroCardTit}<br/>
      Subti imagem: ${chicotEnergiko.carroCardSubtit}<br/>
      ${templateBotoesCardCarrossel(chicotEnergiko.actions)}<br/>
    </p>
  </div>
</div>
</div>  
`;