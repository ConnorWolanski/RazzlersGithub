import React from 'react';
import {Row, Col} from 'react-bootstrap';
import MovieCard from './MovieCard';

const styles = {
  movieColumn: {
    marginBottom: 20
  }
}
const MovieListComponent = ({movies}) =>
{
  const movieColumns = movies ? movies.map(movie => (
    <Col style={styles.movieColumn} key={movie.movie_id} xs={8} sm={4} md={2} lg={2}>
      <MovieCard movie={movie} />
    </Col>
  )) : null;

  return (
    <Row>
      {movieColumns}
    </Row>
  );
}

export default MovieListComponent;
