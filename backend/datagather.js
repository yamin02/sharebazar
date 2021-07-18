
const jsdom = require("jsdom");
const {JSDOM} = jsdom ;
const axios = require('axios')
const utils = require('./utils')
const fs = require('fs')
const path = require('path')
const puppeteer = require('puppeteer');
const model = require('./model');

const chartdata =  async () =>  {
    const date = utils.dateformat(30) ; 
   // console.log(`https://www.dsebd.org/day_end_archive.php?startDate=${date.startday}&endDate=${date.today}&inst=All%20Instrument&archive=data`)
    const response = await axios({
        url : `https://www.dse.com.bd/day_end_archive.php?startDate=${date.startday}&endDate=${date.today}&inst=All%20Instrument&archive=data` ,
        method : 'GET',
    }); 
    const dom2 = new JSDOM(response.data)
    var stontable0 =dom2.window.document.getElementsByClassName("table table-bordered background-white shares-table fixedHeader");
    var i = 0 ;
    var ltp = [] ;
    var jsonall = {} ;
    var stock = stontable0[0].children[1].children[0].children[2].lastElementChild.href.split('name=')[1] ;
    console.log(stontable0[0].children[1].children.length)
    while(stontable0[0].children[1].children[i]){
    var stock0 = stontable0[0].children[1].children[i].children[2].lastElementChild.href.split('name=')[1]
        if(i == stontable0[0].children[1].children.length-1){
            ltp.push((stontable0[0].children[1].children[i].children[3].textContent).replace(/,/g,''));
            jsonall[`${stock}`] = ltp.reverse() ;
        }
        if(stock0 === stock){
                ltp.push((stontable0[0].children[1].children[i].children[3].textContent).replace(/,/g,''));
                i = i+1 ;
        }else{
                jsonall[`${stock}`] = ltp.reverse() ;
                ltp = [] ;
                stock = stontable0[0].children[1].children[i].children[2].lastElementChild.href.split('name=')[1]
        }
    }
    // fs.writeFileSync(path.resolve(__dirname, 'chartdata.json'), JSON.stringify(jsonall,null,2));
    console.log('This is after the write call');
    return jsonall
}
module.exports.chartdata = chartdata

const dataDse = async () =>  {

    // const chartdat = await chartdata(); 
    const response = await axios({
            url : `https://dsebd.org/latest_share_price_scroll_l.php` ,
            method : 'GET',
    }); 
    const dom = new JSDOM(response.data) ;
    const stontable =dom.window.document.getElementsByClassName("table table-bordered background-white shares-table fixedHeader");
    const marketstatus = dom.window.document.getElementsByClassName('time col-md-4 col-sm-3 col-xs-6 pull-right')[0].textContent;
    console.log(`marketstatus : ${marketstatus}`);
    var length = stontable[0].children.length ;
    var arr = [];
    for (var i = 1 ; i <= length-1 ; i++){
        // console.log(price) ;
        var change = ((stontable[0].children[i].children[0].children[7].textContent*100)/(stontable[0].children[i].children[0].children[6].textContent).replace(/,/g, '')).toFixed(2)
        //console.log(change)
        var name = stontable[0].children[i].children[0].children[1].children[0].getAttribute('href').split('=')[1]  ; 
        var json = 
        {
            name : name , 
            ltp :    stontable[0].children[i].children[0].children[2].textContent ,
            high :   stontable[0].children[i].children[0].children[3].textContent ,
            low :    stontable[0].children[i].children[0].children[4].textContent,
            closep : stontable[0].children[i].children[0].children[5].textContent ,
            ycp :    stontable[0].children[i].children[0].children[6].textContent ,
            change : stontable[0].children[i].children[0].children[7].textContent ,
            changeP : change,
            trade :  stontable[0].children[i].children[0].children[8].textContent ,
            value :  stontable[0].children[i].children[0].children[9].textContent ,
            volume : stontable[0].children[i].children[0].children[10].textContent ,
            // last30 : chartdat[name]
        }
        // jsonAll[`${json.name}`] = json;
        arr.push(json)
    }
    //console.log(arr)
    // await model.stockmodel.insertMany(arr)
    // return jsonAll
    return arr
  }
//dataDse();
module.exports.dataDse = dataDse ;


const price90 =  async (name) =>  {
    console.log(name)
    const now = new Date().toLocaleDateString("en-US").split('/')
   // console.log(now)
    // console.log(`https://www.dsebd.org/day_end_archive.php?startDate=2021-06-01&endDate=${now[2]}-${now[0]}-${(now[1] >= 10)? now[1] : `0${now[1]}`}&inst=${name}&archive=data`)
    const response = await axios({
        url : `https://www.dse.com.bd/day_end_archive.php?startDate=2021-06-01&endDate=${now[2]}-${now[0]}-${(now[1] >= 10)? now[1] : `0${now[1]}`}&inst=${name}&archive=data` ,
        method : 'GET',
    }); 
    var arr = []
    const dom2 = new JSDOM(response.data)
   // console.log(response.data)
     var stontable0 =dom2.window.document.getElementsByClassName("table table-bordered background-white shares-table fixedHeader");
    var i = 0 ;
    while(stontable0[0].children[1].children[i]){
        var ltp  = stontable0[0].children[1].children[i].children[3].textContent ;
        var ycp = stontable0[0].children[1].children[i].children[8].textContent ;
        var change = (((ltp -ycp )/ycp)*100).toFixed(2)
        var json = 
        {
            date :   stontable0[0].children[1].children[i].children[1].textContent ,
            ltp:     stontable0[0].children[1].children[i].children[3].textContent ,
            high :   stontable0[0].children[1].children[i].children[4].textContent ,
            low :    stontable0[0].children[1].children[i].children[5].textContent,
            closep : stontable0[0].children[1].children[i].children[7].textContent ,
            ycp :    stontable0[0].children[1].children[i].children[8].textContent ,
            change : change,
            trade :  stontable0[0].children[1].children[i].children[9].textContent ,
            value :  stontable0[0].children[1].children[i].children[10].textContent ,
            volume : stontable0[0].children[1].children[i].children[11].textContent
        }
        arr.push(stontable0[0].children[1].children[i].children[3].textContent)
        var p = stontable0[0].children[1].children[i].children[0].textContent ;
        i=i+1;
    }
    //console.log(arr)
    return arr
}
//price90('ABBANK')
module.exports.price90 = price90 ;

const marketdepth =  async (stockname) =>  {
    const browser = await puppeteer.launch({headless: true});
    const page = await browser.newPage();
    await page.goto('https://dsebd.org/mkt_depth_3.php');

    const loadmpr = await page.evaluate( async (name) => {
        const length =  document.getElementsByClassName('inst selectBox text-center')[0].options.length;
        var arr = []
        for(var i = 0 ; i<=length-1 ; i++){
            var stock = document.getElementsByClassName('inst selectBox text-center')[0].options[i].value;
            arr.push(stock);
        }
       let index = arr.findIndex(rank => rank === name);
       document.getElementsByClassName('inst selectBox text-center')[0].selectedIndex = index ;
       await loadMPR()
    } , stockname );
  
    await page.waitForSelector('.table .table-stripped');
    const getdata = await page.evaluate( async () => {
        // const p = document.getElementsByClassName('table table-stripped')[0].innerText ;
        var buy = 0 ; var sell = 1 ; var price = 0 ; var volume = 1;
        var buyrow_num = document.getElementsByClassName('table table-stripped')[0].children[0].children[0].children[buy].children[0].children[0].children.length 
        var sellrow_num = document.getElementsByClassName('table table-stripped')[0].children[0].children[0].children[sell].children[0].children[0].children.length 
        var buyarr = [];
        //  var i = 2 becos first two row title header
        for(var i = 2 ; i<= buyrow_num-1 ; i=i+1){            
           var p =  document.getElementsByClassName('table table-stripped')[0].children[0].children[0]
           buyarr.push({
             "price" : p.children[buy].children[0].children[0].children[i].children[price].innerText ,
            "volume" : p.children[buy].children[0].children[0].children[i].children[volume].innerText ,
           }) 
        }
        var sellarr = []
        for(var i = 2 ; i<= sellrow_num-1 ; i=i+1){            
            var q =  document.getElementsByClassName('table table-stripped')[0].children[0].children[0]
            sellarr.push({
              "price" : q.children[sell].children[0].children[0].children[i].children[price].innerText ,
             "volume" : q.children[sell].children[0].children[0].children[i].children[volume].innerText ,
            }) 
         }
        return {
            buyarr , sellarr
        }
    });
  //  console.log(getdata) ;
    await browser.close();
    return getdata ;
}
// marketdepth("GREENDELT") ;
module.exports.marketdepth = marketdepth 

const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://yamin02:chandanpura@sharebazar.z3hlw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority' , {
    useNewUrlParser: true ,
    useUnifiedTopology: true ,
    useCreateIndex : true 
}).then(() =>{
    console.log('connected to MONGO DB');
}).catch((error) =>{
    console.log(error);
    console.log("MONGODB Error");
});

const updatedb = async () =>{
    const dsedata =  await dataDse() ;
   // var arr = []
  // var changejson = require('./changestream.json') ;
  //var changejson = {}
    for ( var i of dsedata ){
        const p = await model.stockmodel.updateOne({ "name": `${i.name}` }, {  $set: i  });
        // const p = await model.stockmodel.updateOne({ "name": "ROBI" }, {  $set: {'ltp':'43.8'}  });
        // if(p.nModified){
        //     changejson[`${i.name}`] = i
        // }
    }
     //  fs.writeFileSync(path.resolve(__dirname,'changestream.json'), JSON.stringify(changejson,null,2));
    // return arr
}

module.exports.updatedb = updatedb ;