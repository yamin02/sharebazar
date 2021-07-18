const { Router } = require('express');
const express = require('express');
const app = express();
const datagat = require('./datagather');
const routes = express.Router();


app.use(express.json({limit : '1mb'}));

async function getdata(request,response){
    // console.log({kolla : 'life'})
    await datagat.dataDse().then(dara =>{
        response.send(dara);
    });
    console.log(request.body);
    // response.send(datagat.dataDse);
}

routes.post('/', getdata)

module.exports = routes ; 