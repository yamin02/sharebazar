module.exports.sortArr = (points,decending)=>{
    var oldpoint = points.slice('kolla');
    var result = [];
    points.sort((a,b) => decending? b-a : a-b);
    for(var i = 0 ; i<=20 ; i++){
        result.push(oldpoint.indexOf(points[i]))
    }
    return result
}