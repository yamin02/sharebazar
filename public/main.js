var tableget = require('./table');
var eachstockdata = require('./eachstock');
var utils = require('./utils');
var api = require('./api');

const screenurl = {
  '/' : tableget.tableReal ,
  '/home' :tableget.tableReal ,
  '/data/:id' : eachstockdata.eachstock ,
}


const secwise = (sector) => {
  console.log('sector');
  var row = document.getElementsByClassName("name");
  var sectordata = require('./sectordata.json');
  var arr = sectordata[sector] ;
  for(var i of row) {
      var stonk = i.children[0].innerHTML.toUpperCase()
      if (arr.includes(stonk)) {
          i.parentElement.style.display = "" ;
      } else {
          i.parentElement.style.display ="none" ;
      }
   }
}

const loader = async () => {
  const content = document.getElementById("contents");
  utils.showloading();
  const request = utils.parseurl()
  const parseUrl = (request.resource ? `/${request.resource}` : '/' ) + (request.id? '/:id': '')
  console.log(parseUrl)
  var screen = screenurl[parseUrl];
  content.innerHTML = await screen.rend()
  const dsedata = await screen.afterRend()
  utils.hideloading();
  var arr = JSON.parse(localStorage.fav);
  console.log(arr)
  for(var i of arr) {
      document.getElementById(`fav${i}`).classList.add('checked');
  }
  await screen.repeatRend(dsedata);
  // setInterval(async()=>{
  //   await screen.repeatRend();
  // },10*1000)
}

window.addEventListener('load' , loader) ;
window.addEventListener('hashchange' , loader);