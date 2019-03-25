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
function getUserListLength()
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
        resolve(result.length);
      }
    });
  });
}

// goes to MySQL DB and fetches userID of username
function getUserID(username)
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
        resolve(result[0].user_id);
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
    var status = "false";
    // debug
    //console.log("Concated: " + currentUserID + " " + username  + " " + first_name + " " + last_name + " " + password + " " + email + " " + activation_key + " " + status + " " + display_name + " ");
    // then submit to object type
    var isInserted = false;
    var sql = "INSERT INTO users (user_id, username, first_name, last_name, password, email, activation_key, status, display_name) VALUES (\'" + currentUserID + "\', \'" + username  + "\', \'" + first_name + "\', \'" + last_name + "\', \'" + password + "\', \'" + email + "\', \'" + activation_key + "\', \'" + status + "\', \'" + display_name + "\')";
    connection.query(sql, function(err, result)
    {
      if(err)
      {
        console.log(err);
        response.send('{"result": "' + isInserted + '"}');
      } else {
        isInserted = true;
        var returned = '{"result": "' + isInserted + '"}';
        console.log("Record inserted correctly!");
        response.send(returned);
      }
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
      // send JSON array of movies
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
        getShowList(sqlresult).then(listResult => {
          returned = listResult;
          response.send(returned);
        });
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
        getMovieList(sqlresult).then(listResult => {
          returned = listResult;
          response.send(returned);
        });
      }
    });
  });
});

// start backend on port 3001
app.listen(3001, function()
{
    console.log("Server started on port 3001...");
});
