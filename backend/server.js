const { response } = require('express');
const express = require('express');
const app = express();
const path = require("path")
const routes = require('./routes');
const datagather = require('./datagather')
const config = require('./config')



app.use(express.static(path.join(__dirname,'/../public')));
// console.log(path.join(__dirname,'/../public'));

app.use(express.json({limit : '1mb'}));   //remember to use , as for express to accpet json during POST req
app.use('/getdata',routes);
app.post('/eachstock/:id',async (req,res)=>{
     console.log(req.params.id)
     console.log(req.body)
     datagather.price90(req.params.id).then(dara =>{
        res.send(dara)
     })
})

app.listen(config.default.PORT,()=>{
    console.log("Serving at Port 5000")
});


