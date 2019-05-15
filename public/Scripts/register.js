window.onload = function(){
    if(sessionStorage.getItem("_token")!==null){
        document.location.href="/";
    }
}
signUp = () => {
    let formData = {
        username : '',
        password : '',
        firstName: '',
        lastName: ''
      }
      formData.username = document.getElementById('inputUserName').value;
      formData.password = document.getElementById('inputPassword4').value;
      formData.firstName = document.getElementById('inputFirstName').value;
      formData.lastName = document.getElementById('inputLastName').value;
      formData = JSON.stringify(formData);
      const url = 'http://localhost:4000/users/register'
      var xhr = new XMLHttpRequest()
      xhr.open('POST', url)
      // xhr.withCredentials = true
      xhr.setRequestHeader('Content-Type', 'application/json')
      xhr.send(formData);
      xhr.onreadystatechange = function() {
        if (xhr.readyState == XMLHttpRequest.DONE) {
          if(xhr.response !== JSON && xhr.status !== 400){
            // confirm(xhr.response)
           document.location.href = "/";
          }
          else{
              confirm(xhr.response);
          }
      }
    }
}

