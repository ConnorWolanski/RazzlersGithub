import React from "react";
import '../style.css';
import envelope from '../images/envelope.png';
import Friends from '../images/friends.png';
import close from '../images/close.png';
import addfriend from '../images/add-friend.png';
import FriendsList from './FriendsList.js';
import MessageList from './MessageList.js'
const utilFunc = require('../Helpers/UtilityFunctions');

var thisref = null;
var counter = 0;
class Footer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      friends: null,
      IDs: null,
      users: null,
      ids: null,
      defaultMessage: []
    };
    var username = window.localStorage.getItem("Razzlers_Username");

    if (username !== null) {
      utilFunc.getUsersFriends(username).then(friendsList => {
        this.setState({friends: friendsList.friends, IDs: friendsList.IDs, users: friendsList.friends, ids: friendsList.IDs});
      });
    }
    thisref = this;
  }
  componentDidMount()
  {
    setTimeout(function()
    {
      if(document.getElementById("messageTitle") !== null)
      {
        updateMessages();
      } else {
        console.log("Is not logged in.");
      }
    }, 1000);
  }
  render() {
    var {friends, IDs, users, ids} = this.state;
    if (Array.isArray(friends)) {
      return (<div>
        <div className="footerMenu" hidden={true} id="messages">
          <h1 className="menuTitle">
            <font color="white" id ="messageTitle">{window.localStorage.getItem("Razzlers_Username")}</font>
            <button className="iconButton" onClick={() => {
                document.getElementById("messages").hidden = true;
              }}>
              <img src={close} alt="close"/>
            </button>
          </h1>
          <div className="autoFlow" id="messageBox">
            <MessageList id="textMessages" messageList={this.state.defaultMessage}></MessageList>
            <div id= "bottom"></div>
          </div>
          <form className="typeMessage">
            <input type="text" id="messageTyped" className="messageText" placeholder="text message"/>
            <button type="submit" className="sendButton" onClick={() => {
                window.event.preventDefault();
                sendMessage(document.getElementById("messageTitle").innerHTML, document.getElementById("messageTyped").value).then(result => {
                  utilFunc.getUsersMessages(window.localStorage.getItem("Razzlers_Username"), document.getElementById("messageTitle").innerHTML).then(json => {
                    counter = 0;
                    forceUpdateMessages();
                    document.getElementById('messageTyped').value = "";
                  });
                });
              }}>Send</button>
          </form>
        </div>

        <div className="footerMenu" hidden={true} id="friends">
          <h1 className="menuTitle">
            <font color="white">Friends</font>
            <button className="iconButton" onClick={() => document.getElementById("friends").hidden = true}>
              <img src={close} alt="close"/>
            </button>
            <button className="iconButton" onClick={() => {
                document.getElementById("friends").hidden = true;
                document.getElementById("addFriends").hidden = false;
              }}>
              <img src={addfriend} alt="add friends"/>
            </button>
          </h1>
          <div className="autoFlow">
            <FriendsList friends={friends} IDs={IDs} parent={this}/>
          </div>
        </div>


        <div className="footerMenu" hidden={true} id="addFriends">
          <h1 className="menuTitle">
            <font color="white">Add Friends</font>
            <button className="iconButton" onClick={() =>
              {
                var username = window.localStorage.getItem("Razzlers_Username");
                if (username !== null) {
                  utilFunc.getUsersFriends(username).then(friendsList => {
                    this.setState({friends: friendsList.friends, IDs: friendsList.IDs, users: friendsList.friends, ids: friendsList.IDs});
                  });
                }
                document.getElementById("addFriends").hidden = true;
              }}>
              <img src={close} alt="close"/>
            </button>
          </h1>
          <input type="text" className="userSearch" placeholder="Search Users" id="search1" onChange={()=>
              searchUsers(document.getElementById("search1").value).then(userlist => {
                users = userlist.users.users;
                ids = userlist.users.IDs;
                this.setState({users:users, ids: ids});
              })}/>
            <div id="dhold">
              <FriendsList friends={users} IDs={ids} parent={this}/>
            </div>
        </div>

        <div className="footer">
          <button className="iconButton" onClick={() =>
              {
                var username = window.localStorage.getItem("Razzlers_Username");
                if (username !== null) {
                  forceUpdateMessages();
                }
                document.getElementById("friends").hidden = !document.getElementById("friends").hidden;
                document.getElementById("messages").hidden = true;
                document.getElementById("addFriends").hidden = true;
            }}>
            <img src={Friends} alt="friends"/>
          </button>
          <button className="iconButton" onClick={() => {
              document.getElementById("messages").hidden = !document.getElementById("messages").hidden;
              document.getElementById("friends").hidden = true;
              document.getElementById("addFriends").hidden = true;
              document.getElementById('bottom').scrollIntoView({behavior: "smooth"});
            }}>
            <img src={envelope} alt="envelope"/>
          </button>
        </div>

      </div>);
    }
    return (<div></div>)
  }
}

function updateMessages()
{
  counter++;
  if(counter < 2){
    document.getElementById('bottom').scrollIntoView({behavior: "smooth"});
  }
  forceUpdateMessages();
  setTimeout(function()
  {
   updateMessages();
 }, 100);
}

function forceUpdateMessages()
{
  var sender = window.localStorage.getItem("Razzlers_Username");
  var recip = document.getElementById("messageTitle").innerHTML;
  if(sender !== recip)
  {
    utilFunc.getUsersMessages(sender, recip).then(messages => {
      thisref.setState({defaultMessage: messages.messages});
    });
  }
}

function sendMessage(recipient, messageText)
{
  return new Promise(function(resolve, reject) {
    var data = '{"sender": "' + window.localStorage.getItem("Razzlers_Username") + '", "recipient": "' + recipient + '", "message": "' + messageText + '"}';
    data = JSON.parse(data);
    var transport = {
      headers: {
        'Content-Type': "application/json"
      },
      method: "PUT",
      body: JSON.stringify(data)
    };
    const url = "http://razzlers.me:3001/api/sendMessage";
    fetch(url, transport).then(result => result.json()).then(json => {
      resolve(json);
    }).catch(err => {
      throw new Error(err);
    });
  });
}

function getUserList() {
  return new Promise(function(resolve, reject) {
    var transport = {
      headers: {
        'Content-Type': "application/json"
      },
      method: "GET"
    };
    const url = "http://razzlers.me:3001/api/getData/getUserList";
    fetch(url, transport).then(result => result.json()).then(json => {
      resolve(json);
    }).catch(err => {
      throw new Error(err);
    });
  });
}
function searchUsers(search) {
  return new Promise(function(resolve, reject) {
    getUserList().then(users => {
    var s = search.toLowerCase();
    for (var i = users.users.length - 1; i >= 0; i--) {
      if (!users.users[i].toLowerCase().includes(s)) {
        users.users.splice(i, 1);
        users.IDs.splice(i, 1);
      }
    }
    resolve({users});})
  });
}

export default Footer
