window.onload = () => {
    getOrders()
        .then(response => outputOrders(response))
        .catch((e) => manageException(e))
}
manageException = (e) => {
    console.log('sada')
    document.location.href = '/';
}
getOrders = () => {
    return new Promise(async function (resolve, reject) {
        const url = 'http://localhost:4000/orders/'
        let xhr = new XMLHttpRequest()
        xhr.open('GET', url)
        xhr.withCredentials = true
        xhr.setRequestHeader('Authorization', 'Bearer ' + sessionStorage.getItem('_token'))
        xhr.setRequestHeader('Content-Type', 'application/json')
        xhr.send();
        xhr.onreadystatechange = function () {
            if (xhr.readyState == XMLHttpRequest.DONE) {
                if (xhr.response !== JSON && xhr.status !== 401) {
                    resolve(JSON.parse(xhr.response))
                } else {
                    reject('401')
                }
            }
        }
    })
}
outputOrders = (response) => {
        for (let i = 0; i < response.length; i++) {
            let gamesId = []
            gamesId.push(response[i].gamesId);
            let html = '';
            html += '<tr><th scope="row">' + i + '</th><td>' + response[i].id + '</td><td>' + response[i].userId + '</td><td>' + response[i].email + '</td><td>' + response[i].status + '</td><td><button type="button" class="btn btn-primary" onclick="getDetailInfo(\'' + gamesId + '\')">Show games</button></td>';
            if (response[i].status === 'Approved') {
                html += '<td><button type="button" disabled class="btn btn-primary" onclick="approveOrder(\'' + response[i].id + '\')">Approve</button></td>';
            } else {
                html += '<td><button type="button" class="btn btn-primary" onclick="approveOrder(\'' + response[i].id + '\')">Approve</button></td>';
            }
            html += '</tr>'
            document.getElementById('tbody').innerHTML += html;
        }
    }
        getDetailInfo = (res) => {
            var array = res.split(",");
            if (document.getElementById('games')) {
                document.getElementById('modal-body').removeChild(document.getElementById('games'));
            }
            document.getElementById('modal-body').innerHTML += '<h2 id="games">Games: ';
            let gamesId = '';
            console.log(array)
            for (let i = 0; i < array.length; i++) {
                gamesId += '<p>' + array[i] + '</p>';
            }
            document.getElementById('games').innerHTML += gamesId + '</h2>';
            $('#exampleModal').modal('show');

        }
        approveOrder = (res) => {
            const url = 'http://localhost:4000/orders/' + res;
            let xhr = new XMLHttpRequest()
            xhr.open('POST', url)
            xhr.withCredentials = true
            xhr.setRequestHeader('Authorization', 'Bearer ' + sessionStorage.getItem('_token'))
            xhr.setRequestHeader('Content-Type', 'application/json')
            xhr.send();
            xhr.onreadystatechange = function () {
                document.location.href = '/order'
            }
        }