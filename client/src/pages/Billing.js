import React from "react";
import '../style.css';

class Billing extends React.Component {
  constructor(props) {
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
        hasBillingInfo: false,
        censoredCCN: 0
      });
      var user = json.user;
      var set = {};
      getUserBilling(user).then(result => {
        set = result;
        if (set.hasOwnProperty("result")) {
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
            date: set.bDate,
            hasBillingInfo: set.hasBillingInfo,
            censoredCCN: set.ccN.replace(/\d(?=\d{4})/g, "*")
          });
        }
      });
    });
  }
  render() {
    const {
      user,
      userID,
      billingID,
      name,
      censoredCCN,
      exp,
      CVC,
      address,
      date,
      hasBillingInfo
    } = this.state;
    console.log(user + " " + userID + " " + billingID);
    return (
      <div className ="bg2_center">
        <div>
          {hasBillingInfo ? (
            <div>
              <h2 className="centerText"><font  color = "black" size = "50"> {"Billing Information"} </font></h2>
              <p className="centerText"><font  color ="black" size = "20px"><b>Name on card: </b>{name}</font></p>
              <p className="centerText"><font  color ="black" size = "20px"><b>Credit Card Number: </b>{censoredCCN}</font></p>
              <p className="centerText"><font  color ="black" size = "20px"><b>Expiration Date: </b>{exp}</font></p>
              <p className="centerText"><font  color ="black" size = "20px"><b>CVV: </b>{CVC}</font></p>
              <p className="centerText"><font  color ="black" size = "20px"><b>Billing Address: </b>{address}</font></p>
              <p className="centerText"><font  color ="black" size = "20px"><b>Billing Date: </b>{date} of every month</font></p>
              <p className="centerText"><a href="/editBilling" ><font color= "#d7e2e9">Click here to edit it!</font></a></p>
            </div>
          ) : (
    		<div>
      		  <h2 className="centerText"><font  color = "black" size = "50"> {"Billing Information"} </font></h2>
      		  <p className="centerText"><font  color ="red" size = "20px">{"You do not have any billing information in file"}</font></p>
      		  <p className="centerText"><a href="/editBilling" ><font color= "#d7e2e9">Click here to add it!</font></a></p>
    		</div>
          )}
        </div>
      </div>
    );
  }
}
function checkParams() {
  return new Promise(function(resolve, reject) {
    var user = window.localStorage.getItem("Razzlers_Username");
    resolve({user});
  });
}

function getUserBilling(user) {
  return new Promise(function(resolve, reject) {
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

export default Billing
