exports.getMovieList = function()
{
  return getMovieList();
}

function getMovieList()
{
  return new Promise(function(resolve, reject)
  {
    var transport = {
      headers: {
        'Content-Type': "application/json"
      },
      method: "GET"
    };
    const url = "http://razzlers.me:3001/api/getData/getMovieList";
    fetch(url, transport).then(result => result.json()).then(json => {
      resolve(json);
    }).catch(err => {
      throw new Error(err);
    });
  });
}

exports.getUsersFriends = function(user)
{
  return getUsersFriends(user);
}

function getUsersFriends(user) {
  return new Promise(function(resolve, reject) {
    var data = '{"username": "' + user + '"}';
    data = JSON.parse(data);
    var transport = {
      headers: {
        'Content-Type': "application/json"
      },
      method: "PUT",
      body: JSON.stringify(data)
    };
    const url = "http://razzlers.me:3001/api/getData/getUsersFriends";
    fetch(url, transport).then(result => result.json()).then(json => {
      //console.log(json);
      resolve(json);
    }).catch(err => {
      throw new Error(err);
    });
  });
}

exports.getShowList = function()
{
  return getShowList();
}


function getShowList()
{
  return new Promise(function(resolve, reject)
  {
    var transport = {
      headers: {
        'Content-Type': "application/json"
      },
      method: "GET"
    };
    const url = "http://razzlers.me:3001/api/getData/getShowList";
    fetch(url, transport).then(result => result.json()).then(json => {
      resolve(json);
    }).catch(err => {
      throw new Error(err);
    });
  });
}

exports.getSubscribedMovieList = function()
{
  return getSubscribedMList();
}

function getSubscribedMList()
{
  return new Promise(function(resolve, reject)
  {
    var username = window.localStorage.getItem("Razzlers_Username");
    // check if username is undefined
    var data = '{"username": "' + username + '"}';
    data = JSON.parse(data);
    var transport = {
      headers: {
        'Content-Type': "application/json"
      },
      method: "PUT",
      body: JSON.stringify(data)
    };
    const url = "http://razzlers.me:3001/api/getData/getSubscribedMovies";
    fetch(url, transport).then(result => result.json()).then(json => {
      resolve(json);
    }).catch(err => {
      throw new Error(err);
    });
  });
}

exports.getSubscribedShowList = function()
{
  return getSubscribedSList();
}

function getSubscribedSList()
{
  return new Promise(function(resolve, reject)
  {
    var username = window.localStorage.getItem("Razzlers_Username");
    // check if username is undefined
    var data = '{"username": "' + username + '"}';
    data = JSON.parse(data);
    var transport = {
      headers: {
        'Content-Type': "application/json"
      },
      method: "PUT",
      body: JSON.stringify(data)
    };
    const url = "http://razzlers.me:3001/api/getData/getSubscribedShows";
    fetch(url, transport).then(result => result.json()).then(json => {
      resolve(json);
    }).catch(err => {
      throw new Error(err);
    });
  });
}

exports.updateLocalSubscribedLists = function()
{
  return new Promise(function(resolve, reject)
  {
    getSubscribedSList().then(result => {
      var showList = [];
      if(Array.isArray(result))
      {
        result.forEach(function(show)
        {
          showList[showList.length] = show.tv_show_id;
        });
        localStorage.setItem("Razzlers_Subscribed_Shows", JSON.stringify(showList));
      } else {
        localStorage.setItem("Razzlers_Subscribed_Shows", null);
      }
    });
    getSubscribedMList().then(result =>
    {
      var movieList = [];
      if(Array.isArray(result))
      {
        result.forEach(function(movie)
        {
          movieList[movieList.length] = movie.movie_id;
        });
        localStorage.setItem("Razzlers_Subscribed_Movies", JSON.stringify(movieList));
      } else {
        localStorage.setItem("Razzlers_Subscribed_Movies", null);
      }
      resolve(true);
    });
  });
}

exports.getUsersMessages = function(sender, recipient)
{
  return new Promise(function(resolve, reject) {
    var data = '{"sender": "' + sender + '", "recipient": "' + recipient + '"}';
    data = JSON.parse(data);
    var transport = {
      headers: {
        'Content-Type': "application/json"
      },
      method: "PUT",
      body: JSON.stringify(data)
    };
    const url = "http://razzlers.me:3001/api/getData/getUsersMessages";
    fetch(url, transport).then(result => result.json()).then(json => {
      resolve(json);
    }).catch(err => {
      throw new Error(err);
    });
  });
}

exports.getUsernameFromID = function(id)
{
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
    const url = "http://razzlers.me:3001/api/getData/getUsernameOfID";
    fetch(url, transport).then(result => result.json()).then(json => {
      resolve(json);
    }).catch(err => {
      throw new Error(err);
    });
  });
}

/*exports.forceUpdateMessages = function()
{
  var sender = window.localStorage.getItem("Razzlers_Username");
  var recip = document.getElementById("messageTitle").innerHTML;
  if(sender !== recip)
  {
    getUsersMessages(sender, recip).then(result => {
      document.getElementById("textMessages").innerHTML = JSON.stringify(result);
    });
  }
}*/

exports.getTopMovieList = function()
{
  return getTopMovieList();
}

function getTopMovieList()
{
  return new Promise(function(resolve, reject)
  {
    var transport = {
      headers: {
        'Content-Type': "application/json"
      },
      method: "GET"
    };
    const url = "http://razzlers.me:3001/api/getData/getTopMovieList";
    fetch(url, transport).then(result => result.json()).then(json => {
      resolve(json);
    }).catch(err => {
      throw new Error(err);
    });
  });
}

exports.getTopShowList = function()
{
  return getTopShowList();
}


function getTopShowList()
{
  return new Promise(function(resolve, reject)
  {
    var transport = {
      headers: {
        'Content-Type': "application/json"
      },
      method: "GET"
    };
    const url = "http://razzlers.me:3001/api/getData/getTopShowList";
    fetch(url, transport).then(result => result.json()).then(json => {
      resolve(json);
    }).catch(err => {
      throw new Error(err);
    });
  });
}

exports.getEpisodeList = function(id)
{
  return getEpisodeList(id);
}


function getEpisodeList(id)
{
  return new Promise(function(resolve, reject) {
	var data = '{"showID": "' + id + '"}';
	data = JSON.parse(data);
    var transport = {
      headers: {
        'Content-Type': "application/json"
      },
      method: "PUT",
	  body: JSON.stringify(data)
    };
    const url = "http://razzlers.me:3001/api/getData/getEpisodeList";
    fetch(url, transport).then(result => result.json()).then(json => {
      //console.log(json);
      resolve(json);
    }).catch(err => {
      throw new Error(err);
    });
  });
}

//Comment bodies
exports.getMovieComments = function(id)
{
  return getMovieComments(id);
}

function getMovieComments(id) {
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
    const url = "http://razzlers.me:3001/api/getData/getMovieCommentList";
    fetch(url, transport).then(result => result.json()).then(json => {
      //console.log(json);
      resolve(json);
    }).catch(err => {
      throw new Error(err);
    });
  });
}

exports.getShowComments = function(id)
{
  return getShowComments(id);
}

function getShowComments(id) {
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
    const url = "http://razzlers.me:3001/api/getData/getShowCommentList";
    fetch(url, transport).then(result => result.json()).then(json => {
      //console.log(json);
      resolve(json);
    }).catch(err => {
      throw new Error(err);
    });
  });
}

exports.getEpisodeComments = function(id)
{
  return getEpisodeComments(id);
}

function getEpisodeComments(id) {
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
    const url = "http://razzlers.me:3001/api/getData/getEpisodeCommentList";
    fetch(url, transport).then(result => result.json()).then(json => {
      //console.log(json);
      resolve(json);
    }).catch(err => {
      throw new Error(err);
    });
  });
}

//Comment usernames
exports.getMovieCommentsUsername = function(id)
{
  return getMovieCommentsUsername(id);
}

function getMovieCommentsUsername(id) {
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
    const url = "http://razzlers.me:3001/api/getData/getMovieCommentUsername";
    fetch(url, transport).then(result => result.json()).then(json => {
      //console.log(json);
      resolve(json);
    }).catch(err => {
      throw new Error(err);
    });
  });
}

exports.getShowCommentsUsername = function(id)
{
  return getShowCommentsUsername(id);
}

function getShowCommentsUsername(id) {
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
    const url = "http://razzlers.me:3001/api/getData/getShowCommentUsername";
    fetch(url, transport).then(result => result.json()).then(json => {
      //console.log(json);
      resolve(json);
    }).catch(err => {
      throw new Error(err);
    });
  });
}

exports.getEpisodeCommentsUsername = function(id)
{
  return getEpisodeCommentsUsername(id);
}

function getEpisodeCommentsUsername(id) {
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
    const url = "http://razzlers.me:3001/api/getData/getEpisodeCommentUsername";
    fetch(url, transport).then(result => result.json()).then(json => {
      //console.log(json);
      resolve(json);
    }).catch(err => {
      throw new Error(err);
    });
  });
}

//Comment times
exports.getMovieCommentsTime = function(id)
{
  return getMovieCommentsTime(id);
}

function getMovieCommentsTime(id) {
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
    const url = "http://razzlers.me:3001/api/getData/getMovieCommentTime";
    fetch(url, transport).then(result => result.json()).then(json => {
      //console.log(json);
      resolve(json);
    }).catch(err => {
      throw new Error(err);
    });
  });
}

exports.getShowCommentsTime = function(id)
{
  return getShowCommentsTime(id);
}

function getShowCommentsTime(id) {
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
    const url = "http://razzlers.me:3001/api/getData/getShowCommentTime";
    fetch(url, transport).then(result => result.json()).then(json => {
      //console.log(json);
      resolve(json);
    }).catch(err => {
      throw new Error(err);
    });
  });
}

exports.getEpisodeCommentsTime = function(id)
{
  return getEpisodeCommentsTime(id);
}

function getEpisodeCommentsTime(id) {
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
    const url = "http://razzlers.me:3001/api/getData/getEpisodeCommentTime";
    fetch(url, transport).then(result => result.json()).then(json => {
      //console.log(json);
      resolve(json);
    }).catch(err => {
      throw new Error(err);
    });
  });
}

//Comment date
exports.getMovieCommentsDate = function(id)
{
  return getMovieCommentsDate(id);
}

function getMovieCommentsDate(id) {
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
    const url = "http://razzlers.me:3001/api/getData/getMovieCommentDate";
    fetch(url, transport).then(result => result.json()).then(json => {
      //console.log(json);
      resolve(json);
    }).catch(err => {
      throw new Error(err);
    });
  });
}

exports.getShowCommentsDate = function(id)
{
  return getShowCommentsDate(id);
}

function getShowCommentsDate(id) {
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
    const url = "http://razzlers.me:3001/api/getData/getShowCommentDate";
    fetch(url, transport).then(result => result.json()).then(json => {
      //console.log(json);
      resolve(json);
    }).catch(err => {
      throw new Error(err);
    });
  });
}

exports.getEpisodeCommentsDate = function(id)
{
  return getEpisodeCommentsDate(id);
}

function getEpisodeCommentsDate(id) {
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
    const url = "http://razzlers.me:3001/api/getData/getEpisodeCommentDate";
    fetch(url, transport).then(result => result.json()).then(json => {
      //console.log(json);
      resolve(json);
    }).catch(err => {
      throw new Error(err);
    });
  });
}

