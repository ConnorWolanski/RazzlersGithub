import React from 'react';
import envelope from '../images/envelope.png';
const utilFunc = require('../Helpers/UtilityFunctions');

class FriendCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: props,
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
            console.log("added");
          }}>+</button>
        <button className="iconButton" hidden ={!areFriends} onClick={() => {
            document.getElementById("messages").hidden = !document.getElementById("messages").hidden;
            document.getElementById("messageTitle").innerHTML = username;
            document.getElementById("friends").hidden = true;
            document.getElementById("addFriends").hidden = true;
            utilFunc.forceUpdateMessages();
          }}>
          <img src={envelope} alt="envelope"/>
        </button>
      </div>);
  }
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
