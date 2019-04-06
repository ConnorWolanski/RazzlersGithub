import React from "react";
import '../style.css';

class Footer extends React.Component
{
  render()
  {
    var username = window.localStorage.getItem("Razzlers_Username");
    if(username === null)
    {
      // friends list is hidden
      return (
        <div></div>
      );
    } else {
      // is logged in, show friends
      getUsersFriends(username);
      getUsersMessages(username);
      return (
        <div>

        </div>
      );
    }
  }
}

function getUsersFriends(username)
{
  return new Promise(function(resolve, reject)
  {
    var data = '{"username": "' + username + '"}';
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

function getUsersMessages(username)
{
  return new Promise(function(resolve, reject)
  {
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

export default Footer
