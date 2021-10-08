var tableget = require('./functions/table');
var eachstockdata = require('./functions/eachstock');
var utils = require('./functions/utils');
var search = require('./functions/search');
var star = require("./functions/starred");
var livechat = require("./functions/livechat")

const screenurl = {
  '/' : tableget.tableReal ,
  '/home' :tableget.tableReal ,
  '/eachstock/:id' : eachstockdata.eachstock ,
  '/search' : search.search ,
  '/starred' : star.stars ,
  '/chat' :  livechat.stars , 
}

const loader = async () => {
  utils.showloading();
  var marketStatus = utils.marketStatus();
  const request = utils.parseurl()
  const parseUrl = (request.resource ? `/${request.resource}` : '/' ) + (request.id? '/:id': '')
  var screen = screenurl[parseUrl];
  await screen.rend();
  await screen.afterRend()
  utils.hideloading();
  
  if(!(marketStatus == "CLOSED")){
    console.log("Starting to update data");
    $(".progress").css("display", "");
    setInterval(async()=> {
        await screen.repeatRend();
    }, 70*1000)
  }
} 
window.addEventListener('load', loader) ;
window.addEventListener('hashchange' , loader);
