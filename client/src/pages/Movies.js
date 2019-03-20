import React from "react";
import '../style.css';
import MovieList from "../HTMLComponents/MovieList";
import * as scrollHelpers from '../Helpers/ScrollHelpers';
class Movies extends React.Component {
<<<<<<< HEAD
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     currentPage: 1
  //   };
  //   this.handleScroll = this.handleScroll.bind(this);
  // }
  //
  // componentDidMount() {
  //   window.onscroll = this.handleScroll;
  //   this.props.getTopMovies(this.state.currentPage);
  // }
  //
  // componentWillUnmount() {
  //   window.removeEventListener('scroll', this.handleScroll);
  // }
  //
  // handleScroll() {
  //   const {topMovies} = this.props;
  //   if (!topMovies.isLoading) {
  //     let percentageScrolled = scrollHelpers.getPercentageScrolledDown(window);
  //     if (percentageScrolled > .8) {
  //       const nextPage = this.state.currentPage + 1;
  //       this.props.getTopMovies(nextPage);
  //       this.setState({currentPage: nextPage});
  //     }
  //   }
  // }
//  <MovieList movies={movies}/>
  render() {
    const movies;
    return (
      <div>
      <h2><font color ="white" size = "50">Movies</font></h2>
      <MovieCard movie={movie} />
      <button className="button2" onClick={() => window.location.href='PlayVideo?isMovie=true&id=1'}>PlayVideo</button>
=======
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
    /*if(typeof movieList === "object")
    {
      console.log(movieList[0].movie_name);
    }*/
    return (
      <div>
        <h2><font color ="white" size = "50">Movies</font></h2>
        <button className="button2" onClick={() => window.location.href='PlayVideo?isMovie=true&id=1'}>PlayVideo</button>
>>>>>>> 00ad7e835ff2651b4594702a023e37d41e0e0fef
      </div>
    );
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
