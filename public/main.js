// var api = require('./api');
var tableget = require('./table');
var eachstock = require('./eachstock')

const loader = () =>{
    console.log('kolla')

var action = document.location.hash.split('/')[1]
var params = ''
console.log(action)
switch(action) {
    case 'home':
        var screen = tableget.tableReal
      break;
    case 'data':
         var screen = eachstock.eachstock
         params = document.location.hash.split('/')[2]
      break;
    default:
      var screen = tableget.tableReal
}

const content = document.getElementById("contents");
content.innerHTML = screen.rend()
screen.afterRend(params); 
}


window.addEventListener('load' , loader);
window.addEventListener('hashchange' , loader);
