window.onload = () => {
    if (sessionStorage.getItem('_cart')) {
        let summary = 0;
        cart = JSON.parse(sessionStorage.getItem('_cart'));
        document.getElementById('cart-no').innerHTML += '<span class="badge badge-secondary badge-pill">' + cart.length + '</span>'
        for (let i = 0; i < cart.length; i++) {
            const url = 'http://localhost:4000/catalog/games/' + cart[i];
            let xhr = new XMLHttpRequest()
            xhr.open('GET', url)
            xhr.setRequestHeader('Content-Type', 'application/json')
            xhr.send();
            xhr.onreadystatechange = function () {
                if (xhr.readyState == XMLHttpRequest.DONE) {
                    if (xhr.response !== JSON && xhr.status !== 400) {
                        cart[i] = getGameInfo(xhr.response);
                        document.getElementById('list-of-products').innerHTML += '<li class="list-group-item d-flex justify-content-between lh-condensed">\
                    <div>\
                      <h6 class="my-0">' + cart[i].title + '</h6>\
                    </div>\
                    <span class="text-muted">' + cart[i].price + '</span>\
                  </li>';
                        summary += cart[i].price;
                    }
                    document.getElementById('sum').innerHTML = summary.toFixed(2);
                }
            }
        }
    }
}
var firstname = '';
var lastname = '';
prepareOrderQuery = () => {
    addOrder()
        .then(orderInfo => sendOrder(orderInfo))
        .then(e => console.log(e))
        .catch(err => next(err))
}
addOrder = async () => {
    return new Promise(function (resolve, reject) {
        const crt = JSON.parse(sessionStorage.getItem('_cart'));
        let orderInfo = {
            userId: null,
            gamesId: null,
            email: null
        };
        if (sessionStorage.getItem('_token') !== null) {
            let url = 'http://localhost:4000/users/' + sessionStorage.getItem('_token');
            let xhr = new XMLHttpRequest()
            xhr.open('POST', url)
            xhr.withCredentials = true
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.send();
            xhr.onreadystatechange = async function () {
                if (xhr.readyState == XMLHttpRequest.DONE) {
                    if (xhr.response !== JSON && xhr.status !== 400) {
                        let userInfo = await JSON.parse(xhr.response)
                        firstname = userInfo.firstName;
                        lastname = userInfo.lastName;
                        orderInfo.userId = userInfo._id;
                        orderInfo.gamesId = crt;
                        orderInfo.email = document.getElementById('email').value;
                        resolve(orderInfo)
                    }
                }
            }
        }
    })
}
sendOrder = async (orderInfo) => {
    orderInfo = JSON.stringify(orderInfo)
    url = 'http://localhost:4000/orders/';
    xhr = new XMLHttpRequest()
    xhr.open('POST', url)
    xhr.setRequestHeader('Authorization', 'Bearer ' + sessionStorage.getItem('_token'));
    xhr.setRequestHeader('Content-Type', 'application/json')
    await xhr.send(orderInfo);
    sessionStorage.removeItem('_cart');
    sessionStorage.setItem('_firstname',firstname);
    sessionStorage.setItem('_lastname',lastname);
    document.location.href = '/success'
}
getGameInfo = (res) => {
    let gameInfo = {
        title: '',
        price: ''
    };
    gameInfo = JSON.parse(res)
    return gameInfo;
}