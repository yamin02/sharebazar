var utils = require('./functions/utils');
var search = require('./functions/search');
var star = require("./functions/starred");
var api = require("./functions/api")

var mainpage =require("./pages/mainpage")
var tweet = require("./pages/forum")
var stocks = require('./pages/stock');


const screenurl = {
  '/' : mainpage.infotab ,
  '/home' :  mainpage.infotab ,
  '/stocks' : stocks.tableReal ,
  '/search' : search.search ,
  '/starred' : star.stars ,
  '/forum' :  tweet.forum , 
}


const loader = async () => {
  utils.showloading();
  const request = utils.parseurl();
  var marketStatus = await utils.marketStatus();
  const parseUrl = (request.resource ? `/${request.resource}` : '/' ) + (request.id? '/:id': '')
  var screen = screenurl[parseUrl];
  // Navs and other things added in prerender.js
  await screen.rend();
  await screen.afterRend();
  utils.hideloading();

  // var marketStatus = $("#status001").length ?  $("#status001").html().split("<br>")[2]  : await utils.marketStatus();
  // console.log(marketStatus)
  // if(!(marketStatus == "Closed")){
  //   console.log("Starting to update data");
  //   $(".progress").show();
  //   setInterval(async()=> {
  //       utils.dsetoLocalstorage();
  //       utils.marketStatus();
  //       await screen.repeatRend();
  //   }, 70*1000)
  // }

} 

window.addEventListener('load', async function () { 
  utils.showloading();
  var data  = await utils.dsetoLocalstorage();
  await utils.marketStatus();
  await loader();
}) ;

window.addEventListener('hashchange' , loader);


