const { set } = require('mongoose');
var api = require('./api');
var utils = require('./utils');

const tab =  {
    repeatRend : async () => {
        const data0 = await api.getupdate() ;
        var data = data0['dsedata']
        for(var i in data){
            //  console.log(data[i].name)
            var trow = document.getElementById(`${data[i].name}`) 
            if(trow.classList.contains('highlight-red')){trow.classList.remove('highlight-red')} 
            if(trow.classList.contains('highlight-green')){trow.classList.remove('highlight-green')}
            var volume = data[`${i}`].volume.replace(/,/g,'') > 99999 ? `${Math.floor(data[`${i}`].volume.replace(/,/g,'')/1000)}K` : data[`${i}`].volume ;
            var changeval = (data[`${i}`].change < 0)? `${data[`${i}`].change}` : `+${data[`${i}`].change}`
            var color = data[`${i}`].changeP < 0 ? 'red' : 'green' ;
            if(data[`${i}`].changeP==0){color ="blue"}
           
            if(trow.querySelector(`#data p`).innerText < data[`${i}`].ltp){
                trow.classList.add('highlight-green');
                // console.log('yakka bun bun');
                // setTimeout(()=>{trow.classList.remove('animate');},5000)
            }
            if(trow.querySelector(`#data p`).innerText > data[`${i}`].ltp){
                trow.classList.add('highlight-red');
                console.log('yakka bun bun');
                // setTimeout(()=>{trow.classList.remove('animate');},5000)
            }

           trow.querySelector('#name').innerHTML = `
                <p>${data[i].name}</p>
                <p class="trade">Trade: ${data[`${i}`].trade}</p>
                <p class="volume">Volume: ${volume}</p>
                <p class="value">Value: ${(data[`${i}`].value * 0.1).toFixed(3)} cr</p>`

            trow.querySelector('#data').innerHTML = `
            <p class="${color}">${data[`${i}`].ltp}</p><p class="${color}1 change">${changeval} , ${data[`${i}`].changeP}%</p>`
        }
        utils.topsetLocalstorage(data0.sort_change,data0.sort_change_asc,data0.sort_trade,data0.sort_value,data0.sort_volume);
    } ,
    
    afterRend : async () =>  {
        var status = await api.dsex();
        console.log('GOT DSEX DATA');
        var marketStatus = status['marketStatus'].toUpperCase()
        if(marketStatus == "CLOSED"){
            document.getElementById('marketstatus').innerHTML=`<i class="fa fa-times-circle"></i><br>Market<br>Closed`,
            document.getElementById('marketstatus').style.color ="#e4ae19"
        }else{
            document.getElementById('marketstatus').innerHTML=`<i class="fa fa-check-circle"></i><br>Market<br>${marketStatus}`
            document.getElementById('marketstatus').style.color = "#0ff153"
        }
        const stocklist = document.getElementById('stocklist');
        const data0 = await api.getpreload() ;
        var data = data0['dsedata']
        stocklist.innerHTML = "" ;

        console.log(data)
        var count = 0
        for (var i in data)
        {
            var trow = document.createElement('div');
            trow.classList.add('flex') ;
            trow.id = data[i].name ; 
            stocklist.appendChild(trow);

            var changeval = (data[`${i}`].change < 0)? `${data[`${i}`].change}` : `+${data[`${i}`].change}`
            var color = data[`${i}`].changeP < 0 ? 'red' : 'green' ;
            if(data[`${i}`].changeP==0){color ="blue"}
            var volume = data[`${i}`].volume.replace(/,/g,'') > 99999 ? `${Math.floor(data[`${i}`].volume.replace(/,/g,'')/1000)}K` : data[`${i}`].volume ;
            
            trow.innerHTML = `
            <div id="name" class="name"><p>${data[i].name}</p>
                <p class="trade">Trade: ${data[`${i}`].trade}</p>
                <p class="volume">Volume: ${volume}</p>
                <p class="value">Value: ${(data[`${i}`].value * 0.1).toFixed(3)} cr</p>
            </div>
            <div class="chart" id="chart${count}"></div>
            <div id="icon"><i id="fav${data[i].name}" class="fas fa-star" onclick="fav('${data[i].name}')"></i></div>
            <div id="data">
                <p class="${color}">${data[`${i}`].ltp}</p><p class="${color}1 change">${changeval} , ${data[`${i}`].changeP}%</p>
            </div>`
     
            var myarr = Array(data[i].last60.length).fill().map((x,i)=>i)
            var datachart =  { labels: myarr ,  series: [{className:`stroke${color}`,  meta:"OK", data: data[i].last60 } ]}
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


        if(document.getElementById("myInput").value){utils.selectFunc()}
        document.getElementById("myInput").addEventListener("input",utils.selectFunc);
        utils.topsetLocalstorage(data0.sort_change,data0.sort_change_asc,data0.sort_trade,data0.sort_value,data0.sort_volume);
        return marketStatus;
        },

rend : async () => {
    return `
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
    <div id="stocklist"></div>`
  }

}

module.exports.tableReal = tab



