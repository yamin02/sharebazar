const { set } = require('mongoose');
var api = require('./api');
var utils = require('./utils');
// var Chart = require('chart.js')

const tab =  {
    repeatRend : async () => {
        // const data0 = await api.getupdate() ;
        // var data = data0['dsedata']
        var data = JSON.parse(localStorage.getItem('dsedata'))
        for(var i in data){
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
                <p class="value">Value: ${(data[`${i}`].value.replace(/,/g,'') * 0.1).toFixed(3)} cr</p>`

            trow.querySelector('#data').innerHTML = `
            <p class="${color}">${data[`${i}`].ltp}</p><p class="${color}1 change">${changeval} , ${data[`${i}`].changeP}%</p>`
        }
    } ,
    
    afterRend : async (data0) =>  {
        // const data0 = await api.getpreload();
        // sessionStorage.setItem('dsedata',data0['dsedata']);
        // var data = data0['dsedata']
        // var data = JSON.parse(localStorage.getItem('dsedata'))
        
        // var data = (data0) ? ( JSON.parse(data0) ): JSON.parse(localStorage.getItem('dsedata')) ;
        console.log("THIS IS AFTER REND DNDND")
        if(data0){
            console.log('trueeee');
            var data = JSON.parse(data0) 
        }else {
            var data = JSON.parse(localStorage.getItem('dsedata'))
        }
        // console.log(JSON.parse(data0))
        console.log(data)
        $("#stocklist").html('')
        var count = 0
        for (var i in data)
        {
            var sectr =  utils.whichSector(data[i].name);
            var changeval = (data[`${i}`].change < 0)? `${data[`${i}`].change}` : `+${data[`${i}`].change}`
            var color = data[`${i}`].changeP < 0 ? 'red' : 'green' ;
            if(data[`${i}`].changeP==0){color ="blue"}
            var volume = data[`${i}`].volume.replace(/,/g,'') > 99999 ? `${Math.floor(data[`${i}`].volume.replace(/,/g,'')/1000)}K` : data[`${i}`].volume ;

            $("#stocklist").append(`
            <div class="flex" id="${data[i].name}">
            <div id="name" class="name" style="cursor: pointer;" onclick="window.location='#/eachstock/${data[i].name}'">
                <p>${data[i].name}</p>
                <p class="trade">Trade: ${data[`${i}`].trade}</p>
                <p class="volume">Volume: ${volume}</p>
                <p class="value">Value: ${(data[`${i}`].value.replace(/,/g,'') * 0.1).toFixed(3)} cr</p>
                <p class="sector" style="display:none">${sectr}</p>
            </div>
            <div class="chart" id="chart${count}" onclick="alert('This is a chart made from last 15 days')"></div>
            
            <div id="icon"><i id="fav${data[i].name}" class="fas fa-star ${localStorage.fav? (JSON.parse(localStorage.fav).includes(data[i].name)?'checked':'' ):''}" onclick="fav('${data[i].name}')"></i></div>
            <div id="data">
                <p class="${color}">${data[`${i}`].ltp}</p>
                <p class="${color}1 change">${changeval} , ${data[`${i}`].changeP}%</p>
            </div>
            </div>`)
       
        var myarr = Array(data[i].last60.length).fill().map((x,i)=>i)
       
        var datachart =  { labels: myarr ,  series: [{className:`stroke${color}`,  meta:"OK", data: utils.removeZero(data[i].last60) } ]}
          
        new Chartist.Line(`#chart${count}`, datachart , 
        {
            showArea: true,
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
        },

rend : async () => {
    $("#BottomSlider").show();
    $(".nav-two a").removeClass("navactive");
    $(".fa-house-user").addClass("navactive");
    $("#contents").html(`
    <div id="stocklist"></div>`)
  }

}

module.exports.tableReal = tab



