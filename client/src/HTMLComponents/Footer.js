import React from "react";
import '../style.css';
import envelope from '../images/envelope.png';
import friends from '../images/friends.png';
import close from '../images/close.png';

class Footer extends React.Component
{

  render()
  {
    var username = window.localStorage.getItem("Razzlers_Username");
    if(username !== null)
    {
      getUsersFriends(username);
      return (
        <div>
          <div className="footerMenu" hidden = "true" id="friends">
            <h1 className="menuTitle">
              <font color= "white">Friends</font>
              <button className="iconButton" onClick={() => document.getElementById("friends").hidden=true}>
                <img src = {close}/>
              </button>
            </h1>
            <form role="search">
              <input type="text" className= "userSearch" placeholder="Search Users" id = "search"/>
            </form>
            <ul>
              <li>hello</li>
              <li>I am</li>
              <li>connor</li>
            </ul>
          </div>
          <div className="footerMenu" hidden = "true" id="messages">
            <h1 className="menuTitle">
              <font color= "white">Messages</font>
              <button className="iconButton" onClick={() => document.getElementById("messages").hidden=true}>
                <img src = {close}/>
              </button>
            </h1>
            <font>hello this is a message from the devolpers</font>
            <form className= "typeMessage">
              <input type="text" className="messageText" placeholder="text message"/>
              <button type="button" className="sendButton">Send</button>
            </form>
          </div>
          <div className="footer">
            <button className = "iconButton" onClick={() =>
                {
                  document.getElementById("friends").hidden=!document.getElementById("friends").hidden;
                  document.getElementById("messages").hidden=true;
                }}>
              <img src = {friends}/>
            </button>
            <button className = "iconButton" onClick={() =>
                {
                  document.getElementById("messages").hidden=!document.getElementById("messages").hidden;
                  document.getElementById("friends").hidden=true;
                }}>
              <img src = {envelope}/>
            </button>
          </div>
        </div>
      );
    }
    return(
      <div>
      </div>
    )
  }
}
function getUsersFriends(user)
{
  return new Promise(function(resolve, reject)
  {
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
      console.log(json);
      resolve(json);
    }).catch(err => {
      throw new Error(err);
    });
  });
}

export default Footer
