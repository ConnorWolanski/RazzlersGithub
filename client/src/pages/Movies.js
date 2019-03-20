import React from "react";
import '../style.css';
import MovieList from "../HTMLComponents/MovieList";
import * as scrollHelpers from '../Helpers/ScrollHelpers';
class Movies extends React.Component {
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
      </div>
    );
  }
}
export default Movies
