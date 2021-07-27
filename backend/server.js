const { response } = require('express');
const express = require('express');
const app = express();
const path = require("path")
const datagather = require('./datagather')
const config = require('./config')
const schedule = require('node-schedule');
const fs = require('fs')
const mongoose = require('mongoose')
const model = require('./model');

mongoose.connect('mongodb+srv://yamin02:chandanpura@sharebazar.z3hlw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority' , {
    useNewUrlParser: true ,
    useUnifiedTopology: true ,
    useCreateIndex : true ,
    useFindAndModify : false ,
}).then(() =>{
    console.log('connected to MONGO DB');
}).catch((error) =>{
    console.log(error);
    console.log("MONGODB Error");
});



app.use(express.static(path.join(__dirname,'/../public')));
// console.log(path.join(__dirname,'/../public'));

app.use(express.json({limit : '1mb'}));   //remember to use , as for express to accpet json during POST req


app.get('/getupdate', async(req,res)=>{
    const dsedata = await model.stockmodel.find({},{name:1,trade:1,volume:1,value:1,_id:0,ltp:1,change:1,changeP:1})
    res.send(dsedata);
});

app.get('/preload',async (req,res)=>{
    const dsedata = await model.stockmodel.find({},{name:1,trade:1,volume:1,value:1,_id:0,ltp:1,change:1,changeP:1,last60:1})
    res.send(dsedata);
})

app.post('/eachstock/:id',async (req,res)=>{
     console.log(req.params.id)
     console.log(req.body)
     datagather.price90(req.params.id).then(dara =>{
        res.send(dara)
     })
})

app.get('/dsex',async (req,res)=>{
    var json = await model.dsexmodel.find({});
    res.send(json[0])
})

app.listen(config.default.PORT,()=>{
    console.log("Serving at Port 5000")
});


const updatestart = async () =>{
    var update0 = setInterval(async ()=> {
    const marketStatus = await datagather.updatedb();

    console.log('updated DB');
    console.log(marketStatus)
    if(marketStatus.toUpperCase()=="CLOSED"){
        clearInterval(update0);
        }
    },7000);
}

let rule = new schedule.RecurrenceRule();
rule.dayOfWeek = [0,1,2,3,4]
rule.hour = [10];
rule.minute = [02];
rule.tz = 'Asia/Dhaka';
const job2 = schedule.scheduleJob( rule , async function(triggerDate){
    console.log(`Today is ${triggerDate}`);
    var times = 0
    var checkopen =  setInterval(async () =>{
        const dsex = await datagather.dsex();
        console.log(dsex)
        if(!(dsex['marketStatus'].toUpperCase()=='CLOSED')){
            console.log("Started the Stock market")
            console.log(`Today is ${triggerDate}`);
            updatestart();
            clearInterval(checkopen);
        } else { times=times+1 }
        if(times==10){
            console.log(`Market is closed today : ${triggerDate}`)
            clearInterval(checkopen)
        }
    },4000)
    console.log("Started the Stock market")
});


let rule2 = new schedule.RecurrenceRule();
rule2.dayOfWeek = [0,1,2,3,4]
rule2.hour = [14,16,18,20];
rule2.minute = [5];
rule2.tz = 'Asia/Dhaka';
const jobFinalUpdate = schedule.scheduleJob( rule2 , async function(triggerDate){
    await datagather.finalupdate();
    console.log(`Final Update of Chartdata and All stocks done at : ${triggerDate}`)
});



// var update0 = setInterval(async ()=> {
//     const marketStatus = await datagather.updatedb();

//     console.log('updated DB');
//     console.log(marketStatus)
//     if(marketStatus.toUpperCase()=="CLOSED"){
//         clearInterval(update0);
//         }
//     },7000);