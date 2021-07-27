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
    last60 :{ type : Array },
    },
    { 
        versionKey : false
    })

module.exports.stockmodel = mongoose.model('stockdata',stockschema)


const stockschema2 = new mongoose.Schema(
    {
    marketStatus : {
        type : String,
        required : false , 
    },
    dsex :   {
        type : Number,
        required : false , 
    }, 
    dsexChange :   {
        type : Number,
        required : false , 
    },
    dsexChangeP :{
        type : Number,
        required : false , 
    },
    ds30 : {
        type : Number,
        required : false , 
    },
    ds30Change :    {
        type : Number,
        required : false , 
    },
    ds30ChangeP : {
        type : Number,
        required : false , 
    },
    totaltrade : {
        type : Number,
        required : false , 
    },
    totalvolume :  {
        type : Number,
        required : false , 
    },
    totalvalue :  {
        type : Number,
        required : false , 
    },
    issueAdvance :{
        type : Number,
        required : false , 
    },
    issueDecline :{
        type : Number,
        required : false , 
    },
    issueUnchange :{
        type : Number,
        required : false , 
    },
    },
    { 
        versionKey : false
    })

module.exports.dsexmodel = mongoose.model('dsexdata',stockschema2)