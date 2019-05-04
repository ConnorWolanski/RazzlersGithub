import React from 'react';
import envelope from '../images/envelope.png';
const utilFunc = require('../Helpers/UtilityFunctions');

class FriendCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: props.username,
      isFriends: false
    };
    checkIfFriends(this.props).then(boolFriend => {
      this.setState({isFriends: boolFriend.areFriends});
    });
  }

  render()
  {
    const {username} = this.props;
    const areFriends = this.state.isFriends;
    return (
      <div className="friendCard">
        <font>{username}</font>
        <button className="addButton" hidden={areFriends} onClick={() => {
            addFriend(username).then(result => {
              checkIfFriends({"username": username}).then(boolFriend => {
                this.setState({isFriends: boolFriend.areFriends});
                document.getElementById("friends").hidden = false;
                document.getElementById("addFriends").hidden = true;
                this.props.handler();
              });
            });
          }}>+</button>
        <button className="iconButton" hidden ={!areFriends} onClick={() => {
            document.getElementById("messageTitle").innerHTML = username;
            document.getElementById("friends").hidden = true;
            document.getElementById("addFriends").hidden = true;
            document.getElementById("messages").hidden = false;
            document.getElementById("messageSelected").hidden = false;
            setTimeout(function()
            {
              document.getElementById('bottom').scrollIntoView({behavior: "auto"});
            }, 300);
          }}>
          <img src={envelope} alt="envelope"/>
        </button>
      </div>);
  }
}

function addFriend(addedFriend)
{
  return new Promise(function(resolve, reject) {
    var data = '{"username": "' + window.localStorage.getItem("Razzlers_Username") + '", "friend_username": "' + addedFriend + '"}';
    data = JSON.parse(data);
    var transport = {
      headers: {
        'Content-Type': "application/json"
      },
      method: "PUT",
      body: JSON.stringify(data)
    };
    const url = "http://razzlers.me:3001/api/addFriend";
    fetch(url, transport).then(result => result.json()).then(json => {
      resolve(json);
    }).catch(err => {
      throw new Error(err);
    });
  });
}

function checkIfFriends(username)
{
  return new Promise(function(resolve, reject)
  {
    utilFunc.getUsersFriends(window.localStorage.getItem("Razzlers_Username")).then(friendsList =>
    {
      var areFriends = false;
      if(friendsList.friends.includes(username.username) || username.username.toLowerCase() === window.localStorage.getItem("Razzlers_Username").toLowerCase()) {
        areFriends = true;
      }
      resolve({areFriends});
    });
  });
}

export default FriendCard;
