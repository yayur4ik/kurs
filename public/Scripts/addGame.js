addGame = () =>{
    let gameInfo = 
    {
        title: document.getElementById('inputTitle').value,
        description: document.getElementById('inputDescription').value,
        publisher: document.getElementById('inputPublisher').value,
        developer: document.getElementById('inputDeveloper').value,
        releaseDate: document.getElementById('inputReleasedate').value,
        imgUri: document.getElementById('HeadImagelink').value,
        price: document.getElementById('inputPrice').value
    };
    gameInfo = JSON.stringify(gameInfo);
    const url = 'http://localhost:4000/catalog/games';
    var xhr = new XMLHttpRequest()
    xhr.open('POST', url)
    xhr.withCredentials = true
    xhr.setRequestHeader('Authorization', 'Bearer '+sessionStorage.getItem('_token'))
    xhr.setRequestHeader('Content-Type', 'application/json')
    xhr.send(gameInfo);
    xhr.onreadystatechange = function() {
      if (xhr.readyState == XMLHttpRequest.DONE) {
        if(xhr.response !== JSON && xhr.status !== 400){
          confirm("Success")
        }
        else{
            confirm(xhr.response);
        }
    }
  }
}