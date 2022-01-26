console.log("HI")



//'http://localhost:3000/login'
function Get_login_info()
    {
        //document.getElementById("maintextarea").innerHTML = "Hello JavaScript!"
        fetch('http://localhost:3000/login')
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log(data);
        });

     }
     
     Get_login_info()