var api = require('./api');
var utils = require('./utils')


module.exports.eachstock =  {
    afterRend : async ()=>{
        const params = utils.parseurl().id
        const tbody = document.getElementById('tbody');
        document.getElementById('stocknameh3').innerHTML = params.toUpperCase() ;
        const data = await api.price90(`${params}`)
        tbody.innerHTML = "" ;
            for (var i in data){
        const trow = document.createElement('tr');
        var change = data[`${i}`].change;
       // console.log(change)
        var color = change < 0 ? 'red' : 'green' ;
        if(change==0){color ="blue"}
        trow.style.color = `${color}`
        trow.innerHTML = `<td class="name">${data[`${i}`].date}</td>
                        <td>${data[`${i}`].ltp}</td>
                        <td>${data[`${i}`].value}</td>
                        <td>${data[`${i}`].volume}</td>
                        <td>${data[`${i}`].change}</td>`
        tbody.appendChild(trow);

        }
    },

rend : ()=>{
    console.log('Each stock page loaded')
    return `
    <h3 id="stocknameh3">kolla</h3>
    <table>
        <thead>
            <tr>
                <th>Date</th>
                <th>LTP</th>
                <th>Value(Mn)</th>
                <th>Volume</th>
                <th>Change</th>
            </tr>
        </thead>
        <tbody id="tbody"></tbody>
    </table>`
 }
 }

 