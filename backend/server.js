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
  host: "157.230.162.99",
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
        console.log(result[0].password === password);
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
  var currentUserID = 0;
  getUserListLength().then(result => {
    // inside the project so it knows what index of USER_ID we are at
    var returned = {length:result};
    var currentUserID = returned.length;
    console.log(currentUserID);
    response.send(returned);
  });
  // set vars to text fields
  // then submit to object type
  var user_id = req.body.user_id;
  var username = req.body.username;
  var first_name = req.body.first_name;
  var last_name = req.body.last_name;
  var password = req.body.password;
  var email = req.body.email;
  var activation_key = req.body.activation_key;
  var status = req.body.status;
  var display_name = req.body.display_name;
  // debug
  console.log("Concated: " + user_id + " " + username  + " " + first_name + " " + last_name + " " + password + " " + email + " " + activation_key + " " + status + " " + display_name + " ");
  // var sql = "INSERT INTO users (user_id, username, first_name, last_name, password, email, activation_key, status, display_name) VALUES (\'" + user_id + "\', \'" + username  + "\', \'" + first_name + "\', \'" + last_name + "\', \'" + password + "\', \'" + email + "\', \'" + activation_key + "\', \'" + status + "\', \'" + display_name + "\')";
  // console.log(sql);
  // connection.query(sql, function(err, result)
  // {
  //   if(err)
  //   {
  //     throw err;
  //     return;
  //   }
  //   console.log("Record inserted correctly!");
  // });
  // return;
});

// start backend on port 3001
app.listen(3001, function()
{
    console.log("Server started on port 3001...");
});
