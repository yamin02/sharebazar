var api = require('./api');
var utils = require('./utils')
var table = require('./table')

module.exports.stars =  {
repeatRend : ()=>{
    table.tableReal.repeatRend()
},
afterRend : ()=>{
},
rend : ()=>{
    $(".nav-two a").removeClass("navactive");
    $(".fa-star").addClass("navactive");
    var row = document.getElementsByClassName("name");
    if(localStorage.fav){
    var arr = JSON.parse(localStorage.fav);
    for(var i of row){
        var stonk = i.children[0].innerHTML.toUpperCase()
        if (arr.includes(stonk)){
             i.parentElement.style.display = "" ;
        // i.parentElement.querySelector('.chart').__chartist__.update();
        } else {
            i.parentElement.style.display ="none" ;
                }
            }
    }else{
    $("#contents").html('<p>Add to starred list by touching the star button</p>')
        }
    }
}
