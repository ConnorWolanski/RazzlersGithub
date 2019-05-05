import React from "react";
import '../style.css';

class Profile extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      id: 0,
      user: "",
      firstName: "",
      lastName: "",
      Email: "",
      Status: 0,
    };
    checkParams().then(json => {
      this.setState({
        id: 0,
        user: json.user,
        firstName: "",
        lastName: "",
        Email: "",
        Status: 0,
      });
      var user = json.user;
      getUserInfo(user).then(set =>
      {
        if (set.hasOwnProperty("result"))
        {
          // result from server didnt pull the correct file and it doesnt exist!
          console.log("file doesnt exist!");
        } else {
          // parse good response into constants for current state
          this.setState({
            user: json.user,
            id: set.id,
            firstName: set.first,
            lastName: set.last,
            Email: set.email,
            Status: set.status
          });
        }
      });
    });
  }
  render() {
    const { user, firstName, lastName, Email, Status } = this.state;
    return (
      <div>
        <div className= "modal_center" hidden= {true} id = "confirmSub">
          <font>Confirm Subscription</font>
          <button className= "button" onClick ={() => {
            document.getElementById("confirmSub").hidden=true;
            startSubscription().then(result =>
            {
              getUserInfo(user).then(set =>
              {
                if (!set.hasOwnProperty("result")){
                  this.setState({
                    Status: set.status
                  });
                }
              });
              console.log(result);
            });
            }
          }>Yes</button>
          <button className= "button" onClick = {() =>
          {
            document.getElementById("confirmSub").hidden=true;
          }}>No</button>
        </div>
        <div className= "modal_center" hidden= {true} id = "confirmAdd">
          <font>Confirm add 1 slot</font>
          <button className= "button" onClick ={() => {
            document.getElementById("confirmAdd").hidden=true;
            addOneToSlots().then(result =>
            {
              getUserInfo(user).then(set =>
              {
                if (!set.hasOwnProperty("result")){
                  this.setState({
                    Status: set.status
                  });
                }
              });
              console.log(result);
            });
            }
            }>Yes</button>
          <button className= "button" onClick = {() =>
          {
            document.getElementById("confirmAdd").hidden=true;
          }}>No</button>
        </div>
        <div className= "modal_center" hidden= {true} id = "confirmEnd">
          <font>Confirm Cancel</font>
          <button className= "button" onClick ={() => {
            document.getElementById("confirmEnd").hidden=true;
            resetSubs().then(result =>
            {
              this.setState({Status: "Inactive"});
              console.log(result);
            });
            }
            }>Yes</button>
          <button className= "button" onClick = {() =>
          {
            document.getElementById("confirmEnd").hidden=true;
          }}>No</button>
        </div>
      <div className="bg2_center">
      <h2 className="centerText">
        <font color="black" size="50">{"Hello, " + user + "!"}</font>
      </h2>
      <p className="centerText">
        <font color="black" size="20px">{"Username: " + user}</font>
      </p>
      <p className="centerText">
        <font color="black" size="20px">{"Name: " + firstName + " " + lastName}</font>
      </p>
      <p className="centerText">
        <font color="black" size="20px">{"Email: " + Email}</font>
      </p>
      <p className="centerText">
        <font color="black" size="20px">{"Account Status: " + Status}</font>
      </p>
      <p className="centerText">
        <a href="../billing">
          <font color="#d7e2e9" size="20px">Click here to view billing information</font>
        </a>
      </p>
      <button className="button2" hidden = {Status!=="Inactive"} onClick={() =>
        {
          document.getElementById("confirmSub").hidden=false;
        }}>Start Subscriptions</button>
      <button className="button2" hidden = {Status==="Inactive"} onClick={() =>
        {
        document.getElementById("confirmAdd").hidden=false;
        }}>Add one to sub slots</button>
      <button className="button2" hidden = {Status==="Inactive"} onClick={() =>
        {
          document.getElementById("confirmEnd").hidden=false;
        }}>End Subscriptions</button>
    </div>
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
function getUserInfo(user) {
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
    const url = "//localhost:3001/api/getData/getUserInfo";
    fetch(url, transport).then(result => result.json()).then(json => {
      resolve(json);
    }).catch(err => {
      throw new Error(err);
    });
  });
}

function startSubscription()
{
  var username = window.localStorage.getItem("Razzlers_Username");
  var data = '{"username": "' + username + '"}';
  data = JSON.parse(data);
  return new Promise(function(resolve, reject)
  {
    var transport = {
      headers: {
        'Content-Type': "application/json"
      },
      method: "PUT",
      body: JSON.stringify(data)
    };
    const url = "//localhost:3001/api/getData/subscribe";
    fetch(url, transport).then(result => result.json()).then(json =>
    {
      resolve(json);
    }).catch(err => {
      throw new Error(err);
    });
  });
}

function addOneToSlots()
{
  var username = window.localStorage.getItem("Razzlers_Username");
  var data = '{"username": "' + username + '"}';
  data = JSON.parse(data);
  return new Promise(function(resolve, reject)
  {
    var transport = {
      headers: {
        'Content-Type': "application/json"
      },
      method: "PUT",
      body: JSON.stringify(data)
    };
    const url = "//localhost:3001/api/getData/addOneSub";
    fetch(url, transport).then(result => result.json()).then(json =>
    {
      resolve(json);
    }).catch(err => {
      throw new Error(err);
    });
  });
}

function resetSubs()
{
  // clears subscriptions
  return new Promise(function(resolve, reject)
  {
    // resolves with object in format {result: true|false} which comes directly from server
    var username = window.localStorage.getItem("Razzlers_Username");
    var data = '{"username": "' + username + '"}';
    data = JSON.parse(data);
    var transport = {
      headers: {
        'Content-Type': "application/json"
      },
      method: "PUT",
      body: JSON.stringify(data)
    };
    const url = "//localhost:3001/api/getData/resetSubs";
    fetch(url, transport).then(result => result.json()).then(json =>
    {
      window.localStorage.setItem("Razzlers_Subscribed_Shows", null);
      window.localStorage.setItem("Razzlers_Subscribed_Movies", null);
      resolve(json);
    }).catch(err => {
      throw new Error(err);
    });
  });
}

export default Profile
