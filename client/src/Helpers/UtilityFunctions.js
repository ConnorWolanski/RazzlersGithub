exports.getSubscribedMovieList = function()
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
