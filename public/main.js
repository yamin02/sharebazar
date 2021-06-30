var tableget = require('./table');
var eachstockdata = require('./eachstock')
var utils = require('./utils')

const screenurl ={
  '/' : tableget.tableReal ,
  '/home' :tableget.tableReal ,
  '/data/:id' : eachstockdata.eachstock ,
}

const loader = async () =>{
  const content = document.getElementById("contents");
  utils.showloading();

const request = utils.parseurl()
const parseUrl = (request.resource ? `/${request.resource}` : '/' ) + (request.id? '/:id': '')
console.log(parseUrl)
var screen = screenurl[parseUrl];

content.innerHTML = await screen.rend()
await screen.afterRend()
utils.hideloading();
setInterval(async()=>{
  await screen.afterRend()
},6000)
}



window.addEventListener('load' , loader) ;
window.addEventListener('hashchange' , loader);



