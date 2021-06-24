var axios = require('axios');
var url = require('./config')

module.exports.getits  = async() =>{
  const res = await axios({
      url : `${url.apiUrl}/getdata`,
      method:'POST' ,
      headers :  {
          "Content-Type" : 'application/json',
      },
      data :{
        text : 'kollalife',
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
        text : 'kollalife',
      }
  })
  console.log(res.data)
  return res.data
}
// geit().then(data =>{
//   console.log(data);
// })

// module.exports.getits = geit ;