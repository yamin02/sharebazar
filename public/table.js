var api = require('./api');

const tab =  {
    afterRend : async ()=>{
        const tbody = document.getElementById('tbody');
        console.log('running after render')
        const data = await api.getits() ;
        tbody.innerHTML = "" ;
        for (var i in data){
            var trow = document.createElement('tr');
            tbody.appendChild(trow);
            var color = data[`${i}`].change < 0 ? 'red' : 'green' ;
            if(data[`${i}`].change==0){color ="blue"}
            trow.style.color = `${color}`
            trow.innerHTML = `<td class="name" onclick="window.open('/#/data/${i}')">${i}</td>
                            <td>${data[`${i}`].ltp}</td>
                            <td>${data[`${i}`].value}</td>
                            <td>${data[`${i}`].change}</td>`
            tbody.appendChild(trow);
            trow.addEventListener('click',()=>{
                window.open(`/#/data/${i}`)
            })
        };

        const selectFunc = () =>{
           var input = document.getElementById("myInput").value.toUpperCase();
          // var input = e.target.value.toUpperCase();
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
        if(document.getElementById("myInput").value){selectFunc()}
        document.getElementById("myInput").addEventListener("input",selectFunc);
    },

rend : ()=>{

    return `
    <input type="text" id="myInput" placeholder="Search for Stocks.." title="Type in a name">
    <table id="stocktable">
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


