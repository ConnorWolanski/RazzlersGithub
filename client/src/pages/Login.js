import React from "react";
import '../style.css';
class Login extends React.Component
{
  render()
  {
    return(
      <div className = "bg2" align = "left">
        <font size= "26">Log In</font>
        <p hidden id="invalidMessage">
          <font size= "14px">Username or password is invalid, please try again!</font>
        </p>
        <input
          type="text"
          placeholder="Username"
          className="input"
          id="usernameInput"/>
        <input
          type="password"
          placeholder="Password"
          className="input"
          id="passwordInput"/>
        <button type="submit" id="loginButton" className = "button2" onClick={() => {
          loginVerification(document.getElementById("usernameInput").value, document.getElementById("passwordInput").value).then(result => {
            if(result === true)
            {
              document.getElementById("invalidMessage").hidden = true;
            } else {
              document.getElementById("invalidMessage").hidden=false;
            }
          });
        }}>Login</button>
      </div>
    );
  }
}
// checks if username and password are valid with backend server
function loginVerification(inUsername, inPassword)
{
  return new Promise(function(resolve, reject)
  {
    var data = '{"username": "' + inUsername + '", "password": "' + inPassword + '"}';
    data = JSON.parse(data);
    var transport = {
      headers: {
        'Content-Type': "application/json"
      },
      method: "POST",
      body: JSON.stringify(data)
    };
    const url = "http://localhost:3001/api/getData/checkLogin";
    fetch(url, transport).then(response => response.json()).then(json => {
      var serverResponse = json.result;
      console.log(serverResponse);
      if(serverResponse === "true")
      {
        localStorage.setItem("username", inUsername);
        resolve(true);
      } else {
        // reject the user, tell invalid password try again
        localStorage.setItem("username", null);
        resolve(false);
      }
    });
  });
}

export default Login