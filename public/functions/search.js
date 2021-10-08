var api = require('./api');
var utils = require('./utils')
var table = require('./table')

module.exports.search =  {
repeatRend : ()=>{
    table.tableReal.repeatRend()
},
afterRend : ()=>{
},
rend : ()=>{
  $(".nav-two a").removeClass("navactive");
  $(".fa-search").addClass("navactive");
  $("#BottomSlider").hide();
    $("#sorter").hide();
    $(`    
    <div class="search">
        <textarea id="myInput" type="text" class="searchTerm" placeholder="Search for stock"></textarea>
    </div>`).insertBefore("#stocklist");
    
        $("#myInput").on("keyup", function() {
          var value = $(this).val().toLowerCase();
          $(".flex").filter( function() {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)}
          );
        });
    }
}
