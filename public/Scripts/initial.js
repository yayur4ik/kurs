getAdminPanel = () =>{
    return new Promise(function (resolve, reject){
    const url = 'http://localhost:4000/users/admin';
    let xhr = new XMLHttpRequest()
    xhr.open('GET', url)
    xhr.withCredentials = true
    xhr.setRequestHeader('Authorization','Bearer '+  sessionStorage.getItem('_token'))
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send();
    xhr.onreadystatechange = function() {
      if (xhr.readyState == XMLHttpRequest.DONE) {
        if(xhr.response !== JSON && xhr.status !== 401){
            resolve(xhr.response)
        }
        else{
            reject();
        }
    }
}     
})
}
window.onload = () => {
    if(!sessionStorage.getItem('_token')){
       document.location.href = "/";
    }
    else{
        getAdminPanel()
        .then(response => setHtml(response))
        .catch(() => document.location.href = "/")
    }
}
setHtml = (response) =>{
    document.getElementById('body').innerHTML += response;
    document.title = "Admin panel"
}
