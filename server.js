// required libs
const express = require('express');
const mysql = require('mysql')
const cors = require('cors');

// initiate express middleware
const app = express();
const router = express.Router();
app.use(cors());

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
  console.log("Connected!");
})

// function to return to frontend
router.get("/getData", function(req, response)
{
  var returned = "123";
  console.log("Received fetch request...");
  var sql = "SELECT * FROM users";
  connection.query(sql, function(err, result, fields)
  {
    if(err)
    {
      throw err;
      return;
    } else {
      //console.log(result);
      response.send(result);
      //returned = result;
      //response.send(returned);
    }
  });
});

app.use("/api", router);

// start backend on port 3001
app.listen(3001, function()
{
    console.log('Server started on port 3001...');
});
