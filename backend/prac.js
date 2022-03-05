const axios = require('axios');


const getpreload  = async() =>{
    const res = await axios({
        url : `https://www.google.com/search?q=kolla&tbm=nws`,
        method:'GET' ,
        headers :  {
            "Content-Type" : 'application/json',
        },
    })
    console.log(res.data);
  }

getpreload();