import React from "react";
import '../style.css';
import MovieList from "../HTMLComponents/MovieList";
import ShowList from "../HTMLComponents/ShowList";

const utilFunc = require('../Helpers/UtilityFunctions');

class Home extends React.Component {
  constructor(props)
  {
    super(props)
    this.state = {
      movieList: 0,
      showList: 0
    };
    utilFunc.getTopMovieList().then(result => {
      this.setState({ movieList: result });
	  utilFunc.getTopShowList().then(result => {
		this.setState({ showList: result });
	  });
    });
  }
  render() {
    const {movieList, showList} = this.state;
	var username = window.localStorage.getItem("Razzlers_Username");
	//user is logged in
	if (username != null) {
		if(movieList !== 0 && showList !== 0) {
		  return (
			<div>
			  <h2><font  color = "white" size = "50"> Welcome {username}! </font></h2>
			  <p className="centerTextWithBackLonger"><font color ="black" size="500">Top Movies</font></p>
				<MovieList movies={movieList}></MovieList>
			  <p className="centerTextWithBackLonger"><font color ="black" size="500">Top Shows</font></p>
				<ShowList shows={showList}></ShowList>
			</div>
		  );
		}
	}
	else {
		if(movieList !== 0 && showList !== 0) {
		  return (
			<div>
			  <h2><font  color = "white" size = "50"> Welcome to Razzlers! </font></h2>
			  <p className="centerTextWithBackLonger"><font color ="black" size="500">Top Movies</font></p>
				<MovieList movies={movieList}></MovieList>
			  <p className="centerTextWithBackLonger"><font color ="black" size="500">Top Shows</font></p>
				<ShowList shows={showList}></ShowList>
			</div>
		  );
		}
		
	}
    
    return(<div></div>);
  }
}

function printTest()
{
  console.log(localStorage.getItem("Razzlers_Username") + "> " + localStorage.getItem("Razzlers_Subscribed_Shows") + " : " + localStorage.getItem("Razzlers_Subscribed_Movies"));
}

export default Home
