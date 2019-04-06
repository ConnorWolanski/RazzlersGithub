import React from "react";
import '../style.css';
import MovieList from "../HTMLComponents/MovieList";

const utilFunc = require('../Helpers/UtilityFunctions');

class Movies extends React.Component {
  constructor(props)
  {
    super(props)
    this.state = {
      movieList: 0
    };
    utilFunc.getMovieList().then(result => {
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

export default Movies
