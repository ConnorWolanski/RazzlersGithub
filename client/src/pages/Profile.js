import React from "react";
import '../style.css';

class Profile extends React.Component {
  constructor(props)
  {
    super(props)
    this.state = {
      id: 0,
      user: "",
      firstName: "",
      lastName: "",
      Email: "",
      Status: 0,
	  displayName: ""
    };
    checkParams().then(json => {
      this.setState({
        id: 0,
		user: json.user,
		firstName: "",
		lastName: "",
		Email: "",
		Status: 0,
		displayName: ""
      });
      var user = json.user;
      var set = {};
      getUserInfo(user).then(result => {
        set = result;
        if(set.hasOwnProperty("result"))
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
			Status: set.status,
			displayName: set.display
          });
        }
      });
    });
  }
  render() {
    const {id, user, firstName, lastName, Email, Status, displayName} = this.state;
    var loc = "";
    return (
      <div className ="bg2">
        <h2 className="centerText"><font  color = "black" size = "50"> {"Hello, " + user + "!"} </font></h2>
		<p className="centerText"><font  color ="black" size = "20px">{"Username: " + user}</font></p>
		<p className="centerText"><font  color ="black" size = "20px">{"Name: " + firstName + " " + lastName}</font></p>
		<p className="centerText"><font  color ="black" size = "20px">{"Email: " + Email}</font></p>
		<p className="centerText"><font  color ="black" size = "20px">{"Account Status: " + Status}</font></p>
		<p className="centerText"><font  color ="black" size = "20px">{"Display Name: " + displayName}</font></p> 
		<p className="centerText"><a href="../billing"><font color= "#d7e2e9" size = "20px">Click here to view billing information</font></a></p>
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
function getUserInfo(user)
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
    const url = "http://razzlers.me:3001/api/getData/getUserInfo";
    fetch(url, transport).then(result => result.json()).then(json => {
      resolve(json);
    }).catch(err => {
      throw new Error(err);
    });
  });
}

export default Profile