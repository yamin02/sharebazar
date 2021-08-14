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





<div class="chart" id="chart${count}"></div>

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



// const sortArr = (points,decending)=>{
//     var oldpoint = points.slice(0);
//     var result = [];
//     console.log(decending)
//     points.sort((a,b) => decending=='true'? b-a : a-b );
//     for(var i = 0 ; i<=100 ; i++){
//         result.push(oldpoint.indexOf(points[i]))
//     }
//     return result
// }

// const sort = async (criteria) =>{ 
//     var points = []

//     var query = criteria.split('/')[0];
//     var pos = criteria.split('/')[1];
//     var trow = document.querySelectorAll('.flex');
//     switch(query) {
//         case 'change':
//             for(var i of trow){
//                 var p = i.querySelector(`.change`).innerText.split(",")[1].split("%")[0] ; 
//                 i.style.order = "";
//                 points.push(p)
//             }
//           break;
//         case 'trade':
//             for(var i of trow){
//                 var p = i.querySelector(".trade").innerText.split(":")[1].replace(/,/g,''); 
//                 i.style.order = "";
//                 points.push(p)
//             }
//           break;
//           case 'value':
//             for(var i of trow){
//                 var p = i.querySelector(".value").innerText.split(":")[1].replace(/,/g,'').split("cr")[0]; 
//                 i.style.order = "";
//                 points.push(p)
//             }
//           break;
//           case 'volume':
//             for(var i of trow){
//                 var p = i.querySelector(".volume").innerText.split(":")[1].replace(/,/g,'').replace('K','000'); 
//                 i.style.order = "";
//                 points.push(p)
//             }
//           break;
//       }
//     var result = sortArr(points,pos)
//     var num = 100
//     for(var op of result){
//         trow[op].style.order = `-${num}`;
//         trow[op].style.display = "";
//         trow[op].querySelector('.chart').__chartist__.update();
//         num = num - 1;
//     }
//     return '1' ;
// }



// const sort2 = async (criteria) =>{ 
//     var query = criteria.split('/')[0];
//     var pos = criteria.split('/')[1];
//     var trow = document.querySelectorAll('.flex');
//     for(var i of trow){
//         var p = Math.round(-1*pos*i.querySelector(`.${query}`).innerText.split(":")[1]*100) ; 
//         i.style.order=`${p}` ;
//         // i.style.display = ""
//     }
//     return '1' ;
//     }


Chart.defaults.global.legend.display = false;
var ctx = document.getElementById('myChart').getContext('2d');
var chart = new Chart(ctx, {
	// The type of chart we want to create
	type: 'line', // also try bar or other graph types

	// The data for our dataset
	data: {
		labels: ["Jun 2016", "Jul 2016", "Aug 2016", "Sep 2016", "Oct 2016", "Nov 2016", "Dec 2016", "Jan 2017", "Feb 2017", "Mar 2017", "Apr 2017", "May 2017"],
		// Information about the dataset
    datasets: [{
			label: "Rainfall",
			backgroundColor: 'lightblue',
			borderColor: 'royalblue',
			data: [186.4, 39.8, 66.8, 66.4, 40.6, 55.2, 77.4, 69.8, 57.8, 76, 110.8, 142.6],
		}]
	},

	// Configuration options
        options: {
        layout: {
        padding: 0,
        },
            legend: {
                position: 'bottom',
            },
            title: {
                display: false,
                text: 'Precipitation in Toronto'
            },
            scales: {
                yAxes: [{
                    scaleLabel: {
                        display: false,
                        labelString: 'Precipitation in mm'
                    }
                }],
                xAxes: [{display: false,
            ticks: {display: false},
                    scaleLabel: {
                        display: false,
                        labelString: 'Month of the Year',
                    }
                }]
            }
        }
    });


    window.sort = async (criteria) =>{ 
      var topChange = localStorage.getItem(criteria);
      topChange = topChange.split(",")
      var num = 100;
      var trow = document.querySelectorAll('.flex');
      for(var i of trow){i.style.order="0"}
      for(var op of topChange) {
          trow[op].style.order = `-${num}`;
          trow[op].style.display = "";
          trow[op].querySelector('.chart').__chartist__.update();
          num = num - 1;
      }
      return '1' ;
    }



    <div class="chart">
      <canvas id="chart${count}" width="95" height="50"></canvas>
  </div>
    var ctx = document.getElementById(`chart${count}`);
    var chart = new Chart(ctx, {
      type: 'line', 
      data: {
         labels: Array(data[i].last60.length).fill().map((x,i)=>i),
        datasets: [{
          backgroundColor: `light${color}`,
          borderColor: `${color}`,
           data: data[i].last60,
                pointRadius: 0,
        }]
      },
    
        options: {
            events: [],
            animation: false,
            layout: {
            padding: 0,
            },
                title: {
                    display: false,
                },
                scales: {
                    yAxes: [{
                        scaleLabel: {
                            display: false,
                        },
                        ticks: {
                            fontSize: 10
                        }
                    }],
                    xAxes: [{
                        display: false,
                        ticks: {display: false},
                        scaleLabel: {
                                display: false,
                        }
                    }],
    
                }
            }
        });