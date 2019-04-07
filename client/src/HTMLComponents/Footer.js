import React from "react";
import '../style.css';
import envelope from '../images/envelope.png';
import Friends from '../images/friends.png';
import close from '../images/close.png';
import addfriend from '../images/add-friend.png';
import FriendsList from './FriendsList.js'

class Footer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      friends: null,
      IDs: null
    };
    var username = window.localStorage.getItem("Razzlers_Username");
    if (username !== null) {
      getUsersFriends(username).then(friendsList => {
        //console.log(friendsList.friends[0]);
        this.setState({friends: friendsList.friends, IDs: friendsList.IDs});
      });
    }
  }
  render() {
    const {friends, IDs} = this.state;
    console.log(getUserList());
    //console.log(friends + " : " + IDs);
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
          <form role="search">
            <input type="text" className="userSearch" placeholder="Search Users" id="search"/>
          </form>
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
function getUsersFriends(user) {
  return new Promise(function(resolve, reject) {
    var data = '{"username": "' + user + '"}';
    data = JSON.parse(data);
    var transport = {
      headers: {
        'Content-Type': "application/json"
      },
      method: "PUT",
      body: JSON.stringify(data)
    };
    const url = "http://localhost:3001/api/getData/getUsersFriends";
    fetch(url, transport).then(result => result.json()).then(json => {
      //console.log(json);
      resolve(json);
    }).catch(err => {
      throw new Error(err);
    });
  });
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
      console.log(json);
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
      console.log(json);
      resolve(json);
    }).catch(err => {
      throw new Error(err);
    });
  });
}

/*function searchUsers(search) {
  return new Promise(function(resolve, reject) {
    var users = getUserList();
    var s = search.toLowerCase();
    for (var i = users.length - 1; i >= 0; i--) {
      if (!movies[i].movie_name.toLowerCase().includes(s)) {
        users.splice(i, 1);
      }
    }
    resolve({users});
  });
}*/

export default Footer
