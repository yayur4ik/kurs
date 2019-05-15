window.onload = () =>{
  if (!sessionStorage.getItem('_cart') || checkForNull()) {
    document.location.href="/"
  }

  document.getElementById('nav-class').innerHTML += '<a class="nav-link active" id="cart" href="/cart">Cart(0)</a>';
  updateCartInfo()
    .then(() => editCart())
    .then(summary => editSummary(summary))
    .catch((e) => console.log(e))
}
editSummary = (summary) => {
  document.getElementById("basket-subtotal").innerText = summary.toFixed(2);
  document.getElementById("basket-total").innerText = summary.toFixed(2);
}
checkForNull = ()=>{
  cart = JSON.parse(sessionStorage.getItem('_cart'));
  if(cart[0]===undefined){
    return true;
  }
  else{
    return false;
  }
}
editCart = async() => {
  return new Promise(async function (resolve, reject) {
      let cart = [];
      let summary = 0;
      cart = JSON.parse(sessionStorage.getItem('_cart'));
      for (let i = 0; i < cart.length; i++) {
        summary += await getGamesInCart(cart[i],i);

      }
      resolve(summary);
  })
}
getGamesInCart = async (cart,i) => {
  return new Promise(function (resolve, reject) {
      const url = 'http://localhost:4000/catalog/' + cart;
      let xhr = new XMLHttpRequest()
      xhr.open('POST', url)
      xhr.setRequestHeader('Content-Type', 'application/json')
      xhr.send();
      xhr.onreadystatechange = async function () {
        if (xhr.readyState == XMLHttpRequest.DONE) {
          let summary = 0;
          if (xhr.response !== JSON && xhr.status !== 400) {
            cart = await getGameInfo(JSON.parse(xhr.response));
            document.getElementById("bskta").innerHTML += '<div class="basket-product">\
              <div class="item">\
                <div class="product-image">\
                  <img src="' + cart.imgUri + '" style="height:25%" alt="Placholder Image 2" class="product-frame">\
                </div>\
                <div class="product-details">\
                  <h1>' + cart.title + '</h1>\
                  <p><strong>' + cart.developer + '</strong></p>\
                  <p>Product Code - ' + cart.id + '</p>\
                </div>\
              </div>\
              <div class="price">' + cart.price + '</div>\
              <div class="remove">\
                <button onclick="removeItemFromCart(\''+i+'\')">Remove</button>\
              </div>\
            </div>';
            summary = cart.price;
            resolve(summary)
          }
        }
      }
  })
}
removeItemFromCart =(res) =>{
  cart = JSON.parse(sessionStorage.getItem('_cart'));
  delete cart[res];
  cart = cart.filter(function (el) {
    return el != null;
  });
  sessionStorage.setItem('_cart', JSON.stringify(cart))
  document.location.reload();
}

updateCartInfo = async () => {
  return new Promise(function (resolve, reject) {
    document.getElementById('nav-class').removeChild(document.getElementById('cart'));
    let cartnumber = '';
    if (sessionStorage.getItem('_cart')) {
      cartnumber = JSON.parse(sessionStorage.getItem('_cart')).length;
    } else {
      cartnumber = 0;
    }
    document.getElementById('nav-class').innerHTML += '<a class="nav-link active" id="cart" href="/cart">Cart(' + cartnumber + ')</a>';
    resolve()
  })
}
getGameInfo = async (res) => {
  return new Promise(function (resolve, reject) {
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
    resolve(gameInfo)
  })
}
goToCheckout = () =>{
  if(sessionStorage.getItem('_token')!==null){
    const url = 'http://localhost:4000/users/'+sessionStorage.getItem('_token');
    let xhr = new XMLHttpRequest()
    xhr.open('POST', url)
    xhr.withCredentials = true
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send();
    xhr.onreadystatechange = function() {
      if (xhr.readyState == XMLHttpRequest.DONE) {
        if(xhr.status === 200){
          document.location.href = "/checkout"
        }
        else{
          sessionStorage.removeItem('_token')
          document.location.href = "/login"
        }
      }
    }
  }
  else{
    document.location.href = "/login"
  }
}