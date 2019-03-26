import React from "react";
import '../style.css';
import MovieList from "../HTMLComponents/MovieList";
import ShowList from "../HTMLComponents/ShowList";

const utilFunc = require('../Helpers/UtilityFunctions');

class Subscriptions extends React.Component {
  constructor(props)
  {
    super(props)
    this.state = {
      movieList: 0,
      showList: 0
    };
    utilFunc.getSubscribedShowList().then(result => {
      this.setState({ showList: result });
    });
    utilFunc.getSubscribedMovieList().then(result => {
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

export default Subscriptions
