import React from "react";
import '../style.css';

const utilFunc = require('../Helpers/UtilityFunctions');

class PlayVideo extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			isMovie: false,
			id: 0,
			episodeId: 0,
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
				episodeId: json.episodeId,
				name: "",
				description: "",
				rating: 0,
				actors: "",
				release_year: 0
			});
			
			var isMovie = json.isMovie;
			var id = json.id;
			var episodeId = json.episodeId;
			var set = {};
			
			if (isMovie === "true") {
				getVideoInfo(isMovie, id).then(result => {
					set = result;
					if (set.hasOwnProperty("result")) {
						// result from server didnt pull the correct file and it doesnt exist!
						console.log("file doesnt exist!");
					}
					else {
						// parse good response into constants for current state
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
			}
			else {
				getVideoInfo(isMovie, episodeId).then(result => {
					set = result;
					if (set.hasOwnProperty("result")) {
						// result from server didnt pull the correct file and it doesnt exist!
						console.log("file doesnt exist!");
					}
					else {
						// parse good response into constants for current state
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
			}
		});
	}
	
	render() {
		const {isMovie, id, episodeId, name} = this.state;
		var loc = "";
		var isSubscribed = false;
		var isUserLoggedIn = false;
		if (window.localStorage.getItem("Razzlers_Username") != null) {
			isUserLoggedIn = true;
		}
		
		if (id !== 0) {
			if (isMovie === "true") {
				var movieList = JSON.parse(localStorage.getItem("Razzlers_Subscribed_Movies"));
				if (movieList !== null) {
					if (typeof movieList !== typeof 0) {
						isSubscribed = movieList.includes(parseInt(id, 10));
						loc = "//assets.razzlers.me/assets/videos/movies/" + id + ".mp4";
					}
				}
			}
			else {
				var showList = JSON.parse(localStorage.getItem("Razzlers_Subscribed_Shows"));
				if (showList !== null) {
					isSubscribed = showList.includes(parseInt(id, 10));
					loc = "//assets.razzlers.me/assets/videos/episodes/" + episodeId + ".mp4";
				}
			}
		}
		
		if(!isSubscribed) {
			return (
				<div>
					<p className="centerText" hidden = {isSubscribed}><font color = "white" size = "50">Subscribe to Watch Video</font></p>
					<p className="centerText">
						<font hidden id="capacityMessage" className="error">You have no more subscriptions left this month!</font>
					</p>
					<p className="centerText">
						<font hidden id="invalidMessage1" className="error">Subscription Failed, please try again!</font>
					</p>
					<p className="centerText">
						<font hidden id="invalidMessage2" className="error">You must be logged in to subscribe!</font>
					</p>
					
					<button hidden = {isSubscribed} className="subButton" onClick = {() => {
						if(isUserLoggedIn) {
							subscribe(isMovie, id).then(result => {
								console.log("result");
								// result is either true or false based on if subbing went correctly or note
								if(result.result === "true") {
									// refresh page so they can watch the subbed show/movie
									window.location.reload();
								
								}
								else if(result.result === "full") {
									// they are at capacity for subscriptions!
									document.getElementById("capacityMessage").hidden=false;
								}
								else {
									// subbing failed
									// display error message!
									document.getElementById("invalidMessage1").hidden=false;
								}	
							});
						}
						else {
							document.getElementById("invalidMessage2").hidden=false;	
						}	
					}}>Subscribe</button>
				</div>
			);
		}
		
		else {
			return (
				<div>
					<p className="centerTextWithBackLonger"><font color = "black" size = "50">{name}</font></p>
					<video className="center" width="720" height="480" controls="controls">
						<source src={loc} type="video/mp4"/>
					</video>
				</div>
			);
			
		}
	}
}

// checks the params in the URL
function checkParams() {
	return new Promise(function(resolve, reject) {
		var url = window.location.href;
		url = new URL(url);
		var isMovie = url.searchParams.get("isMovie");
		var id = url.searchParams.get("id");
		var episodeId = url.searchParams.get("episode");
		resolve({isMovie, id, episodeId});
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
		const url = "http://razzlers.me:3001/api/getData/getVideoInfo";
		fetch(url, transport).then(result => result.json()).then(json => {
			resolve(json);
		}).catch(err => {
			throw new Error(err);
		});
	});
}

function subscribe(isMovie, id) {
	return new Promise(function(resolve, reject) {
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
		fetch(url, transport).then(result => result.json()).then(json => {
			utilFunc.updateLocalSubscribedLists().then(output => {
				resolve(json);
			});
		}).catch(err => {
			throw new Error(err);
		});
	});
}

export default PlayVideo