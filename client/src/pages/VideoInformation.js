import React from "react";
import '../style.css';
import star from '../images/star.png';
import empty from '../images/starEmpty.png';

const utilFunc = require('../Helpers/UtilityFunctions');

class VideoInformation extends React.Component {
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
	  bodies: null,
	  usernames: null,
	  times: null,
	  dates:null	  
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
      getShowInfo(isMovie, id).then(result => {
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
		utilFunc.getShowComments(id).then(bodiesList => {
			this.setState({bodies: bodiesList.bodies});
			
			utilFunc.getShowCommentsUsername(id).then(usernamesList => {
			this.setState({usernames: usernamesList.usernames});

				utilFunc.getShowCommentsTime(id).then(timesList => {
				this.setState({times: timesList.times});
				
					utilFunc.getShowCommentsDate(id).then(datesList => {
					this.setState({dates: datesList.dates});
				
					buildComments(bodiesList.bodies, usernamesList.usernames, timesList.times, datesList.dates);
					});
				});
			});
		});
	 });
    });
}
  
  
  render() {
	var ratingInput = -1;
    const {isMovie, id, name, description, rating, actors, release_year} = this.state;
	var isUserNotLoggedIn = true;
	if (window.localStorage.getItem("Razzlers_Username") != null) {
		isUserNotLoggedIn = false;
	}
	
    var loc = "";
    var isSubscribed = false;
	
    if(id !== 0)
    {
      if(isMovie === "true")
      {
        var movieList = JSON.parse(localStorage.getItem("Razzlers_Subscribed_Movies"));
        if(movieList !== null)
        {
          if(typeof movieList !== typeof 0)
          {
            isSubscribed = movieList.includes(parseInt(id,10));
            loc = "//assets.razzlers.me/assets/videos/movies/" + id + ".mp4";
		  }
        }
      } else {
        var showList = JSON.parse(localStorage.getItem("Razzlers_Subscribed_Shows"));
        if(showList !== null)
        {
          isSubscribed = showList.includes(parseInt(id,10));
          loc = "//assets.razzlers.me/assets/videos/episodes/" + id + ".mp4";
        }
      }
    }
	
    if(!isSubscribed)
    {
      // is NOT subscribed
      if(id !== 0)
      {
        if(isMovie === "true")
        {
          loc = "//assets.razzlers.me/assets/thumbnails/movieThumbnails/" + id + ".jpg";
        } else {
          loc = "//assets.razzlers.me/assets/thumbnails/showThumbnails/" + id + ".jpg";
        }
      }
      return (
        <div>
		  <div className="container">  
			<img className="container__image" src={loc} alt="background"/>
			
			<div className="container__text"> 
				<h2 className="centerText"><font  color = "white" size = "50"> {name} </font></h2>
				<p><font  color ="white" size = "20px">{"Rating: " + rating + "/5\n"}<img src={star} alt="star"/></font></p>
				<p><font  color ="white" size = "20px">{"Release Year : " + release_year}</font></p>
				<p><font  color ="white" size = "20px">{description}</font></p>
			</div>
			
			<p className="centerText" hidden = {isSubscribed}><font color = "white" size = "50">Subscribe to Watch Video</font></p>
			<p className="centerText">
            <font hidden id="capacityMessage" className="error">You have no more subscriptions left this month!</font>
			</p>
			<p className="centerText">
				<font hidden id="invalidMessage1" className="error">Subscription Failed, please try again!</font>
			</p>
		  
			<button hidden = {isSubscribed} className="subButton" onClick = {() =>
			{
				subscribe(isMovie, id).then(result =>
				{
					console.log("result");
					// result is either true or false based on if subbing went correctly or note
					if(result.result === "true")
					{
						// refresh page so they can watch the subbed show/movie
						window.location.reload();
						} else if(result.result === "full") {
							// they are at capacity for subscriptions!
							document.getElementById("capacityMessage").hidden=false;
						} else {
							// subbing failed
							// display error message!
							document.getElementById("invalidMessage1").hidden=false;
						}
				})
            }
			}>Subscribe</button>
		  </div>
		  

		
		<h2 className="centerText"><font  color = "white" size = "50"> {"Comments"} </font></h2>
		
		<div onload="buildComments();" data-role="fieldcontain" class="ui-hide-label" id="bodiesDiv"></div>
		
		<div class="new_comment">
			<ul class="user_comment">	
				<font  color = "white" size = "50" hidden = {isUserNotLoggedIn}> {"Leave a comment"} </font>
				<textarea id="commentInput" className="largeInput" rows="14" cols="10" wrap="soft" hidden = {isUserNotLoggedIn}> </textarea>
				<p hidden id="invalidCommentMessage">
				<font className="error">Error submitting comment, please try again!</font></p>
			
				<button className="commentButton" id="submitComment" hidden = {isUserNotLoggedIn} onClick={() => {
					if(document.getElementById("commentInput").value.trim() !== "") {
						addComment(document.getElementById("commentInput").value.replace(/\n/g, '\\n'), id).then(response => {
							if(response.result === "true")
							{
								// Update was successful
								window.location.href="videoInformation?isMovie=" + isMovie + "&id=" + id;
							} else {
								// display error, reprompt for information
								document.getElementById("invalidCommentMessage").hidden=false;
							}
						});
					}
				}}>Submit comment</button>	
			</ul>
		</div>
		  
		</div>
      );
    } else {
      // is subscribed
	  if(isMovie === "true")
        {
          loc = "//assets.razzlers.me/assets/thumbnails/movieThumbnails/" + id + ".jpg";
        } else {
          loc = "//assets.razzlers.me/assets/thumbnails/showThumbnails/" + id + ".jpg";
        }
      return (
        <div>
		  <div className="container">  
			<img className="container__image" src={loc} alt="background"/>
			
			<div className="container__text"> 
				<h2 className="centerText"><font  color = "white" size = "50"> {name} </font></h2>
				<button className="subButton" onClick={() => window.location.href="episodes?isMovie=" + isMovie + "&id=" + id}>View Episodes</button>
				<p><font  color ="white" size = "20px">{"Rating: " + rating + "/5\n"}<img src={star} alt="star"/></font></p>
				<p><font  color ="white" size = "20px">{"Release Year : " + release_year}</font></p>
				<p><font  color ="white" size = "20px">{description}</font></p>
			</div>
			
			<p className="centerText" hidden = {isSubscribed}><font color = "white" size = "50">Subscribe to Watch Video</font></p>
			<p className="centerText">
            <font hidden id="capacityMessage" className="error">You have no more subscriptions left this month!</font>
			</p>
			<p className="centerText">
				<font hidden id="invalidMessage1" className="error">Subscription Failed, please try again!</font>
			</p>
		  
			<button hidden = {isSubscribed} className="subButton" onClick = {() =>
			{
				subscribe(isMovie, id).then(result =>
				{
					console.log("result");
					// result is either true or false based on if subbing went correctly or note
					if(result.result === "true")
					{
						// refresh page so they can watch the subbed show/movie
						window.location.reload();
						} else if(result.result === "full") {
							// they are at capacity for subscriptions!
							document.getElementById("capacityMessage").hidden=false;
						} else {
							// subbing failed
							// display error message!
							document.getElementById("invalidMessage1").hidden=false;
						}
				})
            }
			}>Subscribe</button>
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
		  
		  
			updateRatingShow(ratingInput, id).then(response => {
			if(response.result === "true") {
				// Update was successful
				window.location.href="videoInformation?isMovie=" + isMovie + "&id=" + id;
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
				  
	
		<h2 className="centerText"><font  color = "white" size = "30"> {"Comments"} </font></h2>
		
		<div onload="buildComments();" data-role="fieldcontain" class="ui-hide-label" id="bodiesDiv"></div>
			
		<div class="new_comment">
			<ul class="user_comment">	
				<font  color = "white" size = "50" hidden = {isUserNotLoggedIn}> {"Leave a comment"} </font>
				<textarea id="commentInput" className="largeInput" rows="14" cols="10" wrap="soft" hidden = {isUserNotLoggedIn}> </textarea>
				<p hidden id="invalidCommentMessage">
				<font className="error">Error submitting comment, please try again!</font></p>
			
				<button className="commentButton" id="submitComment" hidden = {isUserNotLoggedIn} onClick={() => {
					if(document.getElementById("commentInput").value.trim() !== "") {
						addComment(document.getElementById("commentInput").value.replace(/\n/g, '\\n'), id).then(response => {
							if(response.result === "true")
							{
								// Update was successful
								window.location.href="videoInformation?isMovie=" + isMovie + "&id=" + id;
							} else {
								// display error, reprompt for information
								document.getElementById("invalidCommentMessage").hidden=false;
							}
						});
					}
				}}>Submit comment</button>	
			</ul>
		</div>
		</div>
      );
    }
  }
}

function updateRatingShow(inRating, videoId)
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
    const url = "http://razzlers.me:3001/api/updateRating";
    fetch(url, transport).then(response => response.json()).then(json => {
      // needs to return true or false based on if registration is successful
      // if true, return true and set username in localStorage
      // if false, return what went wrong, if multiple things, put inside array[]
      resolve(json);
    });
  });
}

function subscribe(isMovie, id)
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

function getShowInfo(isMovie, id)
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
    const url = "http://razzlers.me:3001/api/getData/getShowInfo";
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
    const url = "http://razzlers.me:3001/api/addCommentShow";
    fetch(url, transport).then(response => response.json()).then(json => {
      // needs to return true or false based on if registration is successful
      // if true, return true and set username in localStorage
      // if false, return what went wrong, if multiple things, put inside array[]
      resolve(json);
    });
  });
}

function buildComments(bodies, usernames, times, dates) {
	//console.log(bodies);
    var bodiesDiv = document.getElementById("bodiesDiv");
    var html = "<form>";
    for (var i = 0; i < bodies.length; i++) {
		console.log(bodies[i]);
		html += "<div class='new_comment'><ul class='user_comment'><div class='user_avatar'>" + usernames[i] + " <p><i class='fa fa-calendar'></i> " + dates[i].replace('T00:00:00.000Z','') + " <i class='fa fa-clock-o'></i> " + times[i] + "</p></div><div class='comment_body'><p>" + bodies[i].replace(/\n/g, "<br />") + "</p></div></ul></div>";
    }
    html += "</form>";
    bodiesDiv.innerHTML = html;
}

export default VideoInformation
