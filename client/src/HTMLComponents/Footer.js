import React from "react";
import '../style.css';
import envelope from '../images/envelope.png';
import Friends from '../images/friends.png';
import talk from '../images/talk.png';
import close from '../images/close.png';
import addfriend from '../images/add-friend.png';
import FriendsList from './FriendsList.js';
import MessageList from './MessageList.js';
import UnreadMessagesList from './UnreadMessagesList.js';
const utilFunc = require('../Helpers/UtilityFunctions');

var thisref = null;
class Footer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      friends: null,
      IDs: null,
      users: null,
      ids: null,
      defaultMessage: [],
      unreadMessages: [],
      unreadList: []
    };
    var username = window.localStorage.getItem("Razzlers_Username");
    if (username !== null) {
      utilFunc.getUsersFriends(username).then(friendsList => {
        this.setState({friends: friendsList.friends, IDs: friendsList.IDs, users: friendsList.friends, ids: friendsList.IDs});
      });
      utilFunc.getUnreadUsersMessages(username).then(messages => {
        getUnreadList(messages.messages).then(list => {
          this.setState({unreadMessages: messages.messages, unreadList: list})
        })
      })
    }
    thisref = this;
  }
  handler() {
    utilFunc.getUsersFriends(window.localStorage.getItem("Razzlers_Username")).then(friendsList => {
      this.setState({friends: friendsList.friends, IDs: friendsList.IDs, users: friendsList.friends, ids: friendsList.IDs});
    });
  }
  componentDidMount()
  {
    setTimeout(function()
    {
      updateUnreadMessages();
      if(document.getElementById("messageTitle") !== null && window.localStorage.getItem("Razzlers_Username") !== null)
      {
        updateMessages();
      }
    }, 1000);
  }
  render() {
    var {friends, IDs, users, ids, unreadMessages, unreadList} = this.state;
    var unread;
    if(unreadMessages.length>9){
      unread = "9+";
    }else{
      unread = unreadMessages.length ;
    }
    if (Array.isArray(friends)) {
      return (<div>
        <div className="footerMenu" hidden={true} id="messages">
          <h1 className="menuTitle">
            <font color="white" id ="messageTitle">{window.localStorage.getItem("Razzlers_Username")}</font>
            <font color="white" hidden = {false} id= "unread"> Messages</font>
            <button className="iconButton" onClick={() => {
                document.getElementById("messages").hidden = true;
              }}>
              <img src={close} alt="close"/>
            </button>
          </h1>
          <div className="autoFlow" id="messageBox" >
            <MessageList id="textMessages" messageList={this.state.defaultMessage}></MessageList>
            <div id= "bottom" ></div>
          </div>
          <form className="typeMessage" >
            <input type="text" id="messageTyped" className="messageText" placeholder="text message" />
            <button type="submit" className="sendButton" onClick={() => {
                window.event.preventDefault();
                utilFunc.checkSpecialChars(document.getElementById("messageTyped").value).then(str => {sendMessage(document.getElementById("messageTitle").innerHTML, str).then(result => {
                  if(window.localStorage.getItem("Razzlers_Username").length > 0 && document.getElementById("messageTitle").innerHTML !== ""){
                  utilFunc.getUsersMessages(window.localStorage.getItem("Razzlers_Username"), document.getElementById("messageTitle").innerHTML).then(json => {
                    forceUpdateMessages();
                    document.getElementById('messageTyped').value = "";
                    setTimeout(function()
                    {
                      document.getElementById('bottom').scrollIntoView({behavior: "smooth"});
                    }, 150);
                  });}
                });
              });
              }}>Send</button>
          </form>
        </div>

        <div className="footerMenu" hidden={true} id="unreadMessages">
          <h1 className="menuTitle">
            <font color="white">Unread Messages</font>
            <button className="iconButton" onClick={() => document.getElementById("unreadMessages").hidden = true}>
              <img src={close} alt="close"/>
            </button>
          </h1>
          <UnreadMessagesList unreadList = {unreadList}></UnreadMessagesList>
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
            <FriendsList friends={friends} IDs={IDs} parent={this} handler = {this.handler.bind(this)}/>
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
              <FriendsList friends={users} IDs={ids} handler = {this.handler.bind(this)}/>
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
                document.getElementById("unreadMessages").hidden = true;
            }}>
            <img src={Friends} alt="friends"/>
          </button>

          <button className="iconButton" hidden = {unread===0} onClick={() => {
              document.getElementById("unreadMessages").hidden = !document.getElementById("unreadMessages").hidden;
              document.getElementById("friends").hidden = true;
              document.getElementById("messages").hidden = true;
              document.getElementById("addFriends").hidden = true;
              document.getElementById('bottom').scrollIntoView({behavior: "smooth"});
            }}>
            <img src={envelope} alt="envelope"/>
            <div className = "messageCount">{unread}</div>
          </button>

          <button className="iconButton" hidden = {true} id = "messageSelected" onClick={() => {
              document.getElementById("messages").hidden = !document.getElementById("messages").hidden;
              document.getElementById("friends").hidden = true;
              document.getElementById("addFriends").hidden = true;
              document.getElementById("unreadMessages").hidden = true;
              document.getElementById('bottom').scrollIntoView({behavior: "smooth"});
            }}>
            <img src={talk} alt="talk"/>
          </button>
        </div>

      </div>);
    }
    return (<div></div>)
  }
}
function getUnreadList(unreadMessages){
  return new Promise(function(resolve, reject){
    var list = []
    var listOfUsers = [];
    if(unreadMessages.length >0){
      listOfUsers.push(unreadMessages[0].user_id);
      list.push({id: unreadMessages[0].user_id, body: unreadMessages[0].message_body, count: 1});
    }
    for(var i = 1; i < unreadMessages.length; i++){
      if(listOfUsers.includes(unreadMessages[i].user_id)){
        for(var j = 0; j < list.length; j++){
          if(list[j].id === unreadMessages[i].user_id){
            list[j].count++;
            j = list.length;
          }
        }
      }else{
        listOfUsers.push(unreadMessages[i].user_id);
        list.push({id: unreadMessages[i].user_id, body: unreadMessages[i].message_body, count: 1});
      }
    }
    resolve(list);
  })
}

function updateUnreadMessages()
{
  if(window.localStorage.getItem("Razzlers_Username") != null){
    setTimeout(function()
    {
        utilFunc.getUnreadUsersMessages(window.localStorage.getItem("Razzlers_Username")).then(messages => {
          getUnreadList(messages.messages).then(list => {
            thisref.setState({unreadMessages: messages.messages, unreadList: list})
          })
        })
      updateUnreadMessages();
    }, 1000);
  }
}

function updateMessages()
{
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
  if(sender !== recip && recip.length>0)
  {
    utilFunc.getUsersMessages(sender, recip).then(messages => {
      thisref.setState({defaultMessage: messages.messages});
    });
    if(thisref.state.unreadMessages.length !== 0 && sender !== null && recip !== null && document.getElementById("messages").hidden === false){
      utilFunc.readUserMessages(recip, sender);
    }
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
