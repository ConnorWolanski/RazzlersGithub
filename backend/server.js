// importing other .js files that are used here
const utilFunc = require('./UtilityFunctions');

// required libs
const express = require('express');
const mysql = require('mysql')
const cors = require('cors');
const bodyParser = require('body-parser');

// initiate express middleware
const app = express();
const router = express.Router();

// use these configurations to run on
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use("/api", router);

// Test connection to MySQL Database
const connection = mysql.createConnection({
  host: "assets.razzlers.me",
  port: 3306,
  //host: "localhost",
  user: "root",
  password: "34a5704359a61d63c4488972ae2df00671b32da6fa225c95",
  database: "razzlers_main_db"
});

// test connection to SQL DB
connection.connect(function(err) {
  if(err)
  {
    throw err;
    return;
  }
  console.log("Connected to MySQL database!");
})

// fetches the current date and returns it as string
function getDateAsString(date)
{
  return new Promise(function(resolve, reject)
  {
    var month = date.getMonth();
    if(month< 10)
    {
      month = "0" + month;
    }
    var day = date.getDate();
    if(day < 10)
    {
      day = "0" + day;
    }
    var hour = date.getHours();
    if(hour < 10)
    {
      hour = "0" + hour;
    }
    var minutes = date.getMinutes();
    if(minutes < 10)
    {
      minutes = "0" + minutes;
    }
    var seconds = date.getSeconds();
    if(seconds < 10)
    {
      seconds = "0" + seconds;
    }
    resolve(date.getFullYear() + "-" + month + "-" + day + " " + hour + ":" + minutes + ":" + seconds);
  });
}

// goes to MySQL DB and fetches WHOLE list of users
function getUserList()
{
  return new Promise(function(resolve, reject)
  {
    var sql = "SELECT * FROM users";
    connection.query(sql, function(err, result, fields)
    {
      if(err)
      {
        throw err;
        return;
      } else {
        resolve(JSON.parse(JSON.stringify(result)));
      }
    });
  });
}

// goes to MySQL DB and fetches WHOLE list of users
function getUserListLength()
{
  return new Promise(function(resolve, reject)
  {
    getUserList().then(result => {
      resolve(result.length);
    });
  });
}

function getMessageList()
{
  return new Promise(function(resolve, reject)
  {
    var sql = "SELECT * FROM message";
    connection.query(sql, function(err, result, fields)
    {
      if(err)
      {
        throw err;
        return;
      } else {
        resolve(JSON.parse(JSON.stringify(result)));
      }
    });
  });
}

function getMessageListLength()
{
  return new Promise(function(resolve, reject)
  {
    getMessageList().then(result => {
      resolve(result.length);
    });
  });
}

// goes to MySQL DB and fetches userID of username
function getUserID(username)
{
  return new Promise(function(resolve, reject)
  {
    var sql = "SELECT user_id FROM users WHERE username='" + username + "'";
    connection.query(sql, function(err, result, fields)
    {
      if(err)
      {
        throw err;
        return;
      } else {
        resolve(result[0].user_id);
      }
    });
  });
}

function getUsername(id)
{
  return new Promise(function(resolve, reject)
  {
    var sql = "SELECT username FROM users WHERE user_id='" + id + "'";
    connection.query(sql, function(err, result, fields)
    {
      if(err)
      {
        throw err;
        return;
      } else {
        resolve(result[0].username);
      }
    });
  });
}

function getUserSubscriptionTotal(username)
{
  return new Promise(function(resolve, reject)
  {
    var sql = "SELECT * FROM users WHERE username='" + username + "'";
    connection.query(sql, function(err, result, fields)
    {
      if(err)
      {
        throw err;
        return;
      } else {
        resolve(parseInt(result[0].subscription_slots, 10));
      }
    });
  });
}

function getUserSubscriptionCount(userid)
{
  return new Promise(function(resolve, reject)
  {
    var total = 0;
    var sql = "SELECT * FROM user_movies_selected WHERE user_id='" + userid + "'";
    connection.query(sql, function(err, result, fields)
    {
      if(err)
      {
        throw err;
        return;
      } else {
        total += result.length;
      }
    });
    var sql = "SELECT * FROM user_shows_selected WHERE user_id='" + userid + "'";
    connection.query(sql, function(err, result, fields)
    {
      if(err)
      {
        throw err;
        return;
      } else {
        total += result.length;
        resolve(total);
      }
    });
  });
}

function getShowFromID(id)
{
  return new Promise(function(resolve, reject)
  {
    var sql = "SELECT * FROM tv_show WHERE tv_show_id='" + id + "'";
    connection.query(sql, function(err, result, fields)
    {
      if(err)
      {
        throw err;
        return;
      } else {
        resolve(result[0]);
      }
    });
  });
}

function getShowList(idList)
{
  return new Promise(function(resolve, reject)
  {
    var returnedList = [];
    if(idList.length === 0)
    {
      resolve(returnedList);
    }
    idList.forEach(function(id)
    {
      getShowFromID(id.tv_show_id).then(result =>
      {
        //add to array, and increment processed.
        returnedList[returnedList.length] = result;
        if(returnedList.length === idList.length)
        {
          resolve(returnedList);
        }
      });
    });
  });
}

function getMovieFromID(id)
{
  return new Promise(function(resolve, reject)
  {
    var sql = "SELECT * FROM movie WHERE movie_id='" + id + "'";
    connection.query(sql, function(err, result, fields)
    {
      if(err)
      {
        throw err;
        return;
      } else {
        resolve(result[0]);
      }
    });
  });
}

function getMovieList(idList)
{
  return new Promise(function(resolve, reject)
  {
    var returnedList = [];
    if(idList.length === 0)
    {
      resolve(returnedList);
    }
    idList.forEach(function(id)
    {
      getMovieFromID(id.movie_id).then(result =>
      {
        //add to array, and increment processed.
        returnedList[returnedList.length] = result;
        if(returnedList.length === idList.length)
        {
          resolve(returnedList);
        }
      });
    });
  });
}

// put function to register the user to the SQL DB
// Needs to deal with if username already exists
// here on server side and return {result: false}
router.put("/register", function(req, response)
{
  getUserListLength().then(result => {
    // set vars to text fields
    // inside the project so it knows what index of USER_ID we are at
    var currentUserID = result;
    var username = req.body.username;
    var password = req.body.password;
    var email = req.body.email;
    var first_name = req.body.first_name;
    var last_name = req.body.last_name;
    var activation_key = utilFunc.createActivationKey();
    var subscription_slots = "0";
    // debug
    //console.log("Concated: " + currentUserID + " " + username  + " " + first_name + " " + last_name + " " + password + " " + email + " " + activation_key + " ");
    // then submit to object type
    var sql = "INSERT INTO users (user_id, username, first_name, last_name, password, email, activation_key, subscription_slots) VALUES (\'" + currentUserID + "\', \'" + username  + "\', \'" + first_name + "\', \'" + last_name + "\', \'" + password + "\', \'" + email + "\', \'" + activation_key + "\', \'" + subscription_slots + "\')";
    connection.query(sql, function(err, result)
    {
      if(err)
      {
        console.log(err);
        response.send('{"result": "false"}');
      } else {
        console.log("Record inserted correctly!");
        response.send('{"result": "true"}');
      }
    });
  });
});

//Update info in users_billing if user already has billing setup
router.put("/updateBilling", function(req, response)
{
	var name = req.body.name
	var ccn = req.body.ccn
	var exp = req.body.exp
	var cvc = req.body.cvc
	var address = req.body.address
	var username = req.body.username
  var sql = "UPDATE users_billing AS UB INNER JOIN users AS U ON UB.user_id = U.user_id SET UB.billing_name = ?, UB.credit_card_number =?, UB.expiration_date = ? ,UB.cvc = ? , UB.billing_address = ? WHERE U.username = ?";

	connection.query(sql, [name, ccn, exp, cvc, address, username], function(err, result)
  {
      if(err)
      {
        console.log(err);
        response.send('{"result": "false"}');
      } else {
        console.log("Billing updated correctly!");
        response.send('{"result": "true"}');
      }
  });
});

//Add info in users_billing if user does not have billing setup
router.put("/addBilling", function(req, response)
{
	getUserID(req.body.username).then(result =>
  {
  	var user_id = result;
  	var billingID = Math.floor(Math.random()*9000000) + 1000000;
  	var name = req.body.name
  	var ccn = req.body.ccn
  	var exp = req.body.exp
  	var cvc = req.body.cvc
  	var address = req.body.address
  	var username = req.body.username

  	var d = new Date();
    var date = d.getDate();
  	var sql = "INSERT INTO users_billing (user_id, billing_id, billing_name, credit_card_number, expiration_date, cvc, billing_address, billing_date) VALUES (\'" + user_id + "\', \'" + billingID  + "\', \'" + name + "\', \'" + ccn + "\', \'" + exp + "\', \'" + cvc + "\', \'" + address + "\', \'" + date + "\')";

  	connection.query(sql, function(err, result)
    {
      if(err)
      {
        console.log(err);
        response.send('{"result": "false"}');
      } else {
        console.log("Billing added!");
        response.send('{"result": "true"}');
      }
    });
  });
});

router.put("/addFriend", function(req, response)
{
  getUserID(req.body.username).then(userID =>
  {
    getUserID(req.body.friend_username).then(friendID =>
    {
      var sql = 'INSERT INTO friends (user_id, friend_id) VALUES (' + userID + ', ' + friendID + ')';
      connection.query(sql, function(err, result)
      {
        if(err)
        {
          console.log(err);
          response.send('{"result": "false"}');
        } else {
          console.log("User (" + userID + ") added user (" + friendID + ") as a friend!");
          response.send('{"result": "true"}');
        }
      });
    });
  });
});

// function for checking logins
// returns true for correct username : password
// returns false for invalid credentials
router.post("/getData/checkLogin", function(req, response)
{
  var json = req.body;
  var username = json.username;
  var password = json.password;
  console.log("Received Login request (" + username + " : " + password + ")...");
  var sql = "SELECT * FROM users WHERE username = \'" + username + "\'";
  connection.query(sql, function(err, result, fields)
  {
    if(err)
    {
      throw err;
      return;
    } else {
      //console.log(result);
      var isCorrect = false;
      if(utilFunc.objectIsEmpty(result) === true)
      {
        // here if username did not exist in DB
        isCorrect = '{"result": "' + isCorrect + '"}';
        response.send(isCorrect);
      } else {
        isCorrect = (result[0].password === password);
        isCorrect =  '{"result": "' + isCorrect + '"}';
        response.send(isCorrect);
      }
    }
  });
});

router.put("/sendMessage", function(req, response)
{
  var sender = req.body.sender;
  var recipient = req.body.recipient;
  var message = req.body.message;
  getMessageListLength().then(messageID => {
    getUserID(sender).then(senderID => {
      getUserID(recipient).then(recipientID => {
        getDateAsString(new Date()).then(currentDate =>
        {
          //console.log(messageID + ")" + senderID + " => " + recipientID + " : " + message + " D: " + dateString);
          var sql = "INSERT INTO message (message_id, user_id, recipient_user_id, message_body, time, message_status) VALUES (\'" + messageID + "\', \'" + senderID  + "\', \'" + recipientID + "\', \'" + message + "\', \'" + currentDate + "\', \'0\')";
          connection.query(sql, function(err, result)
          {
            if(err)
            {
              console.log(err);
              response.send('{"result": "false"}');
            } else {
              console.log("Message sent successfully!");
              response.send('{"result": "true"}');
            }
          });
        });
      });
    });
  });
});

router.put("/getData/resetSubs", function(req, response)
{
  var username = req.body.username;
  getUserID(username).then(userID =>
  {
    var sql = "DELETE FROM user_shows_selected WHERE user_id='" + userID + "'";
    connection.query(sql, function(err, sqlresult)
    {
      if(err)
      {
        console.log(err);
        response.send('{"result": "false"}');
      } else {
        console.log("Deleted subbed shows for userID: " + userID);
      }
    });
    var sql = "DELETE FROM user_movies_selected WHERE user_id='" + userID + "'";
    connection.query(sql, function(err, sqlresult)
    {
      if(err)
      {
        console.log(err);
        response.send('{"result": "false"}');
      } else {
        console.log("Deleted subbed movies for userID: " + userID);
      }
    });
    var sql = "DELETE FROM membership_details WHERE user_id='" + userID + "'";
    connection.query(sql, function(err, sqlresult)
    {
      if(err)
      {
        console.log(err);
        response.send('{"result": "false"}');
      } else {
        console.log("Deleted membership for userID: " + userID);
        response.send('{"result": "true"}');
      }
    });
  });
});

router.put("/getData/subscribe", function(req, response)
{
  var username = req.body.username;
  getUserID(username).then(userID =>
  {
    var monthAheadDate = new Date();
    getDateAsString(monthAheadDate).then(currentMonth =>
    {
      monthAheadDate.setMonth(monthAheadDate.getMonth() + 1);
      getDateAsString(monthAheadDate).then(monthAfter =>
      {
        sql = 'INSERT INTO membership_details (user_id, membership_start_date, membership_end_date, active) VALUES ("' + userID + '", "' + currentMonth + '", "' + monthAfter + '", "' + 1 + '")';
        connection.query(sql, function(err, sqlresult)
        {
          if(err)
          {
            // gets here if there is a duplicate entry
            response.send('{"result": "false"}');
          } else {
          }
        });
        var sql = "UPDATE users SET subscription_slots=10 WHERE user_id='" + userID + "'";
        connection.query(sql, function(err, sqlresult)
        {
          if(err)
          {
            console.log(err);
            response.send('{"result": "false"}');
          } else {
            response.send('{"result": "true"}');
          }
        });
      });
    });
  });
});

router.put("/getData/subscribeToShow", function(req, response)
{
  var username = req.body.username;
  var isMovie = req.body.isMovie;
  var id = req.body.id;
  // get the user data first
  getUserID(username).then(result =>
  {
    // result is now userID
    // check if user cant sub anymore because they are at capacity
    getUserSubscriptionCount(result).then(count => {
      // count should be int
      getUserSubscriptionTotal(username).then(total => {
        console.log("total: " + count + " / " + total);
        if(total > count)
        {
          // they can still sub
          if(isMovie === "true")
          {
            var sql = "SELECT movie_id FROM user_movies_selected WHERE user_id='" + result + "'";
            connection.query(sql, function(err, sqlresult)
            {
              if(err)
              {
                console.log(err);
                response.send('{"result": "false"}');
              } else {
                // result = tv_show_id array
                getMovieList(sqlresult).then(listResult => {
                  returned = listResult.includes(parseInt(id,10));
                  if(!returned)
                  {
                    // list does not contain the subbed movie
                    // add it to movie db and return {result:true}
                    var dayAfter = new Date();
                    dayAfter.setTime(dayAfter.getTime() + 86400000);
                    getDateAsString(new Date()).then(startDate =>
                    {
                      getDateAsString(dayAfter).then(endDate =>
                      {
                        var sql = "INSERT INTO user_movies_selected (user_id, movie_id, start_time, end_time) VALUES (\'" + result + "\', \'" + id + "\', \'" + startDate + "\', \'" + endDate + "\')";
                        connection.query(sql, function(err, result)
                        {
                          if(err)
                          {
                            console.log(err);
                            response.send('{"result": "false"}');
                          } else {
                            console.log(username + " has subscribed to movie " + id);
                            response.send('{"result": "true"}');
                          }
                        });
                      });
                    });
                  } else {
                    // list does contain the subbed movie
                    // return {result:true}
                    response.send('{"result": "true"}');
                  }
                });
              }
            });
          } else {
            var sql = "SELECT tv_show_id FROM user_shows_selected WHERE user_id='" + result + "'";
            connection.query(sql, function(err, sqlresult)
            {
              if(err)
              {
                console.log(err);
                response.send('{"result": "false"}');
              } else {
                // result = tv_show_id array
                getShowList(sqlresult).then(listResult => {
                  returned = listResult.includes(parseInt(id,10));
                  if(!returned)
                  {
                    // list does not contain the subbed movie
                    // add it to movie db and return {result:true}
                    var sql = "INSERT INTO user_shows_selected (user_id, tv_show_id) VALUES (\'" + result + "\', \'" + id + "\')";
                    connection.query(sql, function(err, result)
                    {
                      if(err)
                      {
                        console.log(err);
                        response.send('{"result": "false"}');
                      } else {
                        console.log(username + " has subscribed to show " + id);
                        response.send('{"result": "true"}');
                      }
                    });
                  } else {
                    // list does contain the subbed movie
                    // return {result:true}
                    response.send('{"result": "true"}');
                  }
                });
              }
            });
          }
        } else {
          // they are at capacity!
          response.send('{"result": "full"}')
        }
      });
    });
  });
});

router.put("/getData/addOneSub", function(req, response)
{
  var username = req.body.username;
  getUserSubscriptionTotal(username).then(currentTotal =>
  {
    var newTotal = currentTotal+1;
    var sql = 'UPDATE users SET subscription_slots=' + newTotal + ' WHERE username="' + username + '"';
    connection.query(sql, function(err, result)
    {
      if(err)
      {
        console.log(err);
        response.send('{"result": "false"}');
      } else {
        console.log("set subslots for user " + username + " to " + newTotal);
        response.send('{"result": "true"}');
      }
    });
  });
});

router.put("/getData/getMessages", function(req, response)
{
  getMessageList().then(result => {
    var messageList = "";
    for(var i = 0; i < result.length; i++)
    {
      if(i == result.length - 1)
      {
        messageList += JSON.stringify(message);
      } else {
        messageList += JSON.stringify(message) + ",";
      }
    }
    response.send('{"messages": [' + messageList + ']}')
  });
});

router.put("/getData/getVideoInfo", function(req, response)
{
  var isMovie = req.body.isMovie;
  var id = req.body.id;
  // pull from either MOVIES or SHOWS
  if(isMovie === "true")
  {
    var sql = "SELECT * FROM movie WHERE movie_id = \'" + id + "\'";
    connection.query(sql, function(err, result)
    {
      if(err)
      {
        console.log(err);
        response.send('{"result": "false"}');
      } else {
        //console.log("Fetched id: " + id + " from movies: " + isMovie);
        // build the response from result
        var back = '{"result": "false"}';
        if(result[0] !== null)
        {
          back = '{"title": "' + result[0].movie_name + '", "desc": "' + result[0].movie_description +
                  '", "rate": "' + result[0].movie_rating + '", "act": "' + "" + '", "year": "' + result[0].movie_release_year + '"}';
        }
        response.send(back);
      }
    });
  } else {
    var sql = "SELECT * FROM episode WHERE episode_id = \'" + id + "\'";
    connection.query(sql, function(err, result)
    {
      if(err)
      {
        console.log(err);
        response.send('{"result": "false"}');
      } else {
        //console.log("Fetched id: " + id + " from movies: " + isMovie);
        // build the response from result
        var back = '{"result": "false"}'
        if(result[0] !== null)
        {
          back = '{"title": "' + result[0].episode_name + '", "desc": "' + result[0].episode_description +
                  '", "rate": "' + result[0].episode_rating + '", "act": "' + "" + '", "year": "' + result[0].tv_show_release_year + '"}';
        }
        response.send(back);
      }
    });
  }
});

router.get("/getData/getUserList", function(req, response)
{
  getUserList().then(result =>
  {
    var usernames = [];
    var ids = [];
    result.forEach(function(userInfo)
    {
      usernames[usernames.length] = '"' + userInfo.username + '"';
      ids[ids.length] = '"' + userInfo.user_id + '"';
    });
    response.send('{"users": [' + usernames + '], "IDs": [' + ids + ']}');
  });
});

router.put("/getData/getUserInfo", function(req, response)
{
  var user = req.body.user;

  var sql = "SELECT * FROM users WHERE username = \'" + user + "\'";
  connection.query(sql, function(err, result)
  {
    if(err)
    {
      console.log(err);
      response.send('{"result": "false"}');
	} else {
        // build the response from result
        var back = '{"result": "false"}';
		var accountStatus = "";
        if(result[0] !== null)
        {
		  if(result[0].subscription_slots == 0){
			  accountStatus = "Inactive";
		  }
		  else{
			  accountStatus = "Active with " + result[0].subscription_slots + " subscription slots!";
		  }

          back = '{"id": "' + result[0].user_id + '", "first": "' + result[0].first_name +
                  '", "last": "' + result[0].last_name + '", "email": "' + result[0].email + '", "status": "' +
				  accountStatus + '", "user": "' + result[0].username + '"}';
        }
        response.send(back);
      }
    });
});

router.put("/getData/getUsersFriends", function(req, response)
{
  getUserID(req.body.username).then(result => {
    var sql = "SELECT friend_id FROM friends WHERE user_id='" + result + "'";
    connection.query(sql, function(err, sqlresult)
    {
      if(err)
      {
        console.log(err);
        response.send('{"result": "false"}');
      } else {
        // sqlresult = friend_id array
        if(sqlresult.length === 0)
        {
          // respond with no friends :( like connor
          response.send('{"friends": []}');
        } else {
          // transform the user ids into usernames
          var friendIDs = [];
          sqlresult.forEach(function(item)
          {
            friendIDs[friendIDs.length] = item.friend_id;
          });
          var friendUsernames = [];
          friendIDs.forEach(function(id)
          {
            getUsername(id).then(usernameResult => {
              friendUsernames[friendUsernames.length] = '"' + usernameResult + '"';
              if(friendUsernames.length == friendIDs.length)
              {
                response.send('{"friends": [' + friendUsernames + '], "IDs": [' + friendIDs + ']}');
              }
            });
          });
        }
      }
    });
  });
});

router.put("/getData/getUsersMessages", function(req, response)
{
  getUserID(req.body.sender).then(senderID => {
    getUserID(req.body.recipient).then(recipientID => {
      var receivedMessages = [];
      var sql = 'SELECT * FROM message WHERE (recipient_user_id="' + senderID + '" AND user_id="' + recipientID + '") OR (recipient_user_id="' + recipientID + '" AND user_id="' + senderID + '")';
      connection.query(sql, function(err, sqlresult)
      {
        if(err)
        {
          console.log(err);
          response.send('{"messages": "false"}');
        } else {
          // sqlresult = friend_id array
          if(sqlresult.length === 0)
          {
            // respond with no messages like connor talking to girls
            response.send('{"messages": []}');
          } else {
            var messageList = [];
            sqlresult.forEach(function(message)
            {
              messageList[messageList.length] = JSON.parse(JSON.stringify(message));
            });
            response.send('{"messages": ' + JSON.stringify(messageList) + '}');
          }
        }
      });
    });
  });
});

router.put("/getData/getUserBilling", function(req, response)
{
  var user = req.body.user;
  var hasBillingInfo = false;

  var sql = "SELECT * FROM users_billing UB INNER JOIN users U ON UB.user_id = U.user_id WHERE U.username= \'" + user + "\'";

  connection.query(sql, function(err, result)
  {
    if(err)
    {
      console.log(err);
      response.send('{"result": "false"}');
	} else {
		// build the response from result
		var back = '{"result": "false"}';
		if(result.length>0)
		{
		hasBillingInfo = true;
		back = '{"uID": "' + result[0].user_id + '", "bID": "' + result[0].billing_id +
                 '", "bName": "' + result[0].billing_name + '", "ccN": "' + result[0].credit_card_number + '", "expD": "' +
			  result[0].expiration_date + '", "cvc": "' + result[0].cvc + '", "bAddress": "' + result[0].billing_address +
			  '", "bDate": "' + result[0].billing_date + '", "hasBillingInfo": "' + hasBillingInfo + '"}';
		}
		else {
			back = '{"result": "false", "hasBillingInfo": "' + hasBillingInfo + '"}';
		}
		response.send(back);
      }
    });
});

router.put("/getData/getUsernameOfID", function(req, response)
{
  getUsername(req.body.id).then(result =>
  {
    response.send('{"username": "' + result + '"}');
  });
});

router.get("/getData/getMovieList", function(req, response)
{
  var sql = "SELECT * FROM movie";
  connection.query(sql, function(err, result)
  {
    if(err)
    {
      console.log(err);
      response.send('{"result": "false"}');
    } else {
      // send JSON array of movies
      response.send(result);
    }
  });
});

router.get("/getData/getShowList", function(req, response)
{
  var sql = "SELECT * FROM tv_show";
  connection.query(sql, function(err, result)
  {
    if(err)
    {
      console.log(err);
      response.send('{"result": "false"}');
    } else {
      // send JSON array of shows
      response.send(result);
    }
  });
});

router.put("/getData/getSubscribedShows", function(req, response)
{
  // first get ID from username passed in.
  var username = req.body.username;
  getUserID(username).then(result => {
    // now we have the userID stored in result
    var sql = "SELECT tv_show_id FROM user_shows_selected WHERE user_id='" + result + "'";
    connection.query(sql, function(err, sqlresult)
    {
      if(err)
      {
        console.log(err);
        response.send('{"result": "false"}');
      } else {
        // result = tv_show_id array
        var returned = "";
        if(sqlresult == "")
        {
          response.send("{}");
        } else {
          getShowList(sqlresult).then(listResult => {
            returned = listResult;
            response.send(returned);
          });
        }
      }
    });
  });
});

router.put("/getData/getSubscribedMovies", function(req, response)
{
  // first get ID from username passed in.
  var username = req.body.username;
  getUserID(username).then(result => {
    // now we have the userID stored in result
    var sql = "SELECT movie_id FROM user_movies_selected WHERE user_id='" + result + "'";
    connection.query(sql, function(err, sqlresult)
    {
      if(err)
      {
        console.log(err);
        response.send('{"result": "false"}');
      } else {
        // result = tv_show_id array
        var returned = "";
        if(sqlresult == "")
        {
          response.send("{}");
        } else {
          getMovieList(sqlresult).then(listResult => {
            returned = listResult;
            response.send(returned);
          });
        }
      }
    });
  });
});

router.put("/updateUsersVotedMovie", function(req, response)
{
	var id = req.body.id;
	getUsersVotedMovie(id).then(result =>
    {
	var users_voted = Number(result) + Number('1');
	
	var sql = "UPDATE movie SET users_voted='" + users_voted + "' WHERE movie_id='" + id + "'";
	
  	connection.query(sql, function(err, result)
    {
      if(err)
      {
        console.log(err);
        response.send('{"result": "false"}');
      } else {
        console.log("users voted movie updated!");
        response.send('{"result": "true"}');
      }
    });
  });
});

router.put("/updateUsersVotedShow", function(req, response)
{
	var id = req.body.id;
	getUsersVotedShow(id).then(result =>
    {
	var users_voted = Number(result) + Number('1');
	
	var sql = "UPDATE tv_show SET users_voted='" + users_voted + "' WHERE tv_show_id='" + id + "'";
	
  	connection.query(sql, function(err, result)
    {
      if(err)
      {
        console.log(err);
        response.send('{"result": "false"}');
      } else {
        console.log("users voted show updated!");
        response.send('{"result": "true"}');
      }
    });
  });
});

//update rating value in movie
router.put("/updateRatingMovie", function(req, response)
{
	var rating = req.body.rating;
	var id = req.body.id;
	getUsersVotedMovie(id).then(result =>
	{
		var users_voted = Number(result) + Number('1');
		getTotalRatingValuesMovie(id).then(result =>
		{
			var total_rating_values = Number(result) + Number(rating);
			var newRating = Number(total_rating_values) / Number(users_voted);
			newRating = Number((newRating).toFixed(1));
		
			var sql = "UPDATE movie SET movie_rating='" + newRating + "', total_rating_values='" + total_rating_values + "', users_voted='" + users_voted + "' WHERE movie_id='" + id + "'";
			//	"\', \'"
			connection.query(sql, function(err, result)
			{
				if(err)
				{
					console.log(err);
					response.send('{"result": "false"}');
				} else {
					console.log("Rating movie updated!");
					response.send('{"result": "true"}');
				}
			});
		});
	});
});

//update rating value in tv show
router.put("/updateRating", function(req, response)
{
	var rating = req.body.rating;
	var id = req.body.id;
	getUsersVotedShow(id).then(result =>
	{
		var users_voted = Number(result) + Number('1');
		getTotalRatingValuesShow(id).then(result =>
		{
			var total_rating_values = Number(result) + Number(rating);
			var newRating = Number(total_rating_values) / Number(users_voted);
			newRating = Number((newRating).toFixed(1));
		
			var sql = "UPDATE tv_show SET tv_show_rating='" + newRating + "', total_rating_values='" + total_rating_values + "', users_voted='" + users_voted + "' WHERE tv_show_id='" + id + "'";
			//	"\', \'"
			connection.query(sql, function(err, result)
			{
				if(err)
				{
					console.log(err);
					response.send('{"result": "false"}');
				} else {
					console.log("Rating tv show updated!");
					response.send('{"result": "true"}');
				}
			});
		});
	});
});

router.get("/getData/getTopMovieList", function(req, response)
{
  var sql = "SELECT * FROM movie WHERE movie_rating >= 4";
  connection.query(sql, function(err, result)
  {
    if(err)
    {
      console.log(err);
      response.send('{"result": "false"}');
    } else {
      // send JSON array of movies
      response.send(result);
    }
  });
});

router.get("/getData/getTopShowList", function(req, response)
{
  var sql = "SELECT * FROM tv_show WHERE tv_show_rating >= 4";
  connection.query(sql, function(err, result)
  {
    if(err)
    {
      console.log(err);
      response.send('{"result": "false"}');
    } else {
      // send JSON array of shows
      response.send(result);
    }
  });
});

// goes to MySQL DB and fetches users_voted from movie
function getUsersVotedMovie(id)
{
  return new Promise(function(resolve, reject)
  {
	var sql = "SELECT users_voted FROM movie WHERE movie_id='" + id + "'";

    connection.query(sql, function(err, result, fields)
    {
      if(err)
      {
        throw err;
        return;
      } else {
		resolve(result[0].users_voted);
		}
    });
  });
}

// goes to MySQL DB and fetches users_voted from tv show
function getUsersVotedShow(id)
{
  return new Promise(function(resolve, reject)
  {
	var sql = "SELECT users_voted FROM tv_show WHERE tv_show_id='" + id + "'";
	
    connection.query(sql, function(err, result, fields)
    {
      if(err)
      {
        throw err;
        return;
      } else {
		resolve(result[0].users_voted);
		}
    });
  });
}

// goes to MySQL DB and fetches rating from movie
function getRatingMovie(id)
{
  return new Promise(function(resolve, reject)
  {
	var sql = "SELECT movie_rating FROM movie WHERE movie_id='" + id + "'";
    connection.query(sql, function(err, result, fields)
    {
      if(err)
      {
        throw err;
        return;
      } else {
		resolve(result[0].movie_rating);
      }
    });
  });
}

// goes to MySQL DB and fetches rating from tv show
function getRatingShow(id)
{
  return new Promise(function(resolve, reject)
  {
	var sql = "SELECT tv_show_rating FROM tv_show WHERE tv_show_id='" + id + "'";
    connection.query(sql, function(err, result, fields)
    {
      if(err)
      {
        throw err;
        return;
      } else {
		resolve(result[0].tv_show_rating);
      }
    });
  });
}

// goes to MySQL DB and fetches users_voted from episode
function getUsersVotedEpisode(id)
{
  return new Promise(function(resolve, reject)
  {
	var sql = "SELECT users_voted FROM episode WHERE episode_id='" + id + "'";
	
    connection.query(sql, function(err, result, fields)
    {
      if(err)
      {
        throw err;
        return;
      } else {
		resolve(result[0].users_voted);
		}
    });
  });
}

// goes to MySQL DB and fetches rating from episode
function getRatingEpisode(id)
{
  return new Promise(function(resolve, reject)
  {
	var sql = "SELECT episode_rating FROM episode WHERE episode_id='" + id + "'";
    connection.query(sql, function(err, result, fields)
    {
      if(err)
      {
        throw err;
        return;
      } else {
		resolve(result[0].episode_rating);	
      }
    });
  });
}

// goes to MySQL DB and fetches total rating values from movie
function getTotalRatingValuesMovie(id)
{
  return new Promise(function(resolve, reject)
  {
	var sql = "SELECT total_rating_values FROM movie WHERE movie_id='" + id + "'";
    connection.query(sql, function(err, result, fields)
    {
      if(err)
      {
        throw err;
        return;
      } else {
		resolve(result[0].total_rating_values);
      }
    });
  });
}
// goes to MySQL DB and fetches total rating values from tv show
function getTotalRatingValuesShow(id)
{
  return new Promise(function(resolve, reject)
  {
	var sql = "SELECT total_rating_values FROM tv_show WHERE tv_show_id='" + id + "'";
    connection.query(sql, function(err, result, fields)
    {
      if(err)
      {
        throw err;
        return;
      } else {
		resolve(result[0].total_rating_values);
      }
    });
  });
}
// goes to MySQL DB and fetches total rating values from episode
function getTotalRatingValuesEpisode(id)
{
  return new Promise(function(resolve, reject)
  {
	var sql = "SELECT total_rating_values FROM episode WHERE episode_id='" + id + "'";
    connection.query(sql, function(err, result, fields)
    {
      if(err)
      {
        throw err;
        return;
      } else {
		resolve(result[0].total_rating_values);
      }
    });
  });
}


router.put("/getData/getEpisodeList", function(req, response)
{
  var showId = req.body.showID;
  var sql = "SELECT * FROM episode WHERE tv_show_id='" + showId + "'";
  connection.query(sql, function(err, result)
  {
    if(err)
    {
      console.log(err);
      response.send('{"result": "false"}');
    } else {
      // send JSON array of episodes
	  console.log("success");
      response.send(result);
    }
  });
});

router.put("/getData/getShowName", function(req, response)
{
  var id = req.body.id;
  // pull from SHOWS
  var sql = "SELECT tv_show_title FROM tv_show WHERE tv_show_id='" + id + "'";
  connection.query(sql, function(err, result)
  {
	if(err)
    {
		console.log(err);
        response.send('{"result": "false"}');
    } else {
        console.log("Fetched id: " + id);
        // build the response from result
        var back = '{"result": "false"}';
        if(result[0] !== null)
        {
		  console.log("Title: " + result[0].tv_show_title);
          back = '{"title": "' + result[0].tv_show_title + '"}';
        }
        response.send(back);
     }
  });
});

router.put("/getData/getShowInfo", function(req, response)
{
  var isMovie = req.body.isMovie;
  var id = req.body.id;
  // pull from either MOVIES or SHOWS
  var sql = "SELECT * FROM tv_show WHERE tv_show_id = \'" + id + "\'";
  connection.query(sql, function(err, result)
  {
	if(err)
    {
		console.log(err);
        response.send('{"result": "false"}');
    } else {
        //console.log("Fetched id: " + id + " from movies: " + isMovie);
        // build the response from result
        var back = '{"result": "false"}'
        if(result[0] !== null)
        {
          back = '{"title": "' + result[0].tv_show_title + '", "desc": "' + result[0].tv_show_description +
                  '", "rate": "' + result[0].tv_show_rating + '", "act": "' + "" + '", "year": "' + result[0].tv_show_release_year + '"}';
        }
        response.send(back);
     }
  });
});

//update rating value in episode
router.put("/updateRatingEpisode", function(req, response)
{
	var rating = req.body.rating;
	var id = req.body.id;
	getUsersVotedEpisode(id).then(result =>
	{
		var users_voted = Number(result) + Number('1');
		getTotalRatingValuesEpisode(id).then(result =>
		{
			var total_rating_values = Number(result) + Number(rating);
			var newRating = Number(total_rating_values) / Number(users_voted);
			newRating = Number((newRating).toFixed(1));
		
			var sql = "UPDATE episode SET episode_rating='" + newRating + "', total_rating_values='" + total_rating_values + "', users_voted='" + users_voted + "' WHERE episode_id='" + id + "'";
			//	"\', \'"
			connection.query(sql, function(err, result)
			{
				if(err)
				{
					console.log(err);
					response.send('{"result": "false"}');
				} else {
					console.log("Rating episode updated!");
					response.send('{"result": "true"}');
				}
			});
		});
	});
});

router.put("/updateUsersVotedEpisode", function(req, response)
{
	var id = req.body.id;
	getUsersVotedEpisode(id).then(result =>
    {
	var users_voted = Number(result) + Number('1');
	
	var sql = "UPDATE episode SET users_voted='" + users_voted + "' WHERE episode_id='" + id + "'";
	
  	connection.query(sql, function(err, result)
    {
      if(err)
      {
        console.log(err);
        response.send('{"result": "false"}');
      } else {
        console.log("users voted episode updated!");
        response.send('{"result": "true"}');
      }
    });
  });
});

router.put("/addCommentMovie", function(req, response)
{
	getUserID(req.body.username).then(result =>
  {
  	var user_id = result;
  	var commentID = Math.floor(Math.random()*9000000) + 1000000;
  	var body = req.body.body
  	var movieID = req.body.id
	
	var d = new Date();
	var time = "";
	var date = "";
	  
	var month = Number(d.getMonth()) + Number('1');
	
	if(month< 10) {
		month = "0" + month;
	}
	var day = d.getDate();
	if(day < 10) {
		day = "0" + day;
	}
	var hour = d.getHours();
	if(hour < 10) {
		hour = "0" + hour;
	}
	var minutes = d.getMinutes();
	if(minutes < 10) {
		minutes = "0" + minutes;
	}
	var seconds = d.getSeconds();
	if(seconds < 10) {
		seconds = "0" + seconds;
	}
	time = hour + ":" + minutes + ":" + seconds;
	date = d.getFullYear() + "-" + month + "-" + day;
	
  	var sql = "INSERT INTO movie_comment (comment_id, movie_id, user_id, comment_body, time, date) VALUES (\'" + commentID + "\', \'" + movieID  + "\', \'" + user_id + "\', \'" + body + "\', \'" + time + "\', \'" + date + "\')";

  	connection.query(sql, function(err, result)
    {
      if(err)
      {
        console.log(err);
        response.send('{"result": "false"}');
      } else {
        console.log("Comment added!");
        response.send('{"result": "true"}');
      }
    });
  });
});

router.put("/addCommentShow", function(req, response)
{
	getUserID(req.body.username).then(result =>
  {
  	var user_id = result;
  	var commentID = Math.floor(Math.random()*9000000) + 1000000;
  	var body = req.body.body
  	var showID = req.body.id
	
	var d = new Date();
	var time = "";
	var date = "";
	  
	var month = Number(d.getMonth()) + Number('1');
	
	if(month< 10) {
		month = "0" + month;
	}
	var day = d.getDate();
	if(day < 10) {
		day = "0" + day;
	}
	var hour = d.getHours();
	if(hour < 10) {
		hour = "0" + hour;
	}
	var minutes = d.getMinutes();
	if(minutes < 10) {
		minutes = "0" + minutes;
	}
	var seconds = d.getSeconds();
	if(seconds < 10) {
		seconds = "0" + seconds;
	}
	time = hour + ":" + minutes + ":" + seconds;
	date = d.getFullYear() + "-" + month + "-" + day;
	
  	var sql = "INSERT INTO tv_show_comment (comment_id, tv_show_id, user_id, comment_body, time, date) VALUES (\'" + commentID + "\', \'" + showID  + "\', \'" + user_id + "\', \'" + body + "\', \'" + time + "\', \'" + date + "\')";

  	connection.query(sql, function(err, result)
    {
      if(err)
      {
        console.log(err);
        response.send('{"result": "false"}');
      } else {
        console.log("Comment added!");
        response.send('{"result": "true"}');
      }
    });
  });
});

router.put("/addCommentEpisode", function(req, response)
{
	getUserID(req.body.username).then(result =>
  {
  	var user_id = result;
  	var commentID = Math.floor(Math.random()*9000000) + 1000000;
  	var body = req.body.body
  	var episodeID = req.body.id
	
	var d = new Date();
	var time = "";
	var date = "";
	  
	var month = Number(d.getMonth()) + Number('1');
	
	if(month< 10) {
		month = "0" + month;
	}
	var day = d.getDate();
	if(day < 10) {
		day = "0" + day;
	}
	var hour = d.getHours();
	if(hour < 10) {
		hour = "0" + hour;
	}
	var minutes = d.getMinutes();
	if(minutes < 10) {
		minutes = "0" + minutes;
	}
	var seconds = d.getSeconds();
	if(seconds < 10) {
		seconds = "0" + seconds;
	}
	time = hour + ":" + minutes + ":" + seconds;
	date = d.getFullYear() + "-" + month + "-" + day;
	
  	var sql = "INSERT INTO episode_comment (comment_id, episode_id, user_id, comment_body, time, date) VALUES (\'" + commentID + "\', \'" + episodeID  + "\', \'" + user_id + "\', \'" + body + "\', \'" + time + "\', \'" + date + "\')";

  	connection.query(sql, function(err, result)
    {
      if(err)
      {
        console.log(err);
        response.send('{"result": "false"}');
      } else {
        console.log("Comment added!");
        response.send('{"result": "true"}');
      }
    });
  });
});

//Comment bodies
router.put("/getData/getMovieCommentList", function(req, response)
{
  var id = req.body.id;
  var sql = "SELECT * FROM movie_comment WHERE movie_id='" + id + "' ORDER BY date ASC, time ASC";
  connection.query(sql, function(err, sqlresult)
    {
      if(err)
      {
        console.log(err);
        response.send('{"result": "false"}');
      } else {
		console.log(sqlresult);
        if(sqlresult.length === 0)
        {
          // respond with no comments
          response.send('{"bodies": []}');
        } else {
          var bodies = [];
          sqlresult.forEach(function(item)
          {
			//console.log(item.comment_body);
            bodies[bodies.length] = JSON.parse(JSON.stringify(item.comment_body));
			//console.log(bodies[bodies.length]);
          });
          response.send('{"bodies": ' + JSON.stringify(bodies) + '}');
		  //console.log('{"bodies": [' + JSON.stringify(bodies) + ']}');
        }
      }
    });
});
router.put("/getData/getShowCommentList", function(req, response)
{
  var id = req.body.id;
  var sql = "SELECT * FROM tv_show_comment WHERE tv_show_id='" + id + "' ORDER BY date ASC, time ASC";
  connection.query(sql, function(err, sqlresult)
    {
      if(err)
      {
        console.log(err);
        response.send('{"result": "false"}');
      } else {
		//console.log(sqlresult);
        if(sqlresult.length === 0)
        {
          // respond with no comments
          response.send('{"bodies": []}');
        } else {
          var bodies = [];
          sqlresult.forEach(function(item)
          {
			//console.log(item.comment_body);
            bodies[bodies.length] = JSON.parse(JSON.stringify(item.comment_body));
			//console.log(bodies[bodies.length]);
          });
          response.send('{"bodies": ' + JSON.stringify(bodies) + '}');
		  console.log('{"bodies": [' + JSON.stringify(bodies) + ']}');
        }
      }
    });
});
router.put("/getData/getEpisodeCommentList", function(req, response)
{
  var id = req.body.id;
  var sql = "SELECT * FROM episode_comment WHERE episode_id='" + id + "' ORDER BY date ASC, time ASC";
  connection.query(sql, function(err, sqlresult)
    {
      if(err)
      {
        console.log(err);
        response.send('{"result": "false"}');
      } else {
		console.log(sqlresult);
        if(sqlresult.length === 0)
        {
          // respond with no comments
          response.send('{"bodies": []}');
        } else {
          var bodies = [];
          sqlresult.forEach(function(item)
          {
			//console.log(item.comment_body);
            bodies[bodies.length] = JSON.parse(JSON.stringify(item.comment_body));
			//console.log(bodies[bodies.length]);
          });
          response.send('{"bodies": ' + JSON.stringify(bodies) + '}');
		  //console.log('{"bodies": [' + JSON.stringify(bodies) + ']}');
        }
      }
    });
});

//Comment usernames
router.put("/getData/getMovieCommentUsername", function(req, response)
{
  var id = req.body.id;
  var sql = "SELECT * FROM movie_comment MC INNER JOIN users U ON MC.user_id = U.user_id WHERE movie_id='" + id + "' ORDER BY date ASC, time ASC";
  connection.query(sql, function(err, sqlresult)
    {
      if(err)
      {
        console.log(err);
        response.send('{"result": "false"}');
      } else {
		console.log(sqlresult);
        if(sqlresult.length === 0)
        {
          // respond with no comments
          response.send('{"usernames": []}');
        } else {
          var usernames = [];
          sqlresult.forEach(function(item)
          {
            usernames[usernames.length] = JSON.parse(JSON.stringify(item.username));
          });
          response.send('{"usernames": ' + JSON.stringify(usernames) + '}');
        }
      }
    });
});
router.put("/getData/getShowCommentUsername", function(req, response)
{
  var id = req.body.id;
  var sql = "SELECT * FROM tv_show_comment MC INNER JOIN users U ON MC.user_id = U.user_id WHERE tv_show_id='" + id + "' ORDER BY date ASC, time ASC";
  connection.query(sql, function(err, sqlresult)
    {
      if(err)
      {
        console.log(err);
        response.send('{"result": "false"}');
      } else {
		console.log(sqlresult);
        if(sqlresult.length === 0)
        {
          // respond with no comments
          response.send('{"usernames": []}');
        } else {
          var usernames = [];
          sqlresult.forEach(function(item)
          {
            usernames[usernames.length] = JSON.parse(JSON.stringify(item.username));
          });
          response.send('{"usernames": ' + JSON.stringify(usernames) + '}');
		  console.log('{"usernames": ' + JSON.stringify(usernames) + '}');
        }
      }
    });
});
router.put("/getData/getEpisodeCommentUsername", function(req, response)
{
  var id = req.body.id;
  var sql = "SELECT * FROM episode_comment MC INNER JOIN users U ON MC.user_id = U.user_id WHERE episode_id='" + id + "' ORDER BY date ASC, time ASC";
  connection.query(sql, function(err, sqlresult)
    {
      if(err)
      {
        console.log(err);
        response.send('{"result": "false"}');
      } else {
		console.log(sqlresult);
        if(sqlresult.length === 0)
        {
          // respond with no comments
          response.send('{"usernames": []}');
        } else {
          var usernames = [];
          sqlresult.forEach(function(item)
          {
            usernames[usernames.length] = JSON.parse(JSON.stringify(item.username));
          });
          response.send('{"usernames": ' + JSON.stringify(usernames) + '}');
        }
      }
    });
});

//Comment Times
router.put("/getData/getMovieCommentTime", function(req, response)
{
  var id = req.body.id;
  var sql = "SELECT * FROM movie_comment WHERE movie_id='" + id + "' ORDER BY date ASC, time ASC";
  
  connection.query(sql, function(err, sqlresult)
    {
      if(err)
      {
        console.log(err);
        response.send('{"result": "false"}');
      } else {
		console.log(sqlresult);
        if(sqlresult.length === 0)
        {
          // respond with no times
          response.send('{"times": []}');
        } else {
          var times = [];
          sqlresult.forEach(function(item)
          {
            times[times.length] = JSON.parse(JSON.stringify(item.time));
          });
          response.send('{"times": ' + JSON.stringify(times) + '}');
        }
      }
    });
});
router.put("/getData/getShowCommentTime", function(req, response)
{
  var id = req.body.id;
  var sql = "SELECT * FROM tv_show_comment WHERE tv_show_id='" + id + "' ORDER BY date ASC, time ASC";
  connection.query(sql, function(err, sqlresult)
    {
      if(err)
      {
        console.log(err);
        response.send('{"result": "false"}');
      } else {
		console.log(sqlresult);
        if(sqlresult.length === 0)
        {
          // respond with no times
          response.send('{"times": []}');
        } else {
          var times = [];
          sqlresult.forEach(function(item)
          {
            times[times.length] = JSON.parse(JSON.stringify(item.time));
          });
          response.send('{"times": ' + JSON.stringify(times) + '}');
        }
      }
    });
});
router.put("/getData/getEpisodeCommentTime", function(req, response)
{
  var id = req.body.id;
  var sql = "SELECT * FROM episode_comment WHERE episode_id='" + id + "' ORDER BY date ASC, time ASC";
  connection.query(sql, function(err, sqlresult)
    {
      if(err)
      {
        console.log(err);
        response.send('{"result": "false"}');
      } else {
		console.log(sqlresult);
        if(sqlresult.length === 0)
        {
          // respond with no times
          response.send('{"times": []}');
        } else {
          var times = [];
          sqlresult.forEach(function(item)
          {
            times[times.length] = JSON.parse(JSON.stringify(item.time));
          });
          response.send('{"times": ' + JSON.stringify(times) + '}');
        }
      }
    });
});

//Comment Dates
router.put("/getData/getMovieCommentDate", function(req, response)
{
  var id = req.body.id;
  var sql = "SELECT * FROM movie_comment WHERE movie_id='" + id + "' ORDER BY date ASC, time ASC";
  connection.query(sql, function(err, sqlresult)
    {
      if(err)
      {
        console.log(err);
        response.send('{"result": "false"}');
      } else {
		console.log(sqlresult);
        if(sqlresult.length === 0)
        {
          // respond with no dates
          response.send('{"dates": []}');
        } else {
          var dates = [];
          sqlresult.forEach(function(item)
          {
            dates[dates.length] = JSON.parse(JSON.stringify(item.date));
          });
          response.send('{"dates": ' + JSON.stringify(dates) + '}');
        }
      }
    });
});
router.put("/getData/getShowCommentDate", function(req, response)
{
  var id = req.body.id;
  var sql = "SELECT * FROM tv_show_comment WHERE tv_show_id='" + id + "' ORDER BY date ASC, time ASC";
  connection.query(sql, function(err, sqlresult)
    {
      if(err)
      {
        console.log(err);
        response.send('{"result": "false"}');
      } else {
		console.log(sqlresult);
        if(sqlresult.length === 0)
        {
          // respond with no dates
          response.send('{"dates": []}');
        } else {
          var dates = [];
          sqlresult.forEach(function(item)
          {
            dates[dates.length] = JSON.parse(JSON.stringify(item.date));
          });
          response.send('{"dates": ' + JSON.stringify(dates) + '}');
        }
      }
    });
});
router.put("/getData/getEpisodeCommentDate", function(req, response)
{
  var id = req.body.id;
  var sql = "SELECT * FROM episode_comment WHERE episode_id='" + id + "' ORDER BY date ASC, time ASC";
  connection.query(sql, function(err, sqlresult)
    {
      if(err)
      {
        console.log(err);
        response.send('{"result": "false"}');
      } else {
		console.log(sqlresult);
        if(sqlresult.length === 0)
        {
          // respond with no dates
          response.send('{"dates": []}');
        } else {
          var dates = [];
          sqlresult.forEach(function(item)
          {
            dates[dates.length] = JSON.parse(JSON.stringify(item.date));
          });
          response.send('{"dates": ' + JSON.stringify(dates) + '}');
        }
      }
    });
});

// start backend on port 3001
app.listen(3001, function()
{
    console.log("Server started on port 3001...");
});
