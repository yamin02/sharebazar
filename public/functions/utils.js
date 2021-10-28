const { model } = require("mongoose");
var sectorjson = require('../sectordata.json')
var api = require('./api')

module.exports.parseurl = () => {
    const url = document.location.hash.toLowerCase();
    const request = url.split('/');
    return {
        resource: request[1],
        id: request[2] 
    }
}

module.exports.showloading = () =>{ 
    $(".overlay").addClass("active")
    .html('<div class="loadingio-spinner-disk-li8jvstzdq8"><div class="ldio-tur5clbaxg"><div><div></div><div></div></div></div></div>')
}

module.exports.hideloading = () =>{
    console.log('loading ends');
    $(".overlay").removeClass("active").html("");
}


module.exports.marketStatus = async () =>{
    var status = await api.dsex();
    [p1,p2,p3] = (status['marketStatus'].toUpperCase() == "CLOSED") ? ["Closed","far fa-times-circle","rgb(96, 95, 93)"] : [`${status['marketStatus']}`,"far fa-check-circle", "#175500"]
    var p4 = (status["dsexChange"] > 0) ? 'green' : 'red' ;
    $("#dsex-info-navbar")
        .html(`${status["dsex"]} <i class="fas fa-caret-up"></i><br> ${status["dsexChange"]},${status["dsexChangeP"]}%`)
        .css('color', p4);
    $("#marketstatus")
    .html(`
        <i class="${p2}"></i>
        <i id="status001"><br>Market<br>${p1}</i>`)
    .css('color',`${p3}`)
    return p1;
}

module.exports.selectFunc = () => {
  var input = document.getElementById("myInput").value.toUpperCase();
   var row = document.getElementsByClassName("name");
   for(var i of row){
       var stonk = i.innerHTML.toUpperCase()
       if (stonk.indexOf(input)>-1){
           i.parentElement.style.display = "" ;
           i.parentElement.querySelector('.chart').__chartist__.update();
       } else {
           i.parentElement.style.display ="none" ;
       }
   }
}


module.exports.whichSector = function(stockname){
    for(var i in sectorjson){
        if(sectorjson[i].includes(stockname.toUpperCase())){
            return i
        }
    }
}

// Remove zero from the chart datas. replace zero with previous day values
module.exports.removeZero = function(priceArray){
    if(priceArray.includes("0")){
        var index = priceArray.indexOf("0");
        priceArray[index] =priceArray[index-1] ;
        var index2 = priceArray.indexOf("0");
        priceArray[index2] =priceArray[index2-1] ;  //done twice because often has twice data with zero
        return priceArray
    } else {
        return priceArray
    }
}

module.exports.SectorNav = function () { 
    $('body').css('padding-top','150px');
    $(`<div class="topnav scrollmenu">
    <a onclick="scrollSector('Bank')">Bank</a>
    <a onclick="scrollSector('Cement')">Cement</a>
    <a onclick="scrollSector('Ceramic')">Ceramic</a>
    <a onclick="scrollSector('Engineering')">Engineering</a>
    <a onclick="scrollSector('Finance')">Finance</a>
    <a onclick="scrollSector('Food')">Food</a>
    <a onclick="scrollSector('Power')">Power</a>
    <a onclick="scrollSector('General-Insurance')">Insurance</a>  
    <a onclick="scrollSector('Life-Insurance')">Life-Ins</a>
    <a onclick="scrollSector('IT')">IT</a>  
    <a onclick="scrollSector('Jute')">Jute</a>
    <a onclick="scrollSector('Mutual-Fund')">Mutual-Fund</a>
    <a onclick="scrollSector('Paper')">Paper</a>
    <a onclick="scrollSector('Pharmaceutical')">Pharma</a>
    <a onclick="scrollSector('Service')">Service</a>
    <a onclick="scrollSector('Tannery')">Tannery</a>
    <a onclick="scrollSector('Textile')">Textile</a>
    <a onclick="scrollSector('Telecom')">Telecom</a>
    <a onclick="scrollSector('Travel')">Travel</a>
    <a onclick="scrollSector('Others')" >Others</a>
        </div>`).appendTo($("#TopNavs"));
}

module.exports.SectorSort = function () {  
    $('.flex').sort(function(a, b) {
        [p1,p2] = [$(a).find('.sector').html().toUpperCase() , $(b).find('.sector').html().toUpperCase() ]
        return (p1 > p2) ?  1 : -1}).appendTo('#stocklist');
}

module.exports.SectorTitle = function () {
    var sectorjson = require('../sectordata.json');
    for(var i in sectorjson){
        $(`<p id="${i}" class='flex sector-title'>${i}</p>`).insertBefore($(`#${sectorjson[i][0]}`));  
    }
}

module.exports.deleteSectorTitle = function () {
    $('body').css('padding-top','105px');
    $(".sector-title").remove()
    $(".scrollmenu").remove();
}

module.exports.dsetoLocalstorage = async function () {
    const data0 = await api.getpreload()
    localStorage.setItem('dsedata', JSON.stringify(data0['dsedata']));
    return JSON.stringify(data0['dsedata']) ;
}


