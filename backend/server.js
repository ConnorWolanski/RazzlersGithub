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

router.put("/sendMessage", function(req, response)
{
  var sender = req.body.sender;
  var recipient = req.body.recipient;
  var message = req.body.message;
  getMessageListLength().then(messageID => {
    getUserID(sender).then(senderID => {
      getUserID(recipient).then(recipientID => {
        var date = new Date();
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
        var dateString = date.getFullYear() + "-" + month + "-" + day + " " + hour + ":" + minutes + ":" + seconds;
        //console.log(messageID + ")" + senderID + " => " + recipientID + " : " + message + " D: " + dateString);
        var sql = "INSERT INTO message (message_id, user_id, recipient_user_id, message_body, time, message_status) VALUES (\'" + messageID + "\', \'" + senderID  + "\', \'" + recipientID + "\', \'" + message + "\', \'" + dateString + "\', \'0\')";
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
    var display_name = req.body.display_name;
    var activation_key = utilFunc.createActivationKey();
    var status = "0";
    var subscription_slots = "0";
    // debug
    //console.log("Concated: " + currentUserID + " " + username  + " " + first_name + " " + last_name + " " + password + " " + email + " " + activation_key + " " + status + " " + display_name + " ");
    // then submit to object type
    var sql = "INSERT INTO users (user_id, username, first_name, last_name, password, email, activation_key, status, display_name, subscription_slots) VALUES (\'" + currentUserID + "\', \'" + username  + "\', \'" + first_name + "\', \'" + last_name + "\', \'" + password + "\', \'" + email + "\', \'" + activation_key + "\', \'" + status + "\', \'" + display_name + "\', \'" + subscription_slots + "\')";
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

router.put("/getData/setSubs", function(req, response)
{
  // sets sub total to 10 for user.
  var username = req.body.username;
  getUserID(username).then(result =>
  {
    var sql = "UPDATE users SET subscription_slots=10 WHERE user_id='" + result + "'";
    connection.query(sql, function(err, sqlresult)
    {
      if(err)
      {
        console.log(err);
        response.send('{"value": "false"}');
      } else {
        response.send('{"value": "true"}');
      }
    });
  });
});

router.put("/getData/resetSubs", function(req, response)
{
  var username = req.body.username;
  getUserID(username).then(result =>
  {
    console.log(result);
    var sql = "DELETE FROM user_shows_selected WHERE user_id='" + result + "'";
    connection.query(sql, function(err, sqlresult)
    {
      if(err)
      {
        console.log(err);
        response.send('{"value": "false"}');
      } else {
        console.log("Deleted subbed shows for userID: " + result);
      }
    });
    var sql = "DELETE FROM user_movies_selected WHERE user_id='" + result + "'";
    connection.query(sql, function(err, sqlresult)
    {
      if(err)
      {
        console.log(err);
        response.send('{"value": "false"}');
      } else {
        console.log("Deleted subbed movies for userID: " + result);
        response.send('{"value": "true"}');
      }
    });
  });
});

router.put("/getData/subscribe", function(req, response)
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
            console.log("isMovie: true");
            var sql = "SELECT movie_id FROM user_movies_selected WHERE user_id='" + result + "'";
            connection.query(sql, function(err, sqlresult)
            {
              if(err)
              {
                console.log(err);
                response.send('{"value": "false"}');
              } else {
                // result = tv_show_id array
                getMovieList(sqlresult).then(listResult => {
                  returned = listResult.includes(parseInt(id,10));
                  if(!returned)
                  {
                    // list does not contain the subbed movie
                    // add it to movie db and return {value:true}
                    var sql = "INSERT INTO user_movies_selected (user_id, movie_id) VALUES (\'" + result + "\', \'" + id + "\')";
                    connection.query(sql, function(err, result)
                    {
                      if(err)
                      {
                        console.log(err);
                        response.send('{"value": "false"}');
                      } else {
                        console.log(username + " has subscribed to movie " + id);
                        response.send('{"value": "true"}');
                      }
                    });
                  } else {
                    // list does contain the subbed movie
                    // return {value:true}
                    response.send('{"value": "true"}');
                  }
                });
              }
            });
          } else {
            console.log("isMovie: false");
            var sql = "SELECT tv_show_id FROM user_shows_selected WHERE user_id='" + result + "'";
            connection.query(sql, function(err, sqlresult)
            {
              if(err)
              {
                console.log(err);
                response.send('{"value": "false"}');
              } else {
                // result = tv_show_id array
                getShowList(sqlresult).then(listResult => {
                  returned = listResult.includes(parseInt(id,10));
                  if(!returned)
                  {
                    // list does not contain the subbed movie
                    // add it to movie db and return {value:true}
                    var sql = "INSERT INTO user_shows_selected (user_id, tv_show_id) VALUES (\'" + result + "\', \'" + id + "\')";
                    connection.query(sql, function(err, result)
                    {
                      if(err)
                      {
                        console.log(err);
                        response.send('{"value": "false"}');
                      } else {
                        console.log(username + " has subscribed to show " + id);
                        response.send('{"value": "true"}');
                      }
                    });
                  } else {
                    // list does contain the subbed movie
                    // return {value:true}
                    response.send('{"value": "true"}');
                  }
                });
              }
            });
          }
        } else {
          // they are at capacity!
          response.send('{"value": "full"}')
        }
      });
    });
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
		console.log("Fetched username: " + user);
        // build the response from result
        var back = '{"result": "false"}';
		var accountStatus = "";
        if(result[0] !== null)
        {
		  if(result[0].status == 0){
			  accountStatus = "Inactive";
		  }
		  else if(result[0].status == 1){
			  accountStatus = "Active";
		  }

          back = '{"id": "' + result[0].user_id + '", "first": "' + result[0].first_name +
                  '", "last": "' + result[0].last_name + '", "email": "' + result[0].email + '", "status": "' +
				  accountStatus + '", "display": "' + result[0].display_name + '", "user": "' + result[0].username + '"}';
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

// start backend on port 3001
app.listen(3001, function()
{
    console.log("Server started on port 3001...");
});
