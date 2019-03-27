import React from "react";
import '../style.css';

class Billing extends React.Component
{
  constructor(props)
  {
    super(props)
    this.state = {
	  user: "",
	  userID: 0,
      billingID: 0,
      name: "",
      CCNumber: 0,
	  exp: 0,
      CVC: 0,
      address: "",
	  date: 0,
	  hasBillingInfo: false
    };
    checkParams().then(json => {
      this.setState({
		user: json.user,
		userID: 0,
		billingID: 0,
		name: "",
		CCNumber: 0,
		exp: 0,
		CVC: 0,
		address: "",
		date: 0,
		hasBillingInfo: false
      });
      var user = json.user;
      var set = {};
      getUserBilling(user).then(result => {
        set = result;
        if(set.hasOwnProperty("result"))
        {
			console.log("file doesnt exist!");
        } else {
          // parse good response into constants for current state
		  this.setState({
			user: json.user,
            userID: set.uID,
			billingID: set.bID,
			name: set.bName,
			CCNumber: set.ccN,
			exp: set.expD,
			CVC: set.cvc,
			address: set.bAddress,
			date:set.bDate,
			hasBillingInfo: set.hasBillingInfo
          });
        }
      });
    });
  }
  render() {
    var hasBillingInfo = false;
    return (
      <div className ="bg2">
		<p hidden id="invalidMessage">
          <font className="error">Username or password is invalid, please try again!</font>
        </p>

		<p hidden id="blankSpacesMessage">
          <font className="error">Please fill out all required sections and try again!</font>
        </p>

		<p className="centerText"><font  color ="black" size = "20px">{"Please enter your billing information"}</font></p>

		<input
          type="text"
          placeholder="Name"
          className="input"
          id="billingNameInput"/>
        <input
          type="password"
          placeholder="Credit Card Number"
          className="input"
          id="CCNumberInput"/>
        <input
          type="text"
          placeholder="Expiration Date"
          className="input"
          id="expirationDateInput"/>
        <input
          type="text"
          placeholder="CVC"
		  className="input"
          id="cvcInput"/>
        <input
          type="text"
          placeholder="Address"
          className="input"
          id="billingAddressInput"/>
        <button className="button2" id="submitButton" onClick={() =>
          {
            var hadError = false;
            if(document.getElementById("billingNameInput").value.trim() === "" || document.getElementById("CCNumberInput").value.trim() === "" ||
                document.getElementById("expirationDateInput").value.trim() === "" || document.getElementById("cvcInput").value.trim() === "" ||
                document.getElementById("billingAddressInput").value.trim() === "")
            {
              document.getElementById("blankSpacesMessage").hidden=false;
              hadError = true;
            } else {
              document.getElementById("blankSpacesMessage").hidden=true;
            }
            if(hadError === true)
            {
              return;
            }

			if(hasBillingInfo){
				updateBilling(document.getElementById("billingNameInput").value,
				document.getElementById("CCNumberInput").value,
				document.getElementById("expirationDateInput").value,
				document.getElementById("cvcInput").value,
				document.getElementById("billingAddressInput").value).then(response => {
               if(response.result === "true")
               {
                 // Update was successful
                 window.location.href='/billing';
               } else {
                 // display error, reprompt for information
                 document.getElementById("invalidMessage").hidden=false;
               }
             });
			}

			else if (!hasBillingInfo) {
				addBilling(document.getElementById("billingNameInput").value,
				document.getElementById("CCNumberInput").value,
				document.getElementById("expirationDateInput").value,
				document.getElementById("cvcInput").value,
				document.getElementById("billingAddressInput").value).then(response => {
               if(response.result === "true")
               {
                 // Update was successful
                 window.location.href='/billing';
               } else {
                 // display error, reprompt for information
                 document.getElementById("invalidMessage").hidden=false;
               }
             });
			}
          }}>Submit</button>
      </div>
    );
  }
}


function checkParams()
{
  return new Promise(function(resolve, reject)
  {
	var user = window.localStorage.getItem("Razzlers_Username");
    resolve({user});
  });
}

function getUserBilling(user)
{
  return new Promise(function(resolve, reject)
  {
    var data = '{"user": "' + user + '"}';
    data = JSON.parse(data);
    var transport = {
      headers: {
        'Content-Type': "application/json"
      },
      method: "PUT",
      body: JSON.stringify(data)
    };
    const url = "http://razzlers.me:3001/api/getData/getUserBilling";
    fetch(url, transport).then(result => result.json()).then(json => {
      resolve(json);
    }).catch(err => {
      throw new Error(err);
    });
  });
}

function updateBilling(inName, inCCN, inExp, inCvc, inAddress)
{
  return new Promise(function(resolve, reject)
  {
	var user = window.localStorage.getItem("Razzlers_Username");
    var data = '{"name": "' + inName + '", "ccn": "' + inCCN + '", "exp": "' + inExp + '", "cvc": "' + inCvc + '", "address": "' + inAddress + '", "username": "' + user + '"}';
    data = JSON.parse(data);
    var transport = {
      headers: {
        'Content-Type': "application/json"
      },
      method: "PUT",
      body: JSON.stringify(data)
    };
    const url = "http://razzlers.me:3001/api/updateBilling";
    fetch(url, transport).then(response => response.json()).then(json =>
      {
        // needs to return true or false based on if registration is successful
        // if true, return true and set username in localStorage
        // if false, return what went wrong, if multiple things, put inside array[]
        resolve(json);
      });
  });
}

function addBilling(inName, inCCN, inExp, inCvc, inAddress)
{
  return new Promise(function(resolve, reject)
  {
	var user = window.localStorage.getItem("Razzlers_Username");
    var data = '{"name": "' + inName + '", "ccn": "' + inCCN + '", "exp": "' + inExp + '", "cvc": "' + inCvc + '", "address": "' + inAddress + '", "username": "' + user + '"}';
    data = JSON.parse(data);
    var transport = {
      headers: {
        'Content-Type': "application/json"
      },
      method: "PUT",
      body: JSON.stringify(data)
    };
    const url = "http://razzlers.me:3001/api/addBilling";
    fetch(url, transport).then(response => response.json()).then(json =>
      {
        // needs to return true or false based on if registration is successful
        // if true, return true and set username in localStorage
        // if false, return what went wrong, if multiple things, put inside array[]
        resolve(json);
      });
  });
}
export default Billing
