import React from "react";
import '../style.css';
import MovieList from "../HTMLComponents/MovieList";

class Movies extends React.Component {
  constructor(props)
  {
    super(props)
    this.state = {
      movieList: 0
    };
    getMovieList().then(result => {
      this.setState({ movieList: result });
    });
  }
  render() {
    const {movieList} = this.state;
    if(movieList !== 0)
    {
      return (
        <div>
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

export default Movies
