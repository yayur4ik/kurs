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
            document.getElementById('form').innerHTML +='\
            <div class="form-row">\
            <label for="inputTitle">Title</label>\
            <input type="text" class="form-control" id="inputTitle" placeholder="Title" required>\
            <label for="inputDescription">Description</label>\
            <input type="text" class="form-control" id="inputDescription" placeholder="Description"required>\
            <label for="inputPublisher">Publisher</label>\
            <input type="text" class="form-control" id="inputPublisher" placeholder="Publisher"required>\
            <label for="inputDeveloper">Developer</label>\
            <input type="text" class="form-control" id="inputDeveloper" placeholder="Developer"required>\
            <label for="inputReleasedate">Release date</label>\
            <input type="datetime" class="form-control" id="inputReleasedate" placeholder="Release date"required>\
            <label for="HeadImagelink">Head Image link</label>\
            <input type="url" class="form-control" id="HeadImagelink" placeholder="Head Image link"required>\
            <label for="inputPrice">Price in $</label>\
            <input type="text" class="form-control" id="inputPrice" placeholder="Price"required>\
        </div>\
    </div>\
    <input class="btn btn-lg btn-primary btn-block" type="submit" value="Modify"></button>';
            resolve(xhr.response)
        }
        else{
            reject();
        }
    }
}     
})
}
window.onload = () =>{
    if(!sessionStorage.getItem('_token')){
        document.location.href = "/";
     }
     else{
         getAdminPanel()
     .then(() => getGameInfo())
    .then(res => fillInput(res))
    .catch(e => console.log(e))
     }
}

getGameInfo = () =>{
    return new Promise(async function (resolve, reject) {
        const url = document.location.origin +'/catalog'+ document.location.pathname;
        console.log(url)
        // document.location.href;
        let xhr = new XMLHttpRequest()
        xhr.open('get', url)
        xhr.setRequestHeader('Content-Type', 'application/json')
        xhr.send();
        xhr.onreadystatechange = function () {
          if (xhr.readyState == XMLHttpRequest.DONE) {
            if (xhr.response !== JSON && xhr.status !== 400) {
              resolve(getGameInfoFromResponse(JSON.parse(xhr.response)));
            }
                else{
                    reject("400")
                }
            }
          }
      })
}
fillInput = (res) =>{
    document.getElementById('inputTitle').value = res.title;
    document.getElementById('inputDescription').value = res.description;
    document.getElementById('inputPublisher').value = res.publisher;
    document.getElementById('inputDeveloper').value = res.developer;
    document.getElementById('inputReleasedate').value = res.releaseDate;
    document.getElementById('HeadImagelink').value = res.imgUri;
    document.getElementById('inputPrice').value = res.price;
}
updateInfo = () =>{
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
    const url = document.location.origin + '/catalog' + document.location.pathname;
    var xhr = new XMLHttpRequest()
    xhr.open('POST', url)
    xhr.withCredentials = true
    xhr.setRequestHeader('Authorization', 'Bearer '+sessionStorage.getItem('_token'))
    xhr.setRequestHeader('Content-Type', 'application/json')
    xhr.send(gameInfo);
    xhr.onreadystatechange = function() {
      if (xhr.readyState == XMLHttpRequest.DONE) {
        if(xhr.status !== 401){
          document.location.href = '/';
        }
        else{
            confirm(xhr.response);
        }
    }
  }
}
getGameInfoFromResponse = (res) => {
    let gameInfo = {
      id: null,
      title: null,
      description: null,
      publisher: null,
      developer: null,
      releaseDate: null,
      imgUri: null,
      price: null,
      createdDate: null,
      images: []
    };
    gameInfo.id = res[0]._id;
    gameInfo.title = res[0].title
    gameInfo.description = res[0].description
    gameInfo.publisher = res[0].publisher[0].publisher,
      gameInfo.developer = res[0].developer[0].developer,
      gameInfo.releaseDate = res[0].releaseDate,
      gameInfo.imgUri = res[0].imgUri,
      gameInfo.price = res[0].price,
      gameInfo.createdDate = res[0].createdDate
    for (let i = 0; i < res[0].images.length; i++) {
      gameInfo.images[i] = res[0].images[i].imgUri;
    }
    return gameInfo;
  }