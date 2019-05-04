import React from "react";
import '../style.css';
import EpisodeList from "../HTMLComponents/EpisodeList";

const utilFunc = require('../Helpers/UtilityFunctions');

class Episodes extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			episodeList: 0,
			id:0,
			showTitle:""
		};

		checkParams().then(json => {
			this.setState({
			id: json.id,
			});

			var id = json.id;
			utilFunc.getEpisodeList(id).then(result => {
				this.setState({ episodeList: result });
				var set = {};
				getShowInfo(id).then(result => {
					set = result;
					this.setState({
						showTitle: set.title
					});
				});
			});
		});
	}
	
	render() {
		const {episodeList, showTitle, id} = this.state;var isSubscribed = false;
		var isUserLoggedIn = false;
		if (window.localStorage.getItem("Razzlers_Username") != null) {
			isUserLoggedIn = true;
		}
		
		if(episodeList !== 0) {
			var showList = JSON.parse(localStorage.getItem("Razzlers_Subscribed_Shows"));
			if (showList !== null) {
				isSubscribed = showList.includes(parseInt(id, 10));
			}

	
			if(!isSubscribed) {
				return (
					<div>
						<p className="centerText" hidden = {isSubscribed}><font color = "white" size = "50">Subscribe to See Episodes</font></p>
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
								subscribe(false, id).then(result => {
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
						<p className="centerTextWithBackLonger"><font color ="black" size="1000">{showTitle}</font></p>
						<EpisodeList episodes={episodeList}></EpisodeList>
					</div>
				);
			}
		}
		return(<div></div>)		
	}
}

function checkParams() {
	return new Promise(function(resolve, reject) {
		var url = window.location.href;
		url = new URL(url);
		var id = url.searchParams.get("id");
		resolve({id});
	});
}


function getShowInfo(id) {
	return new Promise(function(resolve, reject) {
		var data = '{"id": "' + id + '"}';
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

export default Episodes
