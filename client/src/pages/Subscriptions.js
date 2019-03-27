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
    if(Array.isArray(movieList) && Array.isArray(showList))
    {
      return (
        <div>
          <p className="centerTextWithBack"><font color ="black" size="1000">Shows</font></p>
            <ShowList shows={showList}></ShowList>

          <p className="centerTextWithBack"><font color ="black" size="1000">Movies</font></p>
            <MovieList movies={movieList}></MovieList>

        </div>
      );
    }else if (Array.isArray(movieList)) {
      return(
        <div>
          <p className="centerTextWithBack"><font color ="black" size="1000">Movies</font></p>
          <MovieList movies={movieList}></MovieList>
          <p className="centerTextWithBack"><font color ="black" size="1000">Shows</font></p>
          <h2 className="centerText"><font color ="white" size = "50">No Shows Subscribed</font></h2>
        </div>
      );
    }else if (Array.isArray(showList)) {
      return(
        <div>
          <p className="centerTextWithBack"><font color ="black" size="1000">Shows</font></p>
          <ShowList shows={showList}></ShowList>
          <p className="centerTextWithBack"><font color ="black" size="1000">Movies</font></p>
          <h2 className="centerText"><font color ="white" size = "50">No Movies Subscribed</font></h2>
        </div>
      );
    }
    return(
      <div className = "centerText">
        <h2><font color ="white" size = "50">No Subscriptions</font></h2>
        <button className = "button2">Subscribe To Get Content</button>
    </div>);
  }
}

export default Subscriptions
