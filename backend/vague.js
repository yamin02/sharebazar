// This s the chartist way of doing it 

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


/// chart.js
const labels = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
  ];
  const data = {
    labels: labels,
    datasets: [{
      label: 'My First dataset',
      backgroundColor: 'rgb(255, 99, 132)',
      borderColor: 'rgb(255, 99, 132)',
      data: [0, 10, 5, 2, 20, 30, 45],
    }]
  };
  const config = {
    type: 'line',
    data,
    options: {
      responsive:true,
      maintainAspectRatio: false,
      plugins :{
        legend:{display : false}
      },
      scales : {
        xAxis : {
          display:false
        }
      }
    }
  };
  var myChart = new Chart(
    document.getElementById('chart2'),
    config
  );


  


const changeStrm = async () =>{
  //     const arr = await datagather.dataDse()
  //   await model.stockmodel.insertMany(arr);
    const changestream =  model.stockmodel.watch({ fullDocument: "updateLookup"});
    changestream.on('change',next =>{
      var changejson = changes ; 
      changejson[next.fullDocument.name] = next.fullDocument ;
      fs.writeFileSync(path.resolve(__dirname,'changestream.json'), JSON.stringify(changejson,null,2));
      console.log("yakka bun bun CHANGE")
    })
    console.log('done')
      // const p = await model.stockmodel.find({})
      // console.log(p[3].price90)
  }
  //changeStrm()

  
const job = schedule.scheduleJob('03 1 * * *', async function(triggerDate){
    datagather.chartdata();
    console.log(`>>>****>>>This is time ${triggerDate}getting the chart data`);
});



const sortchange = async () =>{ 
  var trow = document.querySelectorAll('.flex');
  for(var i of trow){
      var p = Math.round(-i.querySelectorAll("#data p")[1].innerText.split(",")[1].split("%")[0]) ; 
      i.style.order=`${p}` ;
  }
  return '1' ;
  }


  const dataDse2 = async () =>  {
    // const chartdat = await chartdata(); 
    const response = await axios({
            url : `https://www.amarstock.com/latest-share-price?timestamp=${new Date().getSeconds()*(Math.floor(Math.random()*100))}` ,
            method : 'GET',
    }); 
    // console.log(`https://www.amarstock.com/latest-share-price?timestamp=${new Date().getSeconds()*(Math.floor(Math.random()*100))}`)
    const dom = new JSDOM(response.data) ;
    var marketstatus = dom.window.document.querySelector('.status span').textContent
    console.log(dom.window.document.querySelectorAll('.k-grid-header tbody tr')[2].children[0].textContent)
    const table = dom.window.document.querySelectorAll('.k-grid-header tbody tr')
    var length = table.length;
    console.log(length)
    var arr = [];
    for (var i = 1 ; i <= length-1 ; i++){
        var json = 
        {
            name :   table[i].children[0].textContent , 
            ltp :    table[i].children[1].textContent ,
            high :   table[i].children[3].textContent ,
            low :    table[i].children[4].textContent ,
            closep : table[i].children[5].textContent ,
            ycp :    table[i].children[6].textContent ,
            change : table[i].children[7].textContent,
            changeP: table[i].children[2].textContent,
            trade :  table[i].children[8].textContent  ,
            value :  table[i].children[9].textContent ,
            volume : table[i].children[10].textContent ,
            // last30 : chartdat[name]
        }
        // jsonAll[`${json.name}`] = json;
        arr.push(json)
    }
    console.log(marketstatus)
    // await model.stockmodel.insertMany(arr)
    // return jsonAll
    return {'arr':arr , 'marketStatus':marketstatus} 
}
//dataDse2();
module.exports.dataDse = dataDse ;