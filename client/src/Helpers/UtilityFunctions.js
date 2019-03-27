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
    const url = "//localhost:3001/api/getData/getSubscribedMovies";
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
    const url = "//localhost:3001/api/getData/getSubscribedShows";
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
