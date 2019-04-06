import React from "react";
import '../style.css';
import MovieList from "../HTMLComponents/MovieList";
import ShowList from "../HTMLComponents/ShowList";

const utilFunc = require('../Helpers/UtilityFunctions');

class Search extends React.Component {
  constructor(props)
  {
    super(props)
    this.state = {
      movieList: 0,
      showList: 0,
      search: ""
    };
    getSearch().then(result => {this.setState({ search: result});});
    utilFunc.getMovieList().then(result => {
      this.setState({ movieList: result });
    });
    utilFunc.getShowList().then(result => {
      this.setState({ showList: result });
    });
  }
  render() {
    var {movieList, showList, search} = this.state;
    if(Array.isArray(movieList)){
      searchMovies(movieList, search).then(result => {movieList = result;});
    }
    if(Array.isArray(showList)){
      searchShows(showList, search).then(result => {showList = result;});
    }
    if(Array.isArray(movieList) && movieList.length>0 && Array.isArray(showList) && showList.length>0 ){
      return (
        <div>
          <h2 className="centerText"><font color ="white" size = "50">{"Showing results for \"" + search +"\""}</font></h2>
          <p className="centerTextWithBack"><font color ="black" size="1000">Movies</font></p>
          <MovieList movies={movieList}></MovieList>
          <p className="centerTextWithBack"><font color ="black" size="1000">Shows</font></p>
          <ShowList shows={showList}></ShowList>
        </div>
      );
    }else if (Array.isArray(movieList) && movieList.length>0) {
      return (
        <div>
          <h2 className="centerText"><font color ="white" size = "50">{"Showing results for \"" + search +"\""}</font></h2>
          <p className="centerTextWithBack"><font color ="black" size="1000">Movies</font></p>
          <MovieList movies={movieList}></MovieList>
          <p className="centerTextWithBack"><font color ="black" size="1000">Shows</font></p>
          <h2 className="centerText"><font color ="white" size = "50">{"No Show results for \"" + search + "\""}</font></h2>
        </div>
      );
    }else if (Array.isArray(showList) && showList.length>0) {
      return (
        <div>
          <h2 className="centerText"><font color ="white" size = "50">{"Showing results for \"" + search +"\""}</font></h2>
          <p className="centerTextWithBack"><font color ="black" size="1000">Shows</font></p>
          <ShowList shows={showList}></ShowList>
          <p className="centerTextWithBack"><font color ="black" size="1000">Movies</font></p>
          <h2 className="centerText"><font color ="white" size = "50">{"No Movie results for \"" + search + "\""}</font></h2>
        </div>
      );
    }else{
      return(
        <h2 className="centerText"><font color ="white" size = "50">{"No results for \"" + search + "\""}</font></h2>
      )
    }
  }
}
function getSearch()
{
  return new Promise(function(resolve, reject)
  {
    var url = window.location.href;
    url = new URL(url);
    var search = url.searchParams.get("search");
    resolve(search);
  });
}
function searchMovies(movieList, search)
{
  return new Promise(function(resolve, reject)
  {
    var movies = movieList;
    var s = search.toLowerCase();
    for(var i = movies.length-1; i>=0; i--){
      if(!movies[i].movie_name.toLowerCase().includes(s)){
        movies.splice(i,1);
      }
    }
    resolve({movies});
  });
}
function searchShows(showList, search)
{
  return new Promise(function(resolve, reject)
  {
    var shows = showList;
    var s = search.toLowerCase();
    for(var i = shows.length-1; i>=0; i--){
      if(!shows[i].tv_show_title.toLowerCase().includes(s)){
        shows.splice(i,1);
      }
    }
    resolve({shows});
  });
}
export default Search
