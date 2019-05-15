
window.onload = () =>{
  document.getElementById('nav-class').innerHTML += '<a class="nav-link" id="cart" href="/cart">Cart(0)</a>';
  updateCartInfo()
  .then(()=>getUserData())
  .catch((e)=> manageException(e))
}
manageException = (e) =>{
  if(e === '500'){
    sessionStorage.removeItem('_token')
    document.location.href = "/login"
  }
  else if(e==='200'){
    document.getElementById('nav-class').innerHTML += '<a class="nav-link" onclick="showLoginForm()" href="login">Sign In</a>';
  }
}
logout = () =>{
  sessionStorage.removeItem('_token');
  document.location.reload();
}
getUserData = () =>{
  return new Promise(async function (resolve, reject) {
    if(sessionStorage.getItem('_token')!==null){
      const url = 'http://localhost:4000/users/'+sessionStorage.getItem('_token');
      let xhr = new XMLHttpRequest()
      xhr.open('POST', url)
      xhr.withCredentials = true
      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.send();
      let data = {
        username: ''
      };
      xhr.onreadystatechange = function() {
        if (xhr.readyState == XMLHttpRequest.DONE) {
          if(xhr.status === 200 ){
            data = JSON.parse(xhr.response);
            document.getElementById('nav-class').innerHTML += '<a class="nav-link" href="#">'+data.username+'</a>'; 
            document.getElementById('nav-class').innerHTML += '<a class="nav-link" href="logout">Log Out</a>'; 
            resolve();
          }
          else{
            reject('500');
          }
        }
      }
    }
    else{
      reject('200')
    }
  })
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