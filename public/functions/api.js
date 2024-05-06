var axios = require('axios');
var url = require('./config')

module.exports.getpreload  = async() =>{
  const res = await axios({
      url : `${url.apiUrl}/preload`,
      method:'GET' ,
      headers :  {
          "Content-Type" : 'application/json',
      },
  })
  return res.data
}

module.exports.getupdate  = async() =>{
  const res = await axios({
      url : `${url.apiUrl}/getUpdate`,
      method:'GET' ,
      headers :  {
          "Content-Type" : 'application/json',
      },
  })
  return res.data
}


module.exports.dsex  = async() =>{
  const res = await axios({
      url : `${url.apiUrl}/dsex`,
      method:'GET' ,
      headers :  {
          "Content-Type" : 'application/json',
      },
  })
 // console.log(res.data)
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