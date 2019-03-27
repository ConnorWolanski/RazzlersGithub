import React from "react";
import '../style.css';
class Home extends React.Component
{
  render()
  {
    printTest();
    return (
      <div>
      <h2><font color ="white" size = "50">Home</font></h2>
      <button className="button2" onClick={() =>
        {
          console.log(setSubsToTen());
        }}> Test Subscriptions </button>
      <button className="button2" onClick={() =>
        {
          console.log(resetSubs());
        }}> Reset Subscriptions </button>
      </div>
    );
  }
}

function setSubsToTen()
{
  // sets total sub to 10 in userDB
  return new Promise(function(resolve, reject)
  {
    // resolves with object in format {result: true|false} which comes directly from server
    var username = window.localStorage.getItem("Razzlers_Username");
    var data = '{"username": "' + username + '"}';
    data = JSON.parse(data);
    var transport = {
      headers: {
        'Content-Type': "application/json"
      },
      method: "PUT",
      body: JSON.stringify(data)
    };
    const url = "http://localhost:3001/api/getData/setSubs";
    fetch(url, transport).then(result => result.json()).then(json =>
    {
      resolve(json);
    }).catch(err => {
      throw new Error(err);
    });
  });
}

function resetSubs()
{
  // clears subscriptions
  return new Promise(function(resolve, reject)
  {
    // resolves with object in format {result: true|false} which comes directly from server
    var username = window.localStorage.getItem("Razzlers_Username");
    var data = '{"username": "' + username + '"}';
    data = JSON.parse(data);
    var transport = {
      headers: {
        'Content-Type': "application/json"
      },
      method: "PUT",
      body: JSON.stringify(data)
    };
    const url = "http://localhost:3001/api/getData/resetSubs";
    fetch(url, transport).then(result => result.json()).then(json =>
    {
      window.localStorage.setItem("Razzlers_Subscribed_Shows", null);
      window.localStorage.setItem("Razzlers_Subscribed_Movies", null);
      resolve(json);
    }).catch(err => {
      throw new Error(err);
    });
  });
}

function printTest()
{
  console.log(localStorage.getItem("Razzlers_Subscribed_Shows") + " : " + localStorage.getItem("Razzlers_Subscribed_Movies"));
}

export default Home
