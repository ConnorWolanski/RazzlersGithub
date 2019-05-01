import React from "react";
import '../style.css';

class PlayVideo extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isMovie: false,
      id: 0,
      name: "",
      description: "",
      rating: 0,
      actors: "",
      release_year: 0
    };
    checkParams().then(json => {
      this.setState({
        isMovie: json.isMovie,
        id: json.id,
        name: "",
        description: "",
        rating: 0,
        actors: "",
        release_year: 0
      });
      var isMovie = json.isMovie;
      var id = json.id;
      var set = {};
      getVideoInfo(isMovie, id).then(result => {
        set = result;
        if (set.hasOwnProperty("result")) {
          // result from server didnt pull the correct file and it doesnt exist!
          console.log("file doesnt exist!");
        } else {
          // parse good response into constants for current state
          // {title, desc, rate, act, year};
          this.setState({
            isMovie: json.isMovie,
            id: json.id,
            name: set.title,
            description: set.desc,
            rating: set.rate,
            actors: set.act,
            release_year: set.year
          });
        }
      });
    });
  }
  render() {
    const {isMovie, id, name} = this.state;
    var loc = "";
    var isSubscribed = false;

    if (id !== 0) {
      if (isMovie === "true") {
        var movieList = JSON.parse(localStorage.getItem("Razzlers_Subscribed_Movies"));
        if (movieList !== null) {
          if (typeof movieList !== typeof 0) {
            isSubscribed = movieList.includes(parseInt(id, 10));
            loc = "//assets.razzlers.me/assets/videos/movies/" + id + ".mp4";
          }
        }
      } else {
        var showList = JSON.parse(localStorage.getItem("Razzlers_Subscribed_Shows"));
        if (showList !== null) {
          isSubscribed = showList.includes(parseInt(id, 10));
          loc = "//assets.razzlers.me/assets/videos/episodes/" + id + ".mp4";
        }
      }
    }
    console.log(isSubscribed);
    return (
      <div hidden={!isSubscribed}>
        <h2 className="centerText">
          <font color="white" size="50">
            {name}
          </font>
        </h2>
        <video className="center" width="720" height="480" controls="controls">
          <source src={loc} type="video/mp4"/>
        </video>
      </div>
    );
  }
}
//<p className="quarterLeft"><button className= "button">Previous Episode</button></p>

/*function subscribe(isMovie, id)
{
  return new Promise(function(resolve, reject)
  {
    // resolves with object in format {result: true|false} which comes directly from server
    var username = window.localStorage.getItem("Razzlers_Username");
    var data = '{"username": "' + username + '", "isMovie": "' + isMovie + '", "id": "' + id + '"}';
    data = JSON.parse(data);
    var transport = {
      headers: {
        'Content-Type': "application/json"
      },
      method: "PUT",
      body: JSON.stringify(data)
    };
    const url = "//razzlers.me:3001/api/getData/subscribeToShow";
    fetch(url, transport).then(result => result.json()).then(json =>
    {
      utilFunc.updateLocalSubscribedLists().then(output =>
      {
        resolve(json);
      });
    }).catch(err => {
      throw new Error(err);
    });
  });
}*/

// checks the params in the URL
function checkParams() {
  return new Promise(function(resolve, reject) {
    var url = window.location.href;
    url = new URL(url);
    var isMovie = url.searchParams.get("isMovie");
    var id = url.searchParams.get("id");
    resolve({isMovie, id});
  });
}
function getVideoInfo(isMovie, id) {
  return new Promise(function(resolve, reject) {
    var data = '{"isMovie": "' + isMovie + '", "id": "' + id + '"}';
    data = JSON.parse(data);
    var transport = {
      headers: {
        'Content-Type': "application/json"
      },
      method: "PUT",
      body: JSON.stringify(data)
    };
    const url = "//razzlers.me:3001/api/getData/getVideoInfo";
    fetch(url, transport).then(result => result.json()).then(json => {
      resolve(json);
    }).catch(err => {
      throw new Error(err);
    });
  });
}

export default PlayVideo
