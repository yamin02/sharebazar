const { set } = require('mongoose');
var api = require('./api');
const tab =  {
    repeatRend : async () => {
     // const data =  await api.realtime();
        const data = await api.getpreload() ;
        for(var i in data){
            //  console.log(data[i].name)
            var trow = document.getElementById(`${data[i].name}`) 
            var volume = data[`${i}`].volume.replace(/,/g,'') > 99999 ? `${Math.floor(data[`${i}`].volume.replace(/,/g,'')/1000)}K` : data[`${i}`].volume ;
            var changeval = (data[`${i}`].change < 0)? `${data[`${i}`].change}` : `+${data[`${i}`].change}`
            var color = data[`${i}`].changeP < 0 ? 'red' : 'green' ;
            if(trow.querySelector(`#data p`).innerText < data[`${i}`].ltp){
                trow.classList.add('animate');
                console.log('yakka bun bun');
                // setTimeout(()=>{trow.classList.remove('animate');},5000)
            }
           trow.querySelector('#name').innerHTML = `
                <p>${data[i].name}</p>
                <p>Trade: ${data[`${i}`].trade}</p>
                <p>Volume: ${volume}</p>
                <p>Value: ${(data[`${i}`].value * 0.1).toFixed(3)} cr</p>`

            trow.querySelector('#data').innerHTML = `
            <p class="${color}">${data[`${i}`].ltp}</p><p style="color:${color};">${changeval} , ${data[`${i}`].changeP}%</p>`
        }
    } ,

    afterRend : async () =>  {
        const stocklist = document.getElementById('stocklist');
        console.log('running after render') ;
   //     const data = await api.getits();
        const data = await api.getpreload() ;
        // console.log(data)
        // const chartdata = await api.getchartdata() ;
        // console.log(chartdata)
        stocklist.innerHTML = "" ;
        var count = 0
        for (var i in data)
        {
            var trow = document.createElement('div');
            trow.classList.add('flex') ;
            trow.id = data[i].name ; 
            var changeval = (data[`${i}`].change < 0)? `${data[`${i}`].change}` : `+${data[`${i}`].change}`
            var color = data[`${i}`].changeP < 0 ? 'red' : 'green' ;
            if(data[`${i}`].changeP==0){color ="blue"}
            stocklist.appendChild(trow);
            var volume = data[`${i}`].volume.replace(/,/g,'') > 99999 ? `${Math.floor(data[`${i}`].volume.replace(/,/g,'')/1000)}K` : data[`${i}`].volume ;
            trow.innerHTML = `
            <div id="name" class="name"><p>${data[i].name}</p>
                <p>Trade: ${data[`${i}`].trade}</p>
                <p>Volume: ${volume}</p>
                <p>Value: ${(data[`${i}`].value * 0.1).toFixed(3)} cr</p>
            </div>
            <div id="chart${count}" class="chart"></div>
            <div id="icon"><i id="fav${data[i].name}" class="fa fa-star" onclick="fav('${data[i].name}')"></i></div>
            <div id="data">
                <p class="${color}">${data[`${i}`].ltp}</p><p style="color:${color};">${changeval} , ${data[`${i}`].changeP}%</p>
            </div>`

            var myarr = Array(data[i].last30.length).fill().map((x,i)=>i)
            var datachart =  { labels: myarr ,  series: [{className:`stroke${color}`,  meta:"OK", data: data[i].last30 } ]}
            new Chartist.Line(`#chart${count}`, datachart , {
                width: 140,
                showPoint:false,
                axisX:{  
                    showGrid : false ,
                    showLabel : false , 
                    offset : 15,
                    labelInterpolationFnc: function(value, index) {
                        return index % 10 === 0 ? value : null;
                      }
                } ,
                axisY : {
                    showGrid : true ,
                    showLabel : true ,
                    }
                });
                count = count +1 ;
            }
     
        const selectFunc = () => {
           var input = document.getElementById("myInput").value.toUpperCase();
            var row = document.getElementsByClassName("name");
            for(var i of row){
                var stonk = i.innerHTML.toUpperCase()
                if (stonk.indexOf(input)>-1){
                    i.parentElement.style.display = "" ;
                } else {
                    i.parentElement.style.display ="none" ;
                }
            }
        }
        if(document.getElementById("myInput").value){selectFunc()}
        document.getElementById("myInput").addEventListener("input",selectFunc);

        const secwise = (sector) => {
            console.log('sector');
            var row = document.getElementsByClassName("name");
            var sectordata = require('./sectordata.json');
            var arr = sectordata[sector] ;
            for(var i of row) {
                var stonk = i.children[0].innerHTML.toUpperCase()
                if (arr.includes(stonk)){
                    i.parentElement.style.display = "" ;
                } else {
                    i.parentElement.style.display ="none" ;
                }
              }
            }
        },

rend : () => {
    return `
    <input type="text" id="myInput" placeholder="Search for Stocks.." title="Type in a name">
    <div class="topnav">
        <a class="active0" onclick="allstock(event)" id="allstock">All Stocks</a>
        <a onclick="starred(event)">Starred</a>
        <a onclick="secclick(event)">Sector-wise</a>
    </div>
    <p class="spacing"></p>
        <div class="sectrwise">
            <a onclick="secwise('bank')">BANK</a>
            <a onclick="secwise('cement')">CEMENT</a>
            <a onclick="secwise('ceramic')">CERAMIC</a>
            <a onclick="secwise('engr')">ENGNR</a>
            <a onclick="secwise('fin')">FIN</a>
            <a onclick="secwise('food')">FOOD</a>
        </div>
        <div class="sectrwise">
            <a onclick="secwise('power')">POWER</a>
            <a onclick="secwise('ins')">INSUR</a>
            <a onclick="secwise('it')">IT</a>
            <a onclick="secwise('jute')">JUTE</a>
            <a onclick="secwise('mf')">MF</a>
            <a onclick="secwise('paper')">PAPER</a>
            <a onclick="secwise('pharma')">PHARMA</a>
        </div>
        <div class="sectrwise">
            <a onclick="secwise('service')">SERVICE</a>
            <a onclick="secwise('tannery')">TANNERY</a>
            <a onclick="secwise('telecom')">TELECOM</a>
            <a onclick="secwise('tex')">TEX</a>
            <a onclick="secwise('travel')">TRAVEL</a>
            <a onclick="secwise('others')">Others</a>
        </div>
    <p class="spacing"></p>
    <div id="stocklist">The first principle of stock trade is Patience <br>\t\t ---Warren Buffet 
        <div id="sector"></div>
    </div>`
  }
}

module.exports.tableReal = tab



