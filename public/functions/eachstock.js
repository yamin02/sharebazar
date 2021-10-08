var api = require('./api');
var utils = require('./utils')

module.exports.eachstock =  {
    afterRend : async ()=>{
        const params = utils.parseurl().id
        const tbody = document.getElementById('tbody');
        $('#stocknameh3').innerHTML = params.toUpperCase();
        const data = await api.price90(`${params}`);
        tbody.innerHTML = "" ;
            for (var i in data){
        const trow = document.createElement('tr');
        var change = data[`${i}`].changeP;
       // console.log(change)
        var color = change < 0 ? 'red' : 'green' ;
        if(change==0){color ="blue"}
        trow.style.color = `${color}`
        trow.innerHTML = `<td class="name">${data[`${i}`].date}</td>
                        <td>${data[`${i}`].ltp}</td>
                        <td>${data[`${i}`].value}</td>
                        <td>${data[`${i}`].volume}</td>
                        <td>${data[`${i}`].changeP}</td>`
        tbody.appendChild(trow);
        }
    },

rend : ()=>{
$("#contents").html(`
<div class="flex">    
<div id="name">
    <p>ROBI</p>
    <p>Trade:1000 , Volume : 45,000</p>
    <p>Value:87 crore</p><p>Robi</p>
</div>
<div id="data">
    <p>44.6</p><p>+12.43 , 9.00%</p>
</div>
</div>
<div>
    <button>Life</button>
</div>
<div id="chart">
    <!-- <div id="controls"></div>
    <div id="chartdiv"></div> -->
    <div id="controls" style="width: 100%; overflow: hidden;">
    </div>
    <div id="chartdiv"></div>
</div>
<div class="basic-info">
    <span>High<br>34.2</span>
    <span>Low<br>32</span>
    <span>YCP<br>23</span>
    <span>Trade<br>12344</span>
    <span>Value<br>0.45 cr</span>
    <span>Volume<br>10,1000</span>
</div>
<br>
<div class="bottom-nav">
    <span onclick="marketdepth(data.marketdepth)">Market<br>Depth</span>
    <span onclick="fundamental(sdfdfdf)">Fundamental<br>Info</span>
    <span onclick="technical(dfdf)">Techinical<br>Info</span>
    <span onclick="news(kollalife)">News</span>
    <span onclick="comments(comma)">Comments</span> 
</div>
<div id="details-info">
</div>
<script src="./functions/amCharts2.js"></script>
`
    );
    }
}

 