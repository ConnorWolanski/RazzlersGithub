import React from "react";
import '../style.css';
import envelope from '../images/envelope.png';
import Friends from '../images/friends.png';
import close from '../images/close.png';
import addfriend from '../images/add-friend.png';
import FriendsList from './FriendsList.js'
import FriendCard from './FriendCard';
import ReactDOMServer from 'react-dom/server';
const utilFunc = require('../Helpers/UtilityFunctions');

class Footer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      friends: null,
      IDs: null,
      users: null,
      ids: null
    };
    var username = window.localStorage.getItem("Razzlers_Username");

    if (username !== null) {
      utilFunc.getUsersFriends(username).then(friendsList => {
        this.setState({friends: friendsList.friends, IDs: friendsList.IDs, users: friendsList.friends, ids: friendsList.IDs});
      });
    }
  }
  render() {
    var {friends, IDs, users, ids} = this.state;
    if (Array.isArray(friends)) {
      return (<div>

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
          <FriendsList friends={friends} IDs={IDs}/>
        </div>


        <div className="footerMenu" hidden={true} id="addFriends">
          <h1 className="menuTitle">
            <font color="white">Add Friends</font>
            <button className="iconButton" onClick={() => document.getElementById("addFriends").hidden = true}>
              <img src={close} alt="close"/>
            </button>
          </h1>
          <input type="text" className="userSearch" placeholder="Search Users" id="search1" onChange={()=>
              searchUsers(document.getElementById("search1").value).then(userlist => {
                users = userlist.users.users;
                ids = userlist.users.IDs;
                document.getElementById("dhold").innerHTML= ReactDOMServer.renderToStaticMarkup(userList(users, ids));
              })}/>
            <div id="dhold">
              <FriendsList friends={users} IDs={ids}></FriendsList>
            </div>
        </div>


        <div className="footerMenu" hidden={true} id="messages">
          <h1 className="menuTitle">
            <font color="white">Messages</font>
            <button className="iconButton" onClick={() => document.getElementById("messages").hidden = true}>
              <img src={close} alt="close"/>
            </button>
          </h1>
          <font>hello this is a message from the devolpers</font>
          <form className="typeMessage">
            <input type="text" className="messageText" placeholder="text message"/>
            <button type="button" className="sendButton">Send</button>
          </form>
        </div>

        <div className="footer">
          <button className="iconButton" onClick={() => {
              document.getElementById("friends").hidden = !document.getElementById("friends").hidden;
              document.getElementById("messages").hidden = true;
              document.getElementById("addFriends").hidden = true;
              console.log(document.getElementById("dhold").hidden);
            }}>
            <img src={Friends} alt="friends"/>
          </button>
          <button className="iconButton" onClick={() => {
              document.getElementById("messages").hidden = !document.getElementById("messages").hidden;
              document.getElementById("friends").hidden = true;
              document.getElementById("addFriends").hidden = true;
            }}>
            <img src={envelope} alt="envelope"/>
          </button>
        </div>

      </div>);
    }
    return (<div></div>)
  }
}
function userList(friends, IDs)
{
  var friendsList = [];
  for(var i = 0; i < friends.length; i++)
  {
    friendsList[friendsList.length] = JSON.parse('{"username": "' + friends[i] + '", "key": "' + IDs[i] + '"}')
  }
  const finfriends = friendsList ? friendsList.map(current => (
    <div key={current.key}>
      <FriendCard username={current.username}/>
    </div>
  )) : null;
  return (
    <div>
      {finfriends}
    </div>
  );
}

function getUsersMessages(username) {
  return new Promise(function(resolve, reject) {
    var data = '{"username": "' + username + '"}';
    data = JSON.parse(data);
    var transport = {
      headers: {
        'Content-Type': "application/json"
      },
      method: "PUT",
      body: JSON.stringify(data)
    };
    const url = "http://localhost:3001/api/getData/getUsersMessages";
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
    const url = "http://localhost:3001/api/getData/getUserList";
    fetch(url, transport).then(result => result.json()).then(json => {
      resolve(json);
    }).catch(err => {
      throw new Error(err);
    });
  });
}
function applySearch(search){
  searchUsers(search).then(userlist => {
    document.getElementById("searchedUsers").friends = userlist.users.users;
    document.getElementById("searchedUsers").IDs = userlist.users.IDs;
    document.getElementById("searchedUsers").hidden = false;
  })
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
