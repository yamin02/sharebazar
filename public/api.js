var axios = require('axios');
var url = require('./config')

module.exports.getpreload  = async() =>{
  const res = await axios({
      url : `${url.apiUrl}/preload`,
      method:'POST' ,
      headers :  {
          "Content-Type" : 'application/json',
      },
      data :{
        text : 'send ltp',
      }
  })
  return res.data
}

module.exports.getits  = async() =>{
  const res = await axios({
      url : `${url.apiUrl}/getdata`,
      method:'POST' ,
      headers :  {
          "Content-Type" : 'application/json',
      },
      data :{
        text : 'send ltp',
      }
  })
  return res.data
}

module.exports.price90  = async(stock) =>{
  const res = await axios({
      url : `${url.apiUrl}/eachstock/${stock}`,
      method:'POST' ,
      headers :  {
          "Content-Type" : 'application/json',
      },
      data :{
        text : 'send price 90 days',
      }
  })
  console.log(res.data)
  return res.data
}

module.exports.getchartdata  = async(stock) =>{
  const res = await axios({
      url : `${url.apiUrl}/getchartdata`,
      method:'POST' ,
      headers :  {
          "Content-Type" : 'application/json',
      },
      data :{
        text : 'Send chart data',
      }
  })
 // console.log(res.data)
  return res.data
}

module.exports.test0  = async() =>{
  const res = await axios({
      url : `${url.apiUrl}/test`,
      method:'POST' ,
      headers :  {
          "Content-Type" : 'application/json',
      },
      data :{
        text : 'Send chart data',
      }
  })
 // console.log(res.data)
  return res.data
}

module.exports.realtime  = async() =>{
  const res = await axios({
      url : `${url.apiUrl}/realtime`,
      method:'GET' ,
      headers :  {
          "Content-Type" : 'application/json',
      },
  })
 // console.log(res.data)
  return res.data
}