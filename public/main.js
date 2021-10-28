var tableget = require('./functions/table');
var eachstockdata = require('./functions/eachstock');
var utils = require('./functions/utils');
var search = require('./functions/search');
var star = require("./functions/starred");
var livechat = require("./functions/livechat")
var api = require("./functions/api")

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
  const request = utils.parseurl();
  // var marketStatus = await utils.marketStatus();
  const parseUrl = (request.resource ? `/${request.resource}` : '/' ) + (request.id? '/:id': '')
  var screen = screenurl[parseUrl];
  await screen.rend();
  await screen.afterRend();
  utils.hideloading();
  var marketStatus = $("#status001").length ?  $("#status001").html().split("<br>")[2]  : await utils.marketStatus();
  console.log(marketStatus)
  if(!(marketStatus == "Closed")){
    console.log("Starting to update data");
    $(".progress").show();
    setInterval(async()=> {
        utils.dsetoLocalstorage();
        utils.marketStatus();
        await screen.repeatRend();
    }, 70*1000)
  }
} 

window.addEventListener('load', async function () { 
  utils.showloading();
  var data  = await utils.dsetoLocalstorage();
  await utils.marketStatus();
  await loader(data);
}) ;

window.addEventListener('hashchange' , loader);
