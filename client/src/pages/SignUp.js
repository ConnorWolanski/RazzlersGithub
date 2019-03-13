import React from "react";
import '../style.css';
class SignUp extends React.Component
{
  render()
  {
    return (
      <div className = "bg2" align = "left">
        <font size= "26" >Sign Up</font>
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
          <input type="checkbox" name="terms"></input>
          <font color="black"> I Agree Terms & Conditions</font>
          <br></br>
        </div>
        <button className="button2" id="registerButton" onClick={() => register("scoutz", "knifez")}>Register</button>
        <button className="button2" id="toLoginPageButton" onClick={() => window.location.href='login'}>Login</button>
      </div>
    );
  }
}
//  function for attempting to register the user to the DB
function register(inUsername, inPassword)
{
  var data = '{"username": "' + inUsername + '", "password": "' + inPassword + '"}';
  var transport = {
    headers: {
      'Content-Type': "application/json"
    },
    method: "PUT",
    body: JSON.stringify(data)
  };
  const url = "http://localhost:3001/api/register";
  fetch(url, transport).then(response => response.json()).then(json => {
    // needs to return true or false based on if registration is successful
    // if true, return true and set username in localStorage
    // if false, return what went wrong, if multiple things, put inside array[]
      console.log(json);
      var fetched = json.length;
      console.log(fetched);
    });

}

export default SignUp
