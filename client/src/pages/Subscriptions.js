import React from "react";
import '../style.css';
import MovieList from "../HTMLComponents/MovieList";
import ShowList from "../HTMLComponents/ShowList";

class Subscriptions extends React.Component {
  constructor(props)
  {
    super(props)
    this.state = {
      movieList: 0,
      showList: 0
    };
    getShowList().then(result => {
      this.setState({ showList: result });
    });
    getMovieList().then(result => {
      this.setState({ movieList: result });
    });

  }
  render() {
    const {movieList, showList} = this.state;
    if(movieList !== 0 && showList !==0)
    {
      return (
        <div>
          <p className="centerTextWithBack"><font color ="black" size="1000">Shows</font></p>
            <ShowList shows={showList}></ShowList>

          <p className="centerTextWithBack"><font color ="black" size="1000">Movies</font></p>
            <MovieList movies={movieList}></MovieList>

        </div>
      );
    }
    return(<div></div>);
  }
}

function getMovieList()
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
    const url = "http://localhost:3001/api/getData/getSubscribedMovies";
    fetch(url, transport).then(result => result.json()).then(json => {
      resolve(json);
    }).catch(err => {
      throw new Error(err);
    });
  });
}
function getShowList()
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
    const url = "http://localhost:3001/api/getData/getSubscribedShows";
    fetch(url, transport).then(result => result.json()).then(json => {
      resolve(json);
    }).catch(err => {
      throw new Error(err);
    });
  });
}
export default Subscriptions
