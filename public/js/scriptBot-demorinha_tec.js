// var demorinha = element.valor;
// console.log(demorinha);

// var div1 = document.getElementById('teclando');
// div1.style.display = 'block';
// setTimeout(function() { 
//   div1.style.display = 'none'; 
// }, demorinha);

// var div2 = document.getElementById('margarida');
// div2.style.display = 'none';
// setTimeout(function() { 
//   div2.style.display = 'block'; 
// }, demorinha);

//////////////////////////////////////////////////////////////////////////////////

// document.querySelector('chat').addEventListener('load', function(){
  // var div1 = document.getElementById('teclando');
  // div1.style.display = 'block';
  // setTimeout(function() { 
  //   div1.style.display = 'none'; 
  // }, demorinha);

  // var div2 = document.getElementById('margarida');
  // div2.style.display = 'none';
  // setTimeout(function() { 
  //   div2.style.display = 'block'; 
  // }, demorinha);
// });









/////////////////////////////////////////////////////////////////////////////////

// var target = document.querySelector('teclando');

// // create an observer instance
// var observer = new MutationObserver(function(mutations) {
//     mutations.forEach(function(mutation) {
//         console.log(mutation.type);
//     });
// });

// // configuration of the observer:
// var config = { attributes: true, childList: true, characterData: true }

// // pass in the target node, as well as the observer options
// observer.observe(target, config);









///////////////////////////////////////////////////////////////////////////////////
// var demorinha = element.valor;
// console.log('scriptBot-demorinha - linha 51 || ' + demorinha)
// https://stackoverflow.com/questions/34863788/how-to-check-if-an-element-has-been-loaded-on-a-page-before-running-a-script

function waitForElement(querySelector, timeout){
  return new Promise((resolve, reject)=>{
    var timer = false;
    if(document.querySelectorAll(querySelector).length) return resolve();
    const observer = new MutationObserver(()=>{
      if(document.querySelectorAll(querySelector).length){
        observer.disconnect();
        if(timer !== false) clearTimeout(timer);
        return resolve();
      }
    });
    observer.observe(document.body, {
      childList: true, 
      subtree: true
    });
    if(timeout) timer = setTimeout(()=>{
      observer.disconnect();
      reject();
    }, timeout);
  });
}

waitForElement("#teclando", 8000000).then(function(){
  var div1 = document.getElementById('teclando');
  div1.style.display = 'block';
  setTimeout(function() { 
    div1.style.display = 'none'; 
  }, 500);

  console.log('#teclando')
}).catch(()=>{
  console.log("Carregou foi nada...");
});


function waitForOtherElement(querySelector, timeout){
  return new Promise((resolve, reject)=>{
      var timer = false;
      if(document.querySelectorAll(querySelector).length) return resolve();
      const newObserver = new MutationObserver(()=>{
      if(document.querySelectorAll(querySelector).length){
          newObserver.disconnect();
          if(timer !== false) clearTimeout(timer);
          return resolve();
      }
      });
      newObserver.observe(document.body, {
      childList: true, 
      subtree: true
      });
      if(timeout) timer = setTimeout(()=>{
      newObserver.disconnect();
      reject();
      }, timeout);
  });
}

waitForOtherElement("#margarida", 8000000)
.then(function(){
  var div2 = document.getElementById('margarida');
  div2.style.display = 'none';
  setTimeout(function() { 
    div2.style.display = 'block'; 
  }, 500);

  console.log('#margarida')
}).catch(()=>{
  console.log("Carregou foi nada...");
});
