import React from "react";
import '../style.css';
class Billing extends React.Component{
	constructor(props){
		super(props)
		this.state = {
			user: "",
			userID: 0,
			billingID: 0,
			name: "",
			CCNumber: 0,
			exp: 0,
			CVC: 0,
			address: "",
			date: 0,
			hasBillingInfo: false
		};
		checkParams().then(json => {
			this.setState({
				user: json.user,
				userID: 0,
				billingID: 0,
				name: "",
				CCNumber: 0,
				exp: 0,
				CVC: 0,
				address: "",
				date: 0,
				hasBillingInfo: false
			});
			var user = json.user;
			var set = {};
			getUserBilling(user).then(result => {
				set = result;
				if(set.hasOwnProperty("result")) {
					console.log("file doesnt exist!");
				}
				else{
					this.setState({
						user: json.user,
						userID: set.uID,
						billingID: set.bID,
						name: set.bName,
						CCNumber: set.ccN,
						exp: set.expD,
						CVC: set.cvc,
						address: set.bAddress,
						date:set.bDate,
						hasBillingInfo: set.hasBillingInfo
					});
				}
			});
		});
	}
	render() {
		const {hasBillingInfo} = this.state;
		var hadError = false;
		return (
			<div className ="bg2_center">
				<p hidden id="invalidMessage">
					<font className="error">An error has occurred on our end, please try again!</font>
				</p>
				<p hidden id="blankSpacesMessage">
					<font className="error">Please fill out all required sections and try again!</font>
				</p>
				<p className="centerText"><font  color ="black" size = "20px">{"Please enter your billing information"}</font></p>
				
				<p hidden id="nameCharacterError"><font className="error">Name can not contain special characters!</font></p>
				<p hidden id="nameCharacterLength"><font className="error">Name is too long, please contact support!</font></p>
				<input
					type="text"
					placeholder="Name"
					className="input"
					id="billingNameInput"/>
				<p hidden id="CCNErrorLength"><font className="error">Credit card number must be 16 digits long!</font></p>
				<p hidden id="CCNErrorCharacters"><font className="error">Credit card number must only contain numbers!</font></p>
				<input
					type="password"
					placeholder="Credit Card Number"
					className="input"
					id="CCNumberInput"/>
				<select required id="months">
					<option value="">Expiration Month</option>
					<option value="01">01</option>
					<option value="02">02</option>
					<option value="03">03</option>
					<option value="04">04</option>
					<option value="05">05</option>
					<option value="06">06</option>
					<option value="07">07</option>
					<option value="08">08</option>
					<option value="09">09</option>
					<option value="10">10</option>
					<option value="11">11</option>
					<option value="12">12</option>
				</select>
				<select required id="years"> 
					<option value="">Expiration Year</option>
					<option value="2019">2019</option> 
					<option value="2020">2020</option> 
					<option value="2021">2021</option> 
					<option value="2022">2022</option>
					<option value="2023">2023</option> 
					<option value="2024">2024</option>
					<option value="2025">2025</option>
					<option value="2026">2026</option>
					<option value="2027">2027</option>
					<option value="2028">2028</option>
					<option value="2029">2029</option>
				</select>
				<p hidden id="CVCErrorCharacters"><font className="error">CVV number must only contain numbers!</font></p>
				<p hidden id="CVCErrorLength"><font className="error">CVV number must only be three or four numbers long!</font></p>
				<input
					type="text"
					placeholder="CVV"
					className="input"
					id="cvcInput"/>
				<p hidden id="addressCharacterError"><font className="error">Address can not contain special characters!</font></p>
				<p hidden id="addressCharacterLength"><font className="error">Address is too long, please contact support!</font></p>
				<input
					type="text"
					placeholder="Address"
					className="input"
					id="billingAddressInput"/>

				<button className="button2" id="submitButton" onClick={() => {
					var name = document.getElementById("billingNameInput").value;
					var ccn = document.getElementById("CCNumberInput").value;
					var month = document.getElementById("months").value;
					var year = document.getElementById("years").value;
					var cvc = document.getElementById("cvcInput").value;
					var address = document.getElementById("billingAddressInput").value;
					
					document.getElementById("invalidMessage").hidden=true;
					document.getElementById("blankSpacesMessage").hidden=true;
					document.getElementById("nameCharacterLength").hidden=true;
					document.getElementById("nameCharacterError").hidden=true;
					document.getElementById("CCNErrorLength").hidden=true;
					document.getElementById("CCNErrorCharacters").hidden=true;
					document.getElementById("CVCErrorLength").hidden=true;
					document.getElementById("CVCErrorCharacters").hidden=true;
					document.getElementById("addressCharacterError").hidden=true;
					document.getElementById("addressCharacterLength").hidden=true;
					

					
					if(name.trim() === "" || ccn.trim() === "" ||
					   month.trim() === "" || year.trim() === "" ||
					   cvc.trim() === "" || address.trim() === "") {
							document.getElementById("blankSpacesMessage").hidden=false;
							hadError = true;
					} 
					else {
						document.getElementById("blankSpacesMessage").hidden=true;
						hadError = false;
					
						//Name checks
						if(name.length > 256) {
						  document.getElementById("nameCharacterLength").hidden=false;
						  hadError = true;
						}
						for(var i = 0; i < name.length; i++) {
						  if(name.charCodeAt(i) < 48 && name.charCodeAt(i) !== 32 && name.charCodeAt(i) !== 45) {
							document.getElementById("nameCharacterError").hidden=false;
							hadError = true;
						  }
						  else if(name.charCodeAt(i) > 57 && name.charCodeAt(i) < 65) {
							document.getElementById("nameCharacterError").hidden=false;
							hadError = true;
						  }
						  else if(name.charCodeAt(i) > 90 && name.charCodeAt(i) < 97) {
							document.getElementById("nameCharacterError").hidden=false;
							hadError = true;
						  }
						  else if(name.charCodeAt(i) > 122) {
							document.getElementById("nameCharacterError").hidden=false;
							hadError = true;
						  }
						}
						
						//CC Number checks	
						if(ccn.length !== 16) {
						  document.getElementById("CCNErrorLength").hidden=false;
						  hadError = true;
						}
						for(var i = 0; i < ccn.length; i++) {
						  if(ccn.charCodeAt(i) < 48 || ccn.charCodeAt(i) > 57) {
							document.getElementById("CCNErrorCharacters").hidden=false;
							hadError = true;
						  }
						}
						
						//cvc Number checks	
						if(cvc.length > 4 || cvc.length < 3) {
						  document.getElementById("CVCErrorLength").hidden=false;
						  hadError = true;
						}
						for(var i = 0; i < cvc.length; i++) {
						  if(cvc.charCodeAt(i) < 48 || cvc.charCodeAt(i) > 57) {
							document.getElementById("CVCErrorCharacters").hidden=false;
							hadError = true;
						  }
						}
						
						//Address checks
						if(address.length > 256) {
						  document.getElementById("addressCharacterLength").hidden=false;
						  hadError = true;
						}
						for(var i = 0; i < address.length; i++) {
						  if(address.charCodeAt(i) < 48 && address.charCodeAt(i) !== 46 && address.charCodeAt(i) !== 45 && address.charCodeAt(i) !== 35 && address.charCodeAt(i) !== 32) {
							document.getElementById("addressCharacterError").hidden=false;
							hadError = true;
						  }
						  else if(address.charCodeAt(i) > 57 && address.charCodeAt(i) < 65) {
							document.getElementById("addressCharacterError").hidden=false;
							hadError = true;
						  }
						  else if(address.charCodeAt(i) > 90 && address.charCodeAt(i) < 97) {
							document.getElementById("addressCharacterError").hidden=false;
							hadError = true;
						  }
						  else if(address.charCodeAt(i) > 122) {
							document.getElementById("addressCharacterError").hidden=false;
							hadError = true;
						  }
						}
					}
					
					var combinedDate = month + "/" + year;
					if(hadError === false) {
						if(hasBillingInfo){
							updateBilling(name, ccn, combinedDate, cvc, address).then(response => {
								if(response.result === "true") {
									// Update was successful
									window.location.href='/billing';
								}
								else {
									// display error, reprompt for information
									document.getElementById("invalidMessage").hidden=false;
								}
							});
						}
						else if (!hasBillingInfo) {
							addBilling(name, ccn, combinedDate, cvc, address).then(response => {
								if(response.result === "true") {
									// Update was successful
									window.location.href='/billing';
								}
								else {
									// display error, reprompt for information
									document.getElementById("invalidMessage").hidden=false;
								}
							});
						}
					}
					hadError = false;
				}}>Submit</button>
				
			</div>
		);
	}
}

function checkParams() {
	return new Promise(function(resolve, reject) {
		var user = window.localStorage.getItem("Razzlers_Username");
		resolve({user});
	});
}

function getUserBilling(user) {
	return new Promise(function(resolve, reject) {
		var data = '{"user": "' + user + '"}';
		data = JSON.parse(data);
		var transport = {
			headers: {
				'Content-Type': "application/json"
			},
			method: "PUT",
			body: JSON.stringify(data)
		};
		const url = "http://razzlers.me:3001/api/getData/getUserBilling";
		fetch(url, transport).then(result => result.json()).then(json => {
			resolve(json);
		}).catch(err => {
			throw new Error(err);
		});
	});
}

function updateBilling(inName, inCCN, inExp, inCvc, inAddress) {
	return new Promise(function(resolve, reject) {
		var user = window.localStorage.getItem("Razzlers_Username");
		var data = '{"name": "' + inName + '", "ccn": "' + inCCN + '", "exp": "' + inExp + '", "cvc": "' + inCvc + '", "address": "' + inAddress + '", "username": "' + user + '"}';
		data = JSON.parse(data);
		var transport = {
			headers: {
				'Content-Type': "application/json"
			},
			method: "PUT",
			body: JSON.stringify(data)
		};
		const url = "http://razzlers.me:3001/api/updateBilling";
		fetch(url, transport).then(response => response.json()).then(json => {
			resolve(json);
		});
	});
}

function addBilling(inName, inCCN, inExp, inCvc, inAddress) {
	return new Promise(function(resolve, reject) {
		var user = window.localStorage.getItem("Razzlers_Username");
		var data = '{"name": "' + inName + '", "ccn": "' + inCCN + '", "exp": "' + inExp + '", "cvc": "' + inCvc + '", "address": "' + inAddress + '", "username": "' + user + '"}';
		data = JSON.parse(data);
		var transport = {
			headers: {
				'Content-Type': "application/json"
			},
			method: "PUT",
			body: JSON.stringify(data)
		};
		const url = "http://razzlers.me:3001/api/addBilling";
		fetch(url, transport).then(response => response.json()).then(json => {
			resolve(json);
		});
	});
}

export default Billing
