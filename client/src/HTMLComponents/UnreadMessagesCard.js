import React from 'react';
const utilFunc = require('../Helpers/UtilityFunctions');

class UnreadMessagesCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      unread: props.unread,
      username: window.localStorage.getItem("Razzlers_Username")
    };
    utilFunc.getUsernameFromID(props.unread.id).then(result =>{
      this.setState({username: result.username});
    })
  }

  render()
  {
    var {unread, username} = this.state;
    if(unread!= null){
      return (
        <div className="messageCard" onClick = {() => {
            document.getElementById("messageTitle").innerHTML = username;
            document.getElementById("unreadMessages").hidden = true;
            document.getElementById("friends").hidden = true;
            document.getElementById("addFriends").hidden = true;
            document.getElementById("messages").hidden = false;
            document.getElementById("messageSelected").hidden = false;
            setTimeout(function()
            {
              document.getElementById('bottom').scrollIntoView({behavior: "auto"});
            }, 300);
          }}>
          <font>{username + ": "}</font>
          <font className = "innermessageCount">{unread.count}</font> <br/>
          <font>{unread.body}</font>
        </div>);}
      else{
        return (<div/>)
      }
  }
}

export default UnreadMessagesCard;
