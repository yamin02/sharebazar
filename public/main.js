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
  content.innerHTML = await screen.rend();

  var marketStatus = await screen.afterRend()
  utils.hideloading();
  var arr = JSON.parse(localStorage.fav);
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


window.sort = async (criteria) =>{ 
  var topChange = localStorage.getItem(criteria);
  topChange = topChange.split(",")
  var num = 100;
  var trow = document.querySelectorAll('.flex');
  for(var i of trow){i.style.order="0"}
  for(var op of topChange) {
      trow[op].style.order = `-${num}`;
      trow[op].style.display = "";
      trow[op].querySelector('.chart').__chartist__.update();
      num = num - 1;
  }
  return '1' ;
}