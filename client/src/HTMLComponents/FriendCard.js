import React from 'react';
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
    return (
      <div className ="friendCard">
        <font>{username}</font>
      </div>
    );
  }
}
// function checkIfFriends(){
//   var areFriends=false;
//   var friends = utilFunc.getUsersFriends(window.localStorage.getItem("Razzlers_Username"));
//   if(friends.friends.includes(this.props)){
//     areFriends= true;
//   }
//   return areFriends;
// }
export default FriendCard;
