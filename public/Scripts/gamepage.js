window.onload = () => {
  document.getElementById('nav-class').innerHTML += '<a class="nav-link" id="cart" href="/cart">Cart(0)</a>';
  updateCartInfo()
    .then(() => getGameInfo())
    .then(response => buildPage(response))
    .then(response => checkAuthToken(response))
    .catch( (e) => manageException(e))
}
manageException = (e) =>
{
  if((e) === "400"){
    document.location.href = "/catalog"
  }
}
getGameInfo = () => {
  return new Promise(async function (resolve, reject) {
    const url = document.location.href;
    let xhr = new XMLHttpRequest()
    xhr.open('POST', url)
    xhr.setRequestHeader('Content-Type', 'application/json')
    xhr.send();
    xhr.onreadystatechange = function () {
      if (xhr.readyState == XMLHttpRequest.DONE) {
        if (xhr.response !== JSON && xhr.status !== 400) {
          resolve(getGameInfoFromResponse(JSON.parse(xhr.response)));
          // 
        }
            else{
                reject("400")
            }
        }
      }
  })
}
checkAuthToken = (response) =>
{
  return new Promise(async function (resolve, reject) {
    if(sessionStorage.getItem('_token')){
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
                    document.getElementById("im").innerHTML  += '<p>Add image</p><button class="btn btn-lg btn-primary btn-block"data-toggle="modal" data-target="#exampleModal" data-whatever="@getbootstrap" type="button">Add</button>';
                    document.getElementById("im").innerHTML  += '<p>Edit</p><button class="btn btn-lg btn-primary btn-block" onclick="redirectToEditPage(\'' + response.id + '\')" type="button">Edit</button>';
                    buildModalForm(response);
                    resolve();
                   }
                }
            }
        }
        else{
          reject("401")
        }
  })
}
redirectToEditPage = (res) =>{
  document.location.href = document.location.origin + "/games/" + res; 
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
updateCartInfo = async() => {
  document.getElementById('nav-class').removeChild(document.getElementById('cart'));
  let cartnumber = '';
  if (sessionStorage.getItem('_cart')) {
    cartnumber = JSON.parse(sessionStorage.getItem('_cart')).length;
  } else {
    cartnumber = 0;
  }
  document.getElementById('nav-class').innerHTML += '<a class="nav-link" id="cart" href="/cart">Cart(' + cartnumber + ')</a>';
}
buildModalForm = (res) => {
  document.getElementById("carousel-text-id").innerHTML += '\
    <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">\
  <div class="modal-dialog" role="document"style="color:black">\
    <div class="modal-content">\
      <div class="modal-header">\
        <h5 class="modal-title" id="exampleModalLabel">Add image</h5>\
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">\
          <span aria-hidden="true">&times;</span>\
        </button>\
      </div>\
      <div class="modal-body" >\
        <form>\
          <div class="form-group">\
            <label for="imgUri" class="col-form-label">ImgUri:</label>\
            <input type="text" class="form-control" id="imgUri">\
          </div>\
        </form>\
      </div>\
      <div class="modal-footer">\
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>\
        <button type="button" class="btn btn-primary" id="add-image">Add</button>\
      </div>\
    </div>\
  </div>\
</div>';

  document.getElementById("add-image").addEventListener("click", function () {
    addImage(res.id);
  }, false)
};
addImage = (param) => {
  let imgInfo = {
    gameId: param,
    imgUri: document.getElementById('imgUri').value
  };
  imgInfo = JSON.stringify(imgInfo);
  const url = 'http://localhost:4000/images/add'
  var xhr = new XMLHttpRequest()
  xhr.open('POST', url)
  xhr.withCredentials = true
  xhr.setRequestHeader('Authorization', 'Bearer ' + sessionStorage.getItem('_token'))
  xhr.setRequestHeader('Content-Type', 'application/json')
  xhr.send(imgInfo);
  xhr.onreadystatechange = function () {
    if (xhr.readyState == XMLHttpRequest.DONE) {
      if (xhr.response !== JSON && xhr.status !== 400) {
        $('#exampleModal').modal('hide')
        document.location.reload();
      } else {
        confirm(xhr.response);
      }
    }
  }
}
buildPage = async (gameInfo) => {
  let indicatorsStmnt = '';
  let carouselStmnt = '';
  if (gameInfo.images.length === 0) {
    carouselStmnt = '<div class="carousel-item active"><img style=" height:40vh;" src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/No_image_3x4.svg/1024px-No_image_3x4.svg.png" alt=""></div>';
    indicatorsStmnt = '<li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>';
  }
  for (let i = 0; i < gameInfo.images.length; i++) {
    if (i == 0) {
      carouselStmnt = '<div class="carousel-item active"><img style=" height:40vh;" src="' + gameInfo.images[i] + '" alt=""></div>';
      indicatorsStmnt = '<li data-target="#carouselExampleIndicators" data-slide-to="' + i + '" class="active"></li>';
    } else {
      carouselStmnt += '<div class="carousel-item"><img style=" height:40vh;" src="' + gameInfo.images[i] + '"></div>';
      indicatorsStmnt += '<li data-target="#carouselExampleIndicators" data-slide-to="' + i + '"></li>'
    }
  }
  document.getElementById("indicators").innerHTML += indicatorsStmnt;
  document.getElementById("carousel-container").innerHTML += carouselStmnt;
  document.getElementById("carousel-text-id").innerHTML += '<div> <img style="height:40vh;width:100%;" src="' + gameInfo.imgUri + '"alt="No image"></div><p>' + gameInfo.description + '</p>';
  document.getElementById("add-cart").innerHTML += '<p>Add to cart</p><button class="btn btn-lg btn-primary btn-block" type="button">' + gameInfo.price + '$</button>';
  document.getElementById("add-cart").addEventListener("click", function () {
    addToCart(gameInfo);
  }, false)
  return gameInfo;
}

addToCart = (gameInfo) => {
  console.log("das")
  let _cart = [];
  if (sessionStorage.getItem('_cart')) {
    _cart = JSON.parse(sessionStorage.getItem('_cart'));
  } else {
    _cart = [];
  }
  _cart.push(gameInfo.id);
  sessionStorage.setItem('_cart', JSON.stringify(_cart));
  updateCartInfo();
}