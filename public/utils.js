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
}

module.exports.hideloading = () =>{
    console.log('loading ends')
    document.getElementById('loading-overlay').classList.remove('active');
}

