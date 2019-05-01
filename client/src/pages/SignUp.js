import React from "react";
import '../style.css';
class SignUp extends React.Component
{
  render()
  {
    return (
      <div className = "bg2_center" align = "left">
        <font size= "26">Sign Up</font>
        <p hidden id="invalidMessage">
          <font className="error">Username or password is invalid, please try again!</font>
        </p>
        <p hidden id="invalidCharacters">
          <font className="error">No field can not contain special characters and must be 16 characters or less!</font>
        </p>
        <p hidden id="duplicateUsername">
          <font className="error">Username is already taken!</font>
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
        <div className="tos">
          <input type="checkbox" name="terms" id="checkboxTOS"></input>
          <font color="black"> I Agree Terms & Conditions</font>
          <br></br>
        </div>
        <button className="button2" id="registerButton" onClick={() =>
          {
            document.getElementById("invalidMessage").hidden = true;
            document.getElementById("invalidCharacters").hidden = true;
            document.getElementById("duplicateUsername").hidden = true;
            document.getElementById("uncheckedTOS").hidden = true;
            document.getElementById("blankSpacesMessage").hidden = true;
            var hadError = false;
            if(document.getElementById("usernameInput").value.trim() === "" || document.getElementById("emailInput").value.trim() === "" ||
                document.getElementById("passwordInput").value.trim() === "" || document.getElementById("firstNameInput").value.trim() === "" ||
                document.getElementById("lastNameInput").value.trim() === "")
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
            checkForInvalid(document.getElementById("usernameInput").value.trim()).then(usernameInvalidity =>
            {
              checkForInvalid(document.getElementById("emailInput").value.trim()).then(emailInvalidity =>
              {
                checkForInvalid(document.getElementById("passwordInput").value.trim()).then(passwordInvalidity =>
                {
                  checkForInvalid(document.getElementById("firstNameInput").value.trim()).then(firstNameInvalidity =>
                  {
                    checkForInvalid(document.getElementById("lastNameInput").value.trim()).then(lastNameInvalidity =>
                    {
                      var validity = !usernameInvalidity && !emailInvalidity && !passwordInvalidity && !firstNameInvalidity && !lastNameInvalidity;
                      console.log(validity);
                      if(validity)
                      {
                        register(document.getElementById("usernameInput").value,
                         document.getElementById("emailInput").value,
                         document.getElementById("passwordInput").value,
                         document.getElementById("firstNameInput").value,
                         document.getElementById("lastNameInput").value).then(response => {
                           if(response.result === "true")
                           {
                             // registration was successful
                             window.localStorage.setItem("Razzlers_Username", document.getElementById("usernameInput").value);
                             window.localStorage.setItem("Razzlers_Subscribed_Shows", 0);
                             window.localStorage.setItem("Razzlers_Subscribed_Movies", 0);
                             window.location.href='/';
                           }
                           else if(response.result === "duplicate")
                           {
                             document.getElementById("duplicateUsername").hidden = false;
                           } else {
                             // display error, reprompt for information
                             document.getElementById("invalidMessage").hidden = false;
                           }
                         });
                      } else {
                        document.getElementById("invalidCharacters").hidden = false;
                      }
                    });
                  });
                });
              });
            });
          }}>Register</button>
        <button className="button2" id="toLoginPageButton" onClick={() => window.location.href='login'}>Login</button>
      </div>
    );
  }
}

function checkForInvalid(input)
{
  return new Promise(function(resolve, reject)
  {
    var containsInvalid = false;
    if(input.length > 32)
    {
      containsInvalid = true;
    }
    for(var i = 0; i < input.length; i++)
    {
      if(input.charCodeAt(i) < 48 && input.charCodeAt(i) !== 46)
      {
        containsInvalid = true;
      }
      else if(input.charCodeAt(i) > 57 && input.charCodeAt(i) < 64)
      {
        // : - @
        containsInvalid = true;
      }
      else if(input.charCodeAt(i) > 90 && input.charCodeAt(i) < 97)
      {
        // [ - `
        containsInvalid = true;
      }
      else if(input.charCodeAt(i) > 122)
      {
        containsInvalid = true;
      }
    }
    resolve(containsInvalid);
  });
}

//  function for attempting to register the user to the DB
function register(inUsername, inEmail, inPassword, inFirstName, inLastName)
{
  return new Promise(function(resolve, reject)
  {
    var data = '{"username": "' + inUsername + '", "password": "' + inPassword + '", "email": "' + inEmail + '", "first_name": "' + inFirstName + '", "last_name": "' + inLastName + '"}';
    data = JSON.parse(data);
    var transport = {
      headers: {
        'Content-Type': "application/json"
      },
      method: "PUT",
      body: JSON.stringify(data)
    };
    const url = "//localhost:3001/api/register";
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
