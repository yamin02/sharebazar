const { set } = require('mongoose');
var api = require('./api');
var utils = require('./utils');

module.exports.infotab =  {
    repeatRend : async () => { } ,
    
    afterRend : async (data0) =>  {
        
        console.log("THIS IS AFTER REND DNDND")
        // if(data0){
        //     console.log('trueeee');
        //     var data = JSON.parse(data0) 
        // }else {
        //     var data = JSON.parse(localStorage.getItem('dsedata'))
        // }
        // console.log(JSON.parse(data0))
        // console.log(data)

        data = [
        { 'name' : 'GOLD' , 'change' : 45 , 'trade' : 340  , 'ltp' : 45 , 'changeP' : 3  } ,
        {'name' : 'Sanchay Patra' , 'change' : 45 , 'trade' : 340  , 'ltp' : 45 , 'changeP' : 3  } ,
        {'name' : 'BOND' , 'change' : 45 , 'trade' : 340  , 'ltp' : 45 , 'changeP' : 3  } ,
        {'name' : 'MUTUAL FUND' , 'change' : 45 , 'trade' : 340  , 'ltp' : 45 , 'changeP' : 15  },
        {'name' : 'DSEX' , 'change' : 45 , 'trade' : 340  , 'ltp' : 45 , 'changeP' : -13  } ] 
        $("#stocklist").html('<div data-tf-live="01HTQPX2J1G2949SDM3MKFNRF5"></div><script src="//embed.typeform.com/next/embed.js"></script>')
        var count = 0
        for (var i in data)
        {
            var changeval = (data[`${i}`].change < 0)? `${data[`${i}`].change}` : `+${data[`${i}`].change}`
            var color = data[`${i}`].changeP < 0 ? 'red' : 'green' ;
            if(data[`${i}`].changeP==0){color ="blue"} ;

            $("#stocklist").append(`
            <div class="flex main" id="${data[i].name}">
            <div id="name" class="name" style="cursor: pointer;" onclick="window.location='#/eachstock/${data[i].name}'">
                <p>${data[i].name}</p>
            </div>
            
             <div class="image-mainpage" onclick="alert('This is a chart made from last 15 days')">
             <img src="https://image.similarpng.com/very-thumbnail/2021/05/Gold-bar-isolated-on-transparent-background-PNG.png">
             </div>
            
            <div id="icon"><i id="fav${data[i].name}" class="fas fa-star ${localStorage.fav? (JSON.parse(localStorage.fav).includes(data[i].name)?'checked':'' ):''}" onclick="fav('${data[i].name}')"></i></div>
            <div id="data">
                <p class="${color}">${data[`${i}`].ltp}</p>
                <p class="${color}1 change">${changeval} , ${data[`${i}`].changeP}%</p>
            </div>
            </div>            
            `)
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




