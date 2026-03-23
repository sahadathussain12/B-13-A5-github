console.log("hello");




document.getElementById('loging').addEventListener('click',function(){
    const userInput = document.getElementById('username')
    const userName = userInput.value
    console.log(userName);

    const inputPass = document.getElementById('pass')
    const password = inputPass.value
    console.log(password);

    if(userName==='admin'&& password === 'admin123'){
        alert('loging success')
       window.location.assign("home.html");
    }
    else{
        alert('loging faled')
    }
})