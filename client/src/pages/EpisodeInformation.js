import React from "react";
import '../style.css';
import star from '../images/star.png';
import empty from '../images/starEmpty.png';
//import CommentsList from '../HTMLComponents/CommentsList.js'

const utilFunc = require('../Helpers/UtilityFunctions');

class EpisodeInformation extends React.Component {
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
      release_year: 0,
	  bodies: null
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
		utilFunc.getEpisodeComments(id).then(bodiesList => {
			this.setState({bodies: bodiesList.bodies});
			buildComments(bodiesList.bodies);
			//console.log(this.state.bodies);
		});
	 });
    });
}


  render() {
	var ratingInput = -1;
    const {isMovie, id, name, description, rating} = this.state;

    var loc = "";

      // is subscribed
      loc = "//assets.razzlers.me/assets/thumbnails/episodeThumbnails/" + id + ".jpg";

      return (
        <div>
          <h2 className="centerText"><font  color = "white" size = "50"> {name} </font></h2>
		  <div className="clearfix">
		  <img className="video_info_thumbnail" src={loc} alt="background"/>
		  <button className="subButton" onClick={() => window.location.href="playVideo?isMovie=" + isMovie + "&id=" + id}>Play Episode</button>
          <p className="video_info"><font  color ="white" size = "20px">{"Rating: " + rating + "/5\n"}<img src={star} alt="star"/></font>
		  <font  color ="white" size = "20px">{description}</font>
		  </p>
		  </div>


		 <h2 className="centerText"><font  color = "white" size = "50"> {"Leave Rating"} </font></h2>
		 <div id="images">
			 <button hidden className="ratingButton" id="starOneFilled" onClick={() => {
				  ratingInput = 1;
				  //console.log(ratingInput);
				  document.getElementById("starFiveFilled").hidden = true;
				  document.getElementById("starFiveEmpty").hidden = false;
				  document.getElementById("starFourFilled").hidden = true;
				  document.getElementById("starFourEmpty").hidden = false;
				  document.getElementById("starThreeFilled").hidden = true;
				  document.getElementById("starThreeEmpty").hidden = false;
				  document.getElementById("starTwoFilled").hidden = true;
				  document.getElementById("starTwoEmpty").hidden = false;
				  document.getElementById("starOneFilled").hidden = false;
				  document.getElementById("starOneEmpty").hidden = true}}>
			 <img src={star} alt="star"/>
			 </button>

			 <button hidden className="ratingButton" id="starTwoFilled" onClick={() => {
				  ratingInput = 2;
				  //console.log(ratingInput);
				  document.getElementById("starFiveFilled").hidden = true;
				  document.getElementById("starFiveEmpty").hidden = false;
				  document.getElementById("starFourFilled").hidden = true;
				  document.getElementById("starFourEmpty").hidden = false;
				  document.getElementById("starThreeFilled").hidden = true;
				  document.getElementById("starThreeEmpty").hidden = false;
				  document.getElementById("starTwoFilled").hidden = false;
				  document.getElementById("starTwoEmpty").hidden = true;
				  document.getElementById("starOneFilled").hidden = false;
				  document.getElementById("starOneEmpty").hidden = true}}>
			 <img src={star} alt="star"/>
			 </button>

			 <button hidden className="ratingButton" id="starThreeFilled" onClick={() => {
				  ratingInput = 3;
				  //console.log(ratingInput);
				  document.getElementById("starFiveFilled").hidden = true;
				  document.getElementById("starFiveEmpty").hidden = false;
				  document.getElementById("starFourFilled").hidden = true;
				  document.getElementById("starFourEmpty").hidden = false;
				  document.getElementById("starThreeFilled").hidden = false;
				  document.getElementById("starThreeEmpty").hidden = true;
				  document.getElementById("starTwoFilled").hidden = false;
				  document.getElementById("starTwoEmpty").hidden = true;
				  document.getElementById("starOneFilled").hidden = false;
				  document.getElementById("starOneEmpty").hidden = true}}>
			 <img src={star} alt="star"/>
			 </button>

			 <button hidden className="ratingButton" id="starFourFilled" onClick={() => {
				  ratingInput = 4;
				  //console.log(ratingInput);
				  document.getElementById("starFiveFilled").hidden = true;
				  document.getElementById("starFiveEmpty").hidden = false;
				  document.getElementById("starFourFilled").hidden = false;
				  document.getElementById("starFourEmpty").hidden = true;
				  document.getElementById("starThreeFilled").hidden = false;
				  document.getElementById("starThreeEmpty").hidden = true;
				  document.getElementById("starTwoFilled").hidden = false;
				  document.getElementById("starTwoEmpty").hidden = true;
				  document.getElementById("starOneFilled").hidden = false;
				  document.getElementById("starOneEmpty").hidden = true}}>
			 <img src={star} alt="star"/>
			 </button>

			 <button hidden className="ratingButton" id="starFiveFilled" onClick={() => {
				  ratingInput = 4;
				  //console.log(ratingInput);
				  document.getElementById("starFiveFilled").hidden = false;
				  document.getElementById("starFiveEmpty").hidden = true;
				  document.getElementById("starFourFilled").hidden = false;
				  document.getElementById("starFourEmpty").hidden = true;
				  document.getElementById("starThreeFilled").hidden = false;
				  document.getElementById("starThreeEmpty").hidden = true;
				  document.getElementById("starTwoFilled").hidden = false;
				  document.getElementById("starTwoEmpty").hidden = true;
				  document.getElementById("starOneFilled").hidden = false;
				  document.getElementById("starOneEmpty").hidden = true}}>
			 <img src={star} alt="star"/>
			 </button>

			 <button className="ratingButton" id="starOneEmpty" onClick={() => {
				  ratingInput = 1;
				  document.getElementById("starOneFilled").hidden = false;
				  document.getElementById("starOneEmpty").hidden = true}}>
			 <img src={empty} alt="empty"/>
			 </button>
			 <button className="ratingButton" id="starTwoEmpty" onClick={() => {
				  ratingInput = 2;
				  document.getElementById("starTwoFilled").hidden = false;
				  document.getElementById("starTwoEmpty").hidden = true;
				  document.getElementById("starOneFilled").hidden = false;
				  document.getElementById("starOneEmpty").hidden = true}}>
			 <img src={empty} alt="empty"/>
			 </button>
			 <button className="ratingButton" id="starThreeEmpty" onClick={() => {
				  ratingInput = 3;
				  document.getElementById("starThreeFilled").hidden = false;
				  document.getElementById("starThreeEmpty").hidden = true;
				  document.getElementById("starTwoFilled").hidden = false;
				  document.getElementById("starTwoEmpty").hidden = true;
				  document.getElementById("starOneFilled").hidden = false;
				  document.getElementById("starOneEmpty").hidden = true}}>
			 <img src={empty} alt="empty"/>
			 </button>

			 <button className="ratingButton" id="starFourEmpty" onClick={() => {
				  ratingInput = 4;
				  document.getElementById("starFourFilled").hidden = false;
				  document.getElementById("starFourEmpty").hidden = true;
				  document.getElementById("starThreeFilled").hidden = false;
				  document.getElementById("starThreeEmpty").hidden = true;
				  document.getElementById("starTwoFilled").hidden = false;
				  document.getElementById("starTwoEmpty").hidden = true;
				  document.getElementById("starOneFilled").hidden = false;
				  document.getElementById("starOneEmpty").hidden = true}}>
			 <img src={empty} alt="empty"/>
			 </button>

			 <button className="ratingButton" id="starFiveEmpty" onClick={() => {
				  ratingInput = 5;
				  document.getElementById("starFiveFilled").hidden = false;
				  document.getElementById("starFiveEmpty").hidden = true;
				  document.getElementById("starFourFilled").hidden = false;
				  document.getElementById("starFourEmpty").hidden = true;
				  document.getElementById("starThreeFilled").hidden = false;
				  document.getElementById("starThreeEmpty").hidden = true;
				  document.getElementById("starTwoFilled").hidden = false;
				  document.getElementById("starTwoEmpty").hidden = true;
				  document.getElementById("starOneFilled").hidden = false;
				  document.getElementById("starOneEmpty").hidden = true}}>
			 <img src={empty} alt="empty"/>
			 </button>
		 </div>

		 <p hidden id="invalidMessage">
         <center><font className="error">An error has occurred, please try again!</font></center></p>
		 <p hidden id="blankSpacesMessage">
         <center><font className="error">Please select a star and try again!</font></center></p>

          <button className="subButton" id="submitButton" onClick={() =>
		  {
		  var hadError = false;
		  if(ratingInput === -1) {
                document.getElementById("blankSpacesMessage").hidden=false;
                hadError = true;
		  } else {
                document.getElementById("blankSpacesMessage").hidden=true;
            }
          if(hadError === true)
          {
                return;
          }

		  updateRatingEpisode(ratingInput, id).then(response => {
			if(response.result === "true") {
				// Update was successful
				window.location.href="episodeInformation?isMovie=" + isMovie + "&id=" + id;
            } else {
              // display error, reprompt for information
                    document.getElementById("invalidMessage").hidden=false;
              }
          });

		  updateUsersVotedEpisode(id).then(response => {
			if(response.result === "true") {
				// Update was successful
			} else {
			  // display error, reprompt for information
	     		document.getElementById("invalidMessage").hidden=false;
			}
		    });


		  }}>Submit Rating</button>

	<button className="subButton" id="cancelRatingButton" onClick={() => {
		ratingInput = -1;
		document.getElementById("starFiveFilled").hidden = true;
		document.getElementById("starFiveEmpty").hidden = false;
		document.getElementById("starFourFilled").hidden = true;
		document.getElementById("starFourEmpty").hidden = false;
		document.getElementById("starThreeFilled").hidden = true;
		document.getElementById("starThreeEmpty").hidden = false;
		document.getElementById("starTwoFilled").hidden = true;
		document.getElementById("starTwoEmpty").hidden = false;
		document.getElementById("starOneFilled").hidden = true;
		document.getElementById("starOneEmpty").hidden = false}
	}>Cancel Selection</button>

		<h2 className="centerText"><font  color = "white" size = "50"> {"Comments"} </font></h2>

		<div onload="buildComments();" data-role="fieldcontain" class="ui-hide-label" id="bodiesDiv"></div>

		<textarea id="commentInput" className="largeInput" rows="14" cols="10" wrap="soft"> </textarea>

		<p hidden id="invalidCommentMessage">
          <font className="error">Error submitting comment, please try again!</font></p>

		<button className="commentButton" id="submitComment" onClick={() => {
			if(document.getElementById("commentInput").value.trim() !== "") {
				addComment(document.getElementById("commentInput").value, id).then(response => {
                   if(response.result === "true")
                   {
                     // Update was successful
                     window.location.href="episodeInformation?isMovie=" + isMovie + "&id=" + id;
                   } else {
                     // display error, reprompt for information
                     document.getElementById("invalidCommentMessage").hidden=false;
                   }
                });
			}
		}}>Submit comment</button>

		</div>
      );
    }
  }

  //<p className="quarterLeft"><button className= "button">Previous Episode</button></p>

function updateUsersVotedEpisode(videoId)
{
  return new Promise(function(resolve, reject)
  {
    var data = '{"id": "' + videoId + '"}';
    data = JSON.parse(data);
    var transport = {
	  headers: {
		'Content-Type': "application/json"
	  },
      method: "PUT",
	  body: JSON.stringify(data)
    };
    const url = "http://razzlers.me:3001/api/updateUsersVotedEpisode";
    fetch(url, transport).then(response => response.json()).then(json => {
      // needs to return true or false based on if registration is successful
      // if true, return true and set username in localStorage
      // if false, return what went wrong, if multiple things, put inside array[]
      resolve(json);
    });
  });
}

function updateRatingEpisode(inRating, videoId)
{
  return new Promise(function(resolve, reject)
  {
    var data = '{"rating": "' + inRating + '", "id": "' + videoId + '"}';
    data = JSON.parse(data);
    var transport = {
      headers: {
        'Content-Type': "application/json"
      },
      method: "PUT",
      body: JSON.stringify(data)
    };
    const url = "http://razzlers.me:3001/api/updateRatingEpisode";
    fetch(url, transport).then(response => response.json()).then(json => {
      // needs to return true or false based on if registration is successful
      // if true, return true and set username in localStorage
      // if false, return what went wrong, if multiple things, put inside array[]
      resolve(json);
    });
  });
}

// checks the params in the URL
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
    const url = "http://razzlers.me:3001/api/getData/getVideoInfo";
    fetch(url, transport).then(result => result.json()).then(json => {
      resolve(json);
    }).catch(err => {
      throw new Error(err);
    });
  });
}

function addComment(inBody, id)
{
  return new Promise(function(resolve, reject)
  {
	var user = window.localStorage.getItem("Razzlers_Username");
    var data = '{"body": "' + inBody + '", "id": "' + id + '", "username": "' + user + '"}';
    data = JSON.parse(data);
    var transport = {
      headers: {
        'Content-Type': "application/json"
      },
      method: "PUT",
      body: JSON.stringify(data)
    };
    const url = "http://razzlers.me:3001/api/addCommentEpisode";
    fetch(url, transport).then(response => response.json()).then(json => {
      // needs to return true or false based on if registration is successful
      // if true, return true and set username in localStorage
      // if false, return what went wrong, if multiple things, put inside array[]
      resolve(json);
    });
  });
}

function buildComments(bodies) {
	//console.log(bodies);
    var bodiesDiv = document.getElementById("bodiesDiv");
    var html = "<form>";
    for (var i = 0; i < bodies.length; i++) {
		console.log(bodies[0]);
        html += "<p><font color = 'white'>*" + bodies[i] + "</font></p>";
    }
    html += "</form>";
    bodiesDiv.innerHTML = html;
}

export default EpisodeInformation
