import React from "react";
import '../style.css';
class SignUp extends React.Component
{
  render()
  {
    return (
      <div className = "bg2" align = "left">
        <font size= "26">Sign Up</font>
        <p hidden id="invalidMessage">
          <font className="error">Username or password is invalid, please try again!</font>
        </p>
        <p hidden id="uncheckedTOS">
          <font className="error">Please check the Terms and Conditions and try again!</font>
        </p>
        <p hidden id="blankSpacesMessage">
          <font className="error">Please fill out all required sections and try again!</font>
        </p>
        <input
          type="text"
          placeholder="Username"
          className="input"
          id="usernameInput"/>
        <input
          type="text"
          placeholder="Email"
          className="input"
          id="emailInput"/>
        <input
          type="password"
          placeholder="Password"
          className="input"
          id="passwordInput"/>
        <input
          type="text"
          placeholder="First Name"
          className="input"
          id="firstNameInput"/>
        <input
          type="text"
          placeholder="Last Name"
          className="input"
          id="lastNameInput"/>
        <input
          type="text"
          placeholder="Display Name"
          className="input"
          id="displayNameInput"/>
        <div className="tos">
          <input type="checkbox" name="terms" id="checkboxTOS"></input>
          <font color="black"> I Agree Terms & Conditions</font>
          <br></br>
        </div>
        <button className="button2" id="registerButton" onClick={() =>
          {
            var hadError = false;
            if(document.getElementById("usernameInput").value.trim() === "" || document.getElementById("emailInput").value.trim() === "" ||
                document.getElementById("passwordInput").value.trim() === "" || document.getElementById("firstNameInput").value.trim() === "" ||
                document.getElementById("lastNameInput").value.trim() === "" || document.getElementById("displayNameInput").value.trim() === "")
            {
              document.getElementById("blankSpacesMessage").hidden=false;
              hadError = true;
            } else {
              document.getElementById("blankSpacesMessage").hidden=true;
            }
            if(document.getElementById("checkboxTOS").checked === false)
            {
              document.getElementById("uncheckedTOS").hidden=false;
              hadError = true;
            } else {
              document.getElementById("uncheckedTOS").hidden=true;
            }
            if(hadError === true)
            {
              return;
            }
            register(document.getElementById("usernameInput").value,
             document.getElementById("emailInput").value,
             document.getElementById("passwordInput").value,
             document.getElementById("firstNameInput").value,
             document.getElementById("lastNameInput").value,
             document.getElementById("displayNameInput").value).then(response => {
               if(response.result === "true")
               {
                 // registration was successful
                 window.localStorage.setItem("Razzlers_Username", document.getElementById("usernameInput").value);
                 window.location.href='/';
               } else {
                 // display error, reprompt for information
                 document.getElementById("invalidMessage").hidden=false;
               }
             });
          }}>Register</button>
        <button className="button2" id="toLoginPageButton" onClick={() => window.location.href='login'}>Login</button>
      </div>
    );
  }
}
//  function for attempting to register the user to the DB
function register(inUsername, inEmail, inPassword, inFirstName, inLastName, inDisplayName)
{
  return new Promise(function(resolve, reject)
  {
    var data = '{"username": "' + inUsername + '", "password": "' + inPassword + '", "email": "' + inEmail + '", "first_name": "' + inFirstName + '", "last_name": "' + inLastName + '", "display_name": "' + inDisplayName + '"}';
    data = JSON.parse(data);
    var transport = {
      headers: {
        'Content-Type': "application/json"
      },
      method: "PUT",
      body: JSON.stringify(data)
    };
    const url = "http://localhost:3001/api/register";
    fetch(url, transport).then(response => response.json()).then(json =>
      {
        // needs to return true or false based on if registration is successful
        // if true, return true and set username in localStorage
        // if false, return what went wrong, if multiple things, put inside array[]
        resolve(json);
      });
  });
}

export default SignUp
