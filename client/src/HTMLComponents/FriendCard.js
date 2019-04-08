import React from 'react';
import envelope from '../images/envelope.png';
const utilFunc = require('../Helpers/UtilityFunctions');

class FriendCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: props
    };
  }

  render() {
    const {username} = this.props;
    var areFriends = checkIfFriends(username);
    return (<div className="friendCard">
      <font>{username}</font>
      <button className="iconButton" hidden={!areFriends}>+</button>
      <button className="iconButton" hidden ={areFriends} onClick={() => {
          document.getElementById("messages").hidden = !document.getElementById("messages").hidden;
          document.getElementById("messagetitle").innerHTML = username;
          document.getElementById("friends").hidden = true;
          document.getElementById("addFriends").hidden = true;
        }}>
        <img src={envelope} alt="envelope"/>
      </button>
    </div>);
  }
}
function checkIfFriends(username) {
  utilFunc.getUsersFriends(window.localStorage.getItem("Razzlers_Username")).then(friendsList => {
    var areFriends = false;
    if (friendsList.friends.includes(username) || username.toLowerCase() === window.localStorage.getItem("Razzlers_Username").toLowerCase()) {
      areFriends = true;
    }
    return areFriends;
  })
}
export default FriendCard;
