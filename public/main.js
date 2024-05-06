var tableget = require('./functions/table');
var utils = require('./functions/utils');
var search = require('./functions/search');
var star = require("./functions/starred");
var tweet = require("./functions/forum")
var api = require("./functions/api")
var mainpage =require("./functions/mainpage")

const screenurl = {
  '/' : mainpage.infotab ,
  '/home' :  mainpage.infotab ,
  '/stocks' : tableget.tableReal ,
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



// Service worker. code found from  PWAbuilder website
// This is the "Offline copy of pages" service worker

const CACHE = "pwabuilder-offline";

importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js');

self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});

workbox.routing.registerRoute(
  new RegExp('/*'),
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: CACHE
  })
);