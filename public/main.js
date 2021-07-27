var tableget = require('./table');
var eachstockdata = require('./eachstock');
var utils = require('./utils');

const screenurl = {
  '/' : tableget.tableReal ,
  '/home' :tableget.tableReal ,
  '/data/:id' : eachstockdata.eachstock ,
}

const loader = async () => {
  const content = document.getElementById("contents");
  // utils.showloading();
  const request = utils.parseurl()
  const parseUrl = (request.resource ? `/${request.resource}` : '/' ) + (request.id? '/:id': '')
  console.log(parseUrl)

  var screen = screenurl[parseUrl];
  content.innerHTML = await screen.rend()

  const marketStatus = await screen.afterRend()
  utils.hideloading();
  var arr = JSON.parse(localStorage.fav);
  console.log(arr)
  for(var i of arr) {document.getElementById(`fav${i}`).classList.add('checked');}


  if(!(marketStatus == "CLOSED")){
    console.log("Starting to update data");
    document.querySelector('.progress .color').style.display = "";
    setInterval(async()=> {
        // console.log('updating it');
        await screen.repeatRend();
    }, 70*1000)
  }

}

window.addEventListener('load' , loader) ;
window.addEventListener('hashchange' , loader);