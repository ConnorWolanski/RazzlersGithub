import React from "react";
import '../style.css';

const utilFunc = require('../Helpers/UtilityFunctions');

class Login extends React.Component
{
  render()
  {
    return(
      <form className = "bg2" align = "left" >
        <font size= "26">Log In</font>
        <p hidden id="invalidMessage">
          <font className="error">Username or password is invalid, please try again!</font>
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
              window.location.href='/';
            } else {
              document.getElementById("invalidMessage").hidden=false;
            }
          });
        }}>Login</button>
    </form>
    );
  }
}
// checks if username and password are valid with backend server
function loginVerification(inUsername, inPassword)
{
  window.event.preventDefault();
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
    const url = "//localhost:3001/api/getData/checkLogin";
    fetch(url, transport).then(response => response.json()).then(json => {
      var serverResponse = json.result;
      if(serverResponse === "true")
      {
        localStorage.setItem("Razzlers_Username", inUsername);
        utilFunc.updateLocalSubscribedLists().then(result => {
          resolve(result);
        });
      } else {
        // reject the user, tell invalid password try again
        localStorage.setItem("Razzlers_Username", null);
        localStorage.setItem("Razzlers_Subscribed_Shows", null);
        localStorage.setItem("Razzlers_Subscribed_Movies", null);
        resolve(false);
      }
    }).catch(err => {
      throw new Error(err);
    });
  });
}

export default Login
