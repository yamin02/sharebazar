const mongoose = require('mongoose');

const stockschema = new mongoose.Schema(
    {
    name : {
        type : String,
        required : false , 
    },
    ltp :   {
        type : String,
        required : false , 
    }, 
    high :   {
        type : String,
        required : false , 
    },
    low :{
        type : String,
        required : false , 
    },
    closep : {
        type : String,
        required : false , 
    },
    ycp :    {
        type : String,
        required : false , 
    },
    change : {
        type : String,
        required : false , 
    },
    changeP : {
        type : String,
        required : false , 
    },
    trade :  {
        type : String,
        required : false , 
    },
    value :  {
        type : String,
        required : false , 
    },
    volume :{
        type : String,
        required : false , 
    },
    last30 :{ type : Array },
    },
    { 
        versionKey : false
    })

module.exports.stockmodel = mongoose.model('stockdata',stockschema)