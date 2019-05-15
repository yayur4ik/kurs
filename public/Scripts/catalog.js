window.onload = () => {
  document.getElementById('nav-class').innerHTML += '<a class="nav-link active" id="cart" href="/cart">Cart(0)</a>';
  updateCartInfo()
    .then(() => getGameList())
    .then(response => prepareGamesInfoForOutput(response))
    .catch(err => next(err))
}
prepareGamesInfoForOutput = async(response) =>{
  for (let i = 0; i < response.length; i++) {
     await getGameInfoAndBuildCard(response[i]);
  }
}
getGameList = async () =>{
  return new Promise(async function (resolve, reject) {
  const url = 'http://localhost:4000/catalog/games'
  let xhr = new XMLHttpRequest()
  xhr.open('GET', url)
  xhr.setRequestHeader('Content-Type', 'application/json')
  xhr.send();
  xhr.onreadystatechange = function() {
    if (xhr.readyState == XMLHttpRequest.DONE) {
      if(xhr.response !== JSON && xhr.status !== 400){
        resolve(JSON.parse(xhr.response));
      }
    }
  }
})
}
getGameInfoAndBuildCard = (res) =>{
    let gameInfo = {
        id: null,
        title: null,
        description: null,
        publisher:  null,
        developer:  null,
        releaseDate:  null,
        imgUri:  null,
        price:  null,
        createdDate:  null,
    };
        gameInfo.id = res._id;
        gameInfo.title = res.title
        gameInfo.description = res.description
        gameInfo.publisher = res.publisher,
        gameInfo.developer = res.developer,
        gameInfo.releaseDate = res.releaseDate,
        gameInfo.imgUri = res.imgUri,
        gameInfo.price= res.price,
        gameInfo.createdDate = res.createdDate
        buildCard(gameInfo);
}
updateCartInfo = async() =>{
    document.getElementById('nav-class').removeChild(document.getElementById('cart'));
    let cartnumber = '';
    if(sessionStorage.getItem('_cart')){
      cartnumber = JSON.parse(sessionStorage.getItem('_cart')).length;
    }
    else{
      cartnumber = 0;
    }
    document.getElementById('nav-class').innerHTML += '<a class="nav-link" id="cart" href="/cart">Cart('+cartnumber+')</a>'; 
}
buildCard = (gameInstance) =>{
    document.getElementById("list-of-games").innerHTML +='<li class="media"> \
          <img width="10%" src="'+gameInstance.imgUri+'" class="mr-3" alt="No image"> \
          <div class="media-body">\
            <h5 class="mt-0 mb-1">'+gameInstance.title+'</h5>\
            <p>'+gameInstance.description+'</p>\
          </div>\
          <div class="game-price"><a href="/catalog/'+gameInstance.id+'">$'+gameInstance.price+'</div>\
          <span></span>\
        </li>';
}
searchItem = () =>{
  let selected = document.getElementById('inputState').options[document.getElementById('inputState').selectedIndex].value
  if(selected==='Title'){
    if(document.getElementById('search-value').value)
    {
      const url = 'http://localhost:4000/catalog/title/' + document.getElementById('search-value').value;
      let xhr = new XMLHttpRequest()
      xhr.open('GET', url)
      xhr.setRequestHeader('Content-Type', 'application/json')
      xhr.send();
      xhr.onreadystatechange = function() {
        if (xhr.readyState == XMLHttpRequest.DONE) {
          if(xhr.response !== JSON && xhr.status !== 400){
            while (document.getElementById("list-of-games").firstChild) {
              document.getElementById("list-of-games").removeChild(document.getElementById("list-of-games").firstChild);
          }
           prepareGamesInfoForOutput(JSON.parse(xhr.response))
          }
        }
      }
    }
    else{
      document.location.reload();
    }
  }
  if(selected==='Publisher'){
    if(document.getElementById('search-value').value)
    {
      const url = 'http://localhost:4000/catalog/publisher/' + document.getElementById('search-value').value;
      let xhr = new XMLHttpRequest()
      xhr.open('GET', url)
      xhr.setRequestHeader('Content-Type', 'application/json')
      xhr.send();
      xhr.onreadystatechange = function() {
        if (xhr.readyState == XMLHttpRequest.DONE) {
          if(xhr.response !== JSON && xhr.status !== 400){
            console.log(xhr.response)
            while (document.getElementById("list-of-games").firstChild) {
              document.getElementById("list-of-games").removeChild(document.getElementById("list-of-games").firstChild);
          }
           prepareGamesInfoForOutput(JSON.parse(xhr.response))
          }
        }
      }
    }
    else{
      document.location.reload();
    }
  }
  if(selected==='Developer'){
    if(document.getElementById('search-value').value)
    {
      const url = 'http://localhost:4000/catalog/developer/' + document.getElementById('search-value').value;
      let xhr = new XMLHttpRequest()
      xhr.open('GET', url)
      xhr.setRequestHeader('Content-Type', 'application/json')
      xhr.send();
      xhr.onreadystatechange = function() {
        if (xhr.readyState == XMLHttpRequest.DONE) {
          if(xhr.response !== JSON && xhr.status !== 400){
            console.log(xhr.response)
            while (document.getElementById("list-of-games").firstChild) {
              document.getElementById("list-of-games").removeChild(document.getElementById("list-of-games").firstChild);
          }
           prepareGamesInfoForOutput(JSON.parse(xhr.response))
          }
        }
      }
    }
    else{
      document.location.reload();
    }
  }
}