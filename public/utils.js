module.exports.parseurl = () => {
    const url = document.location.hash.toLowerCase();
    const request = url.split('/');
    return {
        resource: request[1],
        id: request[2] 
    }
}

module.exports.rerender = async (comp) => {
    document.getElementById("main-container").innerHTML = await comp.rend() ;
    await comp.after_render();
}


module.exports.showloading = () =>{
    console.log('Loading started')
    document.getElementById('loading-overlay').classList.add('active');
    new Chartist.Line('.ct-chart', {
        labels: [1, 2, 3, 4, 5, 6, 7, 8],
        series: [
          [11, 12, 15, 11, 12, 8, 17, 16],        //Red
          [14, 15, 13, 15, 18, 17, 19, 17],           // pitch 
          [5, 8, 12, 6, 15, 18, 20, 19],            // yellow
      ]}, 
      {
      //   high: 90,
      //   low: 30,
        showPoint:false,
        showArea : true,
        fullWidth: true,
        axisX:{  
              showGrid : false ,
              showLabel : false , 
              offset : 15,
          } ,
        axisY: {
          onlyInteger: true,
          showGrid : false ,
          showLabel : false , 
          offset: 20
        }
      });
}

module.exports.hideloading = () =>{
    console.log('loading ends')
    document.getElementById('loading-overlay').classList.remove('active');
}


module.exports.selectFunc = () => {
  var input = document.getElementById("myInput").value.toUpperCase();
   var row = document.getElementsByClassName("name");
   for(var i of row){
       var stonk = i.innerHTML.toUpperCase()
       if (stonk.indexOf(input)>-1){
           i.parentElement.style.display = "" ;
           i.parentElement.querySelector('.chart').__chartist__.update();
       } else {
           i.parentElement.style.display ="none" ;
       }
   }
}

module.exports.topsetLocalstorage = (sort_change,sort_change2,sort_trade,sort_value,sort_volume) =>{
    localStorage.setItem('changeDec',sort_change)
    localStorage.setItem('changeAsc',sort_change2)   
    localStorage.setItem('valueAsc',sort_value)
    localStorage.setItem('volumeAsc',sort_volume)
    localStorage.setItem('tradeAsc',sort_trade)
}