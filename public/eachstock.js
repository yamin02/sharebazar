var api = require('./api');

module.exports.eachstock =  {
    afterRend : (name)=>{
        const tbody = document.getElementById('tbody');
        document.getElementById('stocknameh3').innerHTML =name ;
        api.price90(`${name}`).then(data=>{
            for (var i in data){
        const trow = document.createElement('tr');
        var change = ((data[`${i}`].ltp - data[`${i}`].ycp)/data[`${i}`].ycp).toFixed(2) ;
        console.log(change)
        var color = change < 0 ? 'red' : 'green' ;
        if(change==0){color ="blue"}
        trow.style.color = `${color}`
        trow.innerHTML = `<td class="name">${data[`${i}`].date}</td>
                        <td>${data[`${i}`].ltp}</td>
                        <td>${data[`${i}`].value}</td>
                        <td>${data[`${i}`].volume}</td>
                        <td>${change}</td>`
        tbody.appendChild(trow);
        }});
    },

rend : ()=>{
    console.log('kolla life')
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

 