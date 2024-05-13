var api = require('./api');
var utils = require('./utils')
// var table = require('./table')

module.exports.stars =  {
repeatRend : ()=>{
    // table.tableReal.repeatRend()
},

afterRend : ()=>{
    $(".nav-two a").removeClass("navactive");
    $(".fa-star").addClass("navactive");
    
    if(localStorage.fav){
        var arr = JSON.parse(localStorage.fav);
        var dsedata = JSON.parse(localStorage.dsedata) ;
        var localstoragedatam  = []
        for(var i of dsedata){
            if(arr.includes(i.name)){
                localstoragedatam.push(i);
                
            }
        }
        console.log(localstoragedatam)
        table.tableReal.afterRend(JSON.stringify(localstoragedatam))
    }
    else{
    $("#contents").html('<p>Add to starred list by touching the star button</p>')
        }

},
rend : ()=>{

    $("#BottomSlider").show();
    $(".nav-two a").removeClass("navactive");
    $(".fa-star").addClass("navactive");
   
    $("#contents").html(`
    <div id="stocklist"></div>`)

    }
}