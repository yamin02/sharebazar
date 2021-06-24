var api = require('./api');


const tab =  {
    afterRend : ()=>{
        const tbody = document.getElementById('tbody');
        api.getits().then(data=>{
            for (var i in data){
              //  console.log(`${data[`${i}`].ltp}`);
        const trow = document.createElement('tr');
        var color = data[`${i}`].change < 0 ? 'red' : 'green' ;
        if(data[`${i}`].change==0){color ="blue"}
        trow.style.color = `${color}`
        
        // setAttribute("style",`color:${color}`) ;
        trow.innerHTML = `<td class="name"><a href= '/#/data/${i}' style="none">${i}</a>
                        </td><td>${data[`${i}`].ltp}</td>
                        <td>${data[`${i}`].value}</td>
                        <td>${data[`${i}`].change}</td>`
        tbody.appendChild(trow);
        }});

        const selectFunc = () =>{
            var input = document.getElementById("myInput").value.toUpperCase();
            var row = document.getElementsByClassName("name");
            for(var i of row){
                var stonk = i.innerHTML.toUpperCase()
                if(stonk.indexOf(input)>-1){
                    i.parentElement.style.display = "" ;
                }else{
                    i.parentElement.style.display ="none"
                }
            }
        }
        document.getElementById("myInput").addEventListener("keyup",selectFunc);
    },

rend : ()=>{

    return `
    <input type="text" id="myInput" placeholder="Search for Stocks.." title="Type in a name">
    <table>
        <thead>
            <tr>
                <th>Stonk</th>
                <th>LTP</th>
                <th>Value(Mn)</th>
                <th>Change</th>
            </tr>
        </thead>
        <tbody id="tbody">
        </tbody>
    </table>`

    
 }
 }

module.exports.tableReal = tab


