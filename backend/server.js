const express = require('express');
const app = express();
const path = require("path")
const config = require('./config')
const fs = require('fs')
const mongoose = require('mongoose')
const model = require('./model');
const utils = require('./utils')
var http = require('http').Server(app);
var io = require('socket.io')(http);

// mongoose.connect('mongodb+srv://yamin02:chandanpura@sharebazar.z3hlw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority' ).then(() =>{
//     console.log('connected to MONGO DB');
// }).catch((error) =>{
//     console.log(error);
//     console.log("MONGODB Error");
// });



app.use(express.static(path.join(__dirname,'/../public')));
// console.log(path.join(__dirname,'/../public'));

app.use(express.json({limit : '1mb'}));   //remember to use , as for express to accpet json during POST req


app.get('/getupdate', async(req,res)=>{
    var [change,value,trade,volume]=[[],[],[],[]]
    const dsedata = await model.stockmodel.find({},{name:1,trade:1,volume:1,value:1,_id:0,ltp:1,change:1,changeP:1})
    for(var i of dsedata){
        change.push(i.changeP);
        trade.push(i.trade)
        value.push(i.value)
        volume.push(i.volume)
    }
    var change2 =  change.slice('kolla')
    var json = {
        dsedata :dsedata ,
        sort_change : utils.sortArr(change,true),
        sort_change_asc : utils.sortArr(change2,false),
        sort_value : utils.sortArr(value,true),
        sort_volume : utils.sortArr(volume,true),
        sort_trade : utils.sortArr(trade,true),
    }
    // console.log(json)
    res.send(json);
    // res.send(dsedata);
});

app.get('/preload',async (req,res)=>{
    // const dsedata = await model.stockmodel.find({},{name:1,trade:1,volume:1,value:1,_id:0,ltp:1,change:1,changeP:1,last60:1}).sort({_id:1})
    // var json = {
    //     dsedata :dsedata ,
    // }
    // res.send(json);
    res.send({})
})

app.post('/eachstock/:id',async (req,res)=>{
     console.log(req.params.id)
     console.log(req.body)
     res.send("life is cool")
})

app.get('/dsex',async (req,res)=>{
    // var json = await model.dsexmodel.find({});
    // res.send(json[0])
    res.send({})
})

app.listen(config.default.PORT,()=>{
    console.log("Serving at Port 5000")
});



