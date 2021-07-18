const { response } = require('express');
const express = require('express');
const app = express();
const path = require("path")
const routes = require('./routes');
const datagather = require('./datagather')
const config = require('./config')
const chartdata = require('./chartdata.json')
const schedule = require('node-schedule');
const fs = require('fs')
const mongoose = require('mongoose')
const changes = require('./changestream.json')
//mongodb+srv://yamin02:<password>@sharebazar.z3hlw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
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

const model = require('./model');

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


app.use(express.static(path.join(__dirname,'/../public')));
// console.log(path.join(__dirname,'/../public'));

app.use(express.json({limit : '1mb'}));   //remember to use , as for express to accpet json during POST req

const job = schedule.scheduleJob('03 1 * * *', async function(triggerDate){
    // datagather.chartdata();
    console.log(`>>>****>>>This is time ${triggerDate}getting the chart data`);
});

app.post('/getdata', async(req,res)=>{
    const dsedata = await datagather.dataDse();
    res.send(dsedata);
});
app.post('/test',async (req,res)=>{
    const p = await datagather.marketdepth("GREENDELT"); 
    res.send(p);
})
app.post('/preload',async (req,res)=>{
    const dsedata = await model.stockmodel.find({})
    res.send(dsedata);
})

app.post('/getchartdata',async (req,res) => {
    res.send(chartdata)
})

app.post('/eachstock/:id',async (req,res)=>{
     console.log(req.params.id)
     console.log(req.body)
     datagather.price90(req.params.id).then(dara =>{
        res.send(dara)
     })
})

app.get('/realtime',async (req,res)=>{
//    var arr =  await datagather.updatedb() ; 
//    console.log('updated DB')
//     res.send(arr);
    res.send(changes)
})

app.listen(config.default.PORT,()=>{
    console.log("Serving at Port 5000")
});

setInterval(async ()=>{
  //  await datagather.updatedb();
///console.log('updated DB');
},5000);

//let rule = new schedule.RecurrenceRule();
// rule.dayOfWeek = [0,1,2,3,4]
// rule.hour = [1,10,11,12,13,14,15,16,17];
// rule.minute = [1,15,30,45];
// rule.tz = 'Asia/Dhaka';
// const job2 = schedule.scheduleJob( rule , async function(triggerDate){
//     console.log("koll life")
//     const datadsejson = await datagather.dataDse() ; 
//     fs.writeFileSync(path.resolve(__dirname,'datadse.json'), JSON.stringify(datadsejson,null,2));
//     console.log(`Today is ${triggerDate}`);
//   });




