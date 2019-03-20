import React from "react";
import '../style.css';
import MovieList from "../HTMLComponents/MovieList";
//import * as scrollHelpers from '../Helpers/ScrollHelpers';
import MovieCard from '../HTMLComponents/MovieCard';
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
    //console.log(this.state);
    /*if(typeof movieList === "object")
    {
      console.log(movieList[0].movie_name);
    }*/
    //console.log(movieList[0]);
    if(movieList !== 0){
      console.log(movieList)
    return (
      <div>
        <h2><font color ="white" size = "50">Movies</font></h2>
          <MovieCard movie={movieList[0]}></MovieCard>
        <button className="button2" onClick={() => window.location.href='PlayVideo?isMovie=true&id=1'}>PlayVideo</button>
      </div>
    );
    }
    return(<div></div>)
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
    const url = "http://localhost:3001/api/getData/getMovieList";
    fetch(url, transport).then(result => result.json()).then(json => {
      resolve(json);
    }).catch(err => {
      throw new Error(err);
    });
  });
}

export default Movies
