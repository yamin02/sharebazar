const utils = require('./utils')
var sectordata = require('../sectordata.json');

$('#closePopupBtn').on('click', function () {     
    document.getElementById('popup').style.display = 'none';
    document.querySelector('.popup-overlay').style.display = 'none';
});

(async () => {
    await utils.dsetoLocalstorage();
    await utils.marketStatus();
})();

$('#TopNavs').html(`<nav class="topnav nav-one">
<a href="/#/home"><img src="./resource/apple-icon.png" style="width: 25px;"></a>
<a id="page-name">Home</a>
<a id="dsex-info-navbar"></a>
<a id="marketstatus"></a>
</nav>
<div class="progress"></div>`
)
$('body').append(`   
 <nav id="BottomSlider">
      <a onclick="sortAlphabet()" class="fas fa-sort-alpha-down navactive"><br><span>Alphabetic</span></a>
      <a onclick="sortchange('changeDec')" class="far fa-caret-square-up"><br><span>Top Change</span></a>
      <a onclick="sortchange('changeAsc')" class="fas fa-caret-square-down"><br><span>Top Loser</span></a>
      <a onclick="sortchange('valueAsc')" class="fas fa-sort-numeric-up-alt"><br><span>Top Value</span></a>
      <a onclick="SectorWise()" class="fas fa-industry"><br><span>Sector</span></a>
      <a  class="fas fa-industry"><br><span>PE ratio</span></a>
      <a><br><span></span></a>
</nav>`)


$("#sorter").on("click",function(){
$("#BottomSlider").toggleClass("show")
.find("a").toggleClass("show");
})





window.secwise = (sector) => {
    console.log('sector');
    var row = document.getElementsByClassName("name");
    var arr = sectordata[sector] ;
    for(var i of row) {
        var stonk = i.children[0].innerHTML.toUpperCase()
        if (arr.includes(stonk)){
            i.parentElement.style.display = "" ;
            i.parentElement.querySelector('.chart').__chartist__.update();
        } else {
            i.parentElement.style.display ="none" ;
        }
    }
}


window.sectordisplay = (show) => {
    var secwise = document.getElementsByClassName('sectrwise');
        secwise[0].style.display = show ;
        secwise[1].style.display = show ;
        secwise[2].style.display = show ;
}

window.allstock = function (event){
    $('.sectrwise').css('display', 'none');
    $(".active0").removeClass("active0");
    $("#allstock").addClass("active0");
    $('.flex').show()
return 0
}

window.secclick= function (event) {
        $(".active0").removeClass("active0");
        event.target.classList.add('active0');
        $('.sectrwise').css('display', 'flex');
    }

window.fav = (id) => {
    console.log("fav pressed")
    var fav0 =  document.getElementById(`fav${id}`)
    
    var favstock = localStorage.fav ? JSON.parse(localStorage.fav) : [];
    if( fav0.classList.contains('checked')) {
        var index = favstock.indexOf(id);
        favstock.splice(index, 1);
        fav0.classList.remove('checked');
    } else {
        fav0.classList.add('checked');
        var favstock = localStorage.fav ? JSON.parse(localStorage.fav) : [];
        favstock.push(id) ;
    }
    localStorage.fav = JSON.stringify(favstock);
}

$('.sorting').hide();
$('.fa-sort-amount-up').click(function(){
    $('.sorting').toggle();
})

$('#myInput').focus(function (e) { 
    console.log('on focus')
    console.log(window.screen.height);
    var initialHeight = window.screen.height
    document.documentElement.style.setProperty('overflow', 'auto')
    const metaViewport = document.querySelector('meta[name=viewport]')
    metaViewport.setAttribute('content', 'height=' + initialHeight + 'px, width=device-width, initial-scale=1.0')
    
});

window.selectFunc = function()  {
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

const pp = function (a,b,order) { 
    switch (order) {
        case 'changeAlphabet':
            var p1 = parseFloat(b.querySelector('.name').children[0].innerText);
            var p2 = parseFloat(a.querySelector('.name').children[0].innerText);
            break;
        case 'changeDec':
            var p1 = parseFloat(a.querySelector('.change').innerText.split(",")[1].replace(/%/g,""));
            var p2 = parseFloat(b.querySelector('.change').innerText.split(",")[1].replace(/%/g,""));
            break;
        case 'changeAsc':
            var p1 = parseFloat(b.querySelector('.change').innerText.split(",")[1].replace(/%/g,""));
            var p2 = parseFloat(a.querySelector('.change').innerText.split(",")[1].replace(/%/g,""));
            break;
        case 'valueAsc':
            var p1 = parseInt(a.querySelector('.value').innerText.split(":")[1].replace(/cr/g,""));
            var p2 = parseInt(b.querySelector('.value').innerText.split(":")[1].replace(/cr/g,""));
            break;
        case 'tradeAsc':
            var p1 = parseInt(a.querySelector('.trade').innerText.split(":")[1].replace(/,/g,""));
            var p2 = parseInt(b.querySelector('.trade').innerText.split(":")[1].replace(/,/g,""));
            break;
        case 'volumeAsc':
            var p1 = parseInt(a.querySelector('.volume').innerText.split(":")[1].replace(/,/g,"").replace(/K/g,"000"));``
            var p2 = parseInt(b.querySelector('.volume').innerText.split(":")[1].replace(/,/g,"").replace(/K/g,"000"));
            break;
    }
    return [p1,p2]
}
 
window.sortchange = async (criteria) =>{ 
    utils.deleteSectorTitle();
    $('.flex').sort(function(a, b) {
        [p1,p2] = pp(a,b,criteria);
        return (p1 > p2) ?  - 1 : 1}).appendTo('#stocklist');
}

window.sortAlphabet = async function(){
    utils.deleteSectorTitle();
    $('.flex').sort(function(a, b) {
        if ($(a).find('.name').children()[0].innerText < $(b).find('.name').children()[0].innerText) {
          return -1;
        } else {
          return 1;
        }
      }).appendTo('#stocklist');
}

window.SectorWise = function (){ 
    sortAlphabet();
    utils.SectorNav();
    utils.SectorSort();
    utils.SectorSort();
    utils.SectorTitle();
}

window.scrollSector = function (div) {
    $('html, body').animate({
        scrollTop: $(`#${div}`).offset().top - 200
    }, 2000);
}


window.closeOverlay = function (param) { 
        $(".overlay").removeClass("active").html("");
 }