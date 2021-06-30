
const jsdom = require("jsdom");
const {JSDOM} = jsdom ;
const axios = require('axios')

const callstocks = async () =>  {
          const response = await axios({
              url : `https://dsebd.org/latest_share_price_scroll_l.php` ,
              method : 'GET',
          }); 
          const dom = new JSDOM(response.data)
          
        const stontable =dom.window.document.getElementsByClassName("table table-bordered background-white shares-table fixedHeader");
        // console.log(stontable[0].children[1].children[0].children[1].children[0].getAttribute('href').split('=')[1])

        var jsonAll = {}
        for (var i = 1 ; i <=372 ; i++){
            var change = ((stontable[0].children[i].children[0].children[7].textContent*100)/stontable[0].children[i].children[0].children[2].textContent).toFixed(2)
            //console.log(change)
            var json = 
            {
                name :  stontable[0].children[i].children[0].children[1].children[0].getAttribute('href').split('=')[1] , 
                ltp :    stontable[0].children[i].children[0].children[2].textContent ,
                high :   stontable[0].children[i].children[0].children[3].textContent ,
                low :    stontable[0].children[i].children[0].children[4].textContent,
                closep : stontable[0].children[i].children[0].children[5].textContent ,
                ycp :    stontable[0].children[i].children[0].children[6].textContent ,
                change : change,
                trade :  stontable[0].children[i].children[0].children[8].textContent ,
                value :  stontable[0].children[i].children[0].children[9].textContent ,
                Volume : stontable[0].children[i].children[0].children[10].textContent
            }
            jsonAll[`${json.name}`] = json;
        }
        //console.log(jsonAll)
        return jsonAll
  }



 //callstocks();
module.exports.dataDse = callstocks;


const price90 =  async (name) =>  {
    const now = new Date().toLocaleDateString("en-US").split('/')
   // console.log(now)
    console.log(`https://www.dsebd.org/day_end_archive.php?startDate=2021-06-01&endDate=${now[2]}-${now[0]}-${(now[1] >= 10)? now[1] : `0${now[1]}`}&inst=${name}&archive=data`)
    const response = await axios({
        url : `https://www.dsebd.org/day_end_archive.php?startDate=2021-06-01&endDate=${now[2]}-${now[0]}-${(now[1] >= 10)? now[1] : `0${now[1]}`}&inst=${name}&archive=data` ,
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
        arr.push(json)
        var p = stontable0[0].children[1].children[i].children[0].textContent ;
        i=i+1;
        
    }
    //console.log(arr)
    return arr
}
//price90('ABBANK')
module.exports.price90 = price90
