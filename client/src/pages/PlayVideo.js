import React from "react";
import '../style.css';

class PlayVideo extends React.Component {
  constructor(props)
  {
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
        if(set.hasOwnProperty("result"))
        {
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
    const {isMovie, id, name, description, rating, actors, release_year} = this.state;
    var loc = "";
    var isSubscribed = false;
    /*console.log(id);
    console.log(JSON.parse(localStorage.getItem("Razzlers_Subscribed_Shows")));
    console.log(localStorage.getItem("Razzlers_Subscribed_Shows"));
    console.log(parseInt(id, 10) ===);
    console.log(typeof JSON.parse(localStorage.getItem("Razzlers_Subscribed_Movies"))[0]);*/
    if(isMovie === "true")
    {
      isSubscribed = JSON.parse(localStorage.getItem("Razzlers_Subscribed_Movies")).includes(parseInt(id,10));
      loc = "//assets.razzlers.me/assets/videos/movies/" + id + ".mp4";
    } else {
      isSubscribed = JSON.parse(localStorage.getItem("Razzlers_Subscribed_Shows")).includes(parseInt(id,10));
      loc = "//assets.razzlers.me/assets/videos/episodes/" + id + ".mp4";
    }
    if(!isSubscribed)
    {
      // is NOT subscribed
      if(isMovie === "true"){
        loc = "//assets.razzlers.me/assets/thumbnails/movieThumbnails/" + id + ".jpg";
      }else{
        loc = "//assets.razzlers.me/assets/thumbnails/showThumbnails/" + id + ".jpg";
      }
      return (
        <div>
          <h2 className="centerText"><font  color = "white" size = "50"> {name} </font></h2>
          <p className="centerText"><font  color ="white" size = "20px">{"(" + release_year + ") " + rating + "/10, " + description + "\n" + actors}</font></p>
          <img className="center" src={loc} alt="background"/>
          <p className="centerText" hidden = {isSubscribed}><font color = "white" size = "50">Subscribe to Watch Video</font></p>
          <button hidden ={isSubscribed} className="subButton">Subscribe</button>
        </div>
      );
    } else {
      // is subscribed
      return (
        <div>
          <h2 className="centerText"><font  color = "white" size = "50"> {name} </font></h2>
          <video className="center" width="720" height="480"   controls>
            <source src={loc} type="video/mp4"/>
          </video>
          <p className="centerText"><font  color ="white" size = "20px">{"(" + release_year + ") " + rating + "/10, " + description + "\n" + actors}</font></p>
        </div>
      );
    }
  }
}
  //<p className="quarterLeft"><button className= "button">Previous Episode</button></p>
function checkParams()
{
  return new Promise(function(resolve, reject)
  {
    var url = window.location.href;
    url = new URL(url);
    var isMovie = url.searchParams.get("isMovie");
    var id = url.searchParams.get("id");
    resolve({isMovie, id});
  });
}
function getVideoInfo(isMovie, id)
{
  return new Promise(function(resolve, reject)
  {
    var data = '{"isMovie": "' + isMovie + '", "id": "' + id + '"}';
    data = JSON.parse(data);
    var transport = {
      headers: {
        'Content-Type': "application/json"
      },
      method: "PUT",
      body: JSON.stringify(data)
    };
    const url = "http://localhost:3001/api/getData/getVideoInfo";
    fetch(url, transport).then(result => result.json()).then(json => {
      resolve(json);
    }).catch(err => {
      throw new Error(err);
    });
  });
}

export default PlayVideo
