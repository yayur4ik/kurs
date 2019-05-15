window.onload = () => {
    let userInfo = sessionStorage.getItem('_token');
    if (userInfo){
        document.location.href = '/';
    }
}
getToken = () => {
    let formData = {
      username : '',
      password : ''
    }
    formData.username = document.getElementById('username').value;
    formData.password = document.getElementById('password').value;
    formData = JSON.stringify(formData);
    const url = 'http://localhost:4000/users/authenticate'
    var xhr = new XMLHttpRequest()
    xhr.open('POST', url)
    xhr.withCredentials = true
    xhr.setRequestHeader('Content-Type', 'application/json')
    
    xhr.send(formData);
    xhr.onreadystatechange = function() {
      if (xhr.readyState == XMLHttpRequest.DONE) {
        if(xhr.response !== JSON && xhr.status !== 400){
           successLogin(xhr.response);
        }
        else{
            document.location.reload();
        }
    }
  }
  }
  successLogin = (res) => {
    let userData = {
        token : ''
    };
    userData = JSON.parse(res);
    sessionStorage.setItem('_token',userData.token);
   document.location.href = '/';
  }
  