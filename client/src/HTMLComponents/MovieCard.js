import React from 'react';
import {Card, CardTitle, CardMedia} from 'material-ui';

const styles = {
  cardTitle: {
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden'
  },
  cardMedia: {
    maxHeight: 394,
    overflow: 'hidden'
  },
  card: {
    cursor: 'pointer',
    height: 400,
    overflow: 'hidden'
  },
  bgImage: {
    width: '100%'
  }
};

class MovieCard extends React.Component {
  constructor(props) {
    super(props);
    // Track if the mouse hovering over the movie card
    this.state = {
      isMouseOver: false,
      isMovie: false,
      movieid: this.this.props,
      name: "",
      description: "",
      rating: 0,
      actors: "",
      release_year: 0
    };
  }
  checkParams().then(json => {
    this.setState({
      isMovie: json.isMovie,
      id: json.id,
      name: "",
      description: "",
      rating: 0,
      actors: "",
      release_year: 0
    });
    var isMovie = json.isMovie;
    var id = json.id;
    var set = {};
    getVideoInfo(isMovie, id).then(result => {
      set = result;
      if(set.hasOwnProperty("result"))
      {
        // result from server didnt pull the correct file and it doesnt exist!
        console.log("file doesnt exist!");
      } else {
        // parse good response into constants for current state
        // {title, desc, rate, act, year};
        this.setState({
          isMovie: json.isMovie,
          id: json.id,
          name: set.title,
          description: set.desc,
          rating: set.rate,
          actors: set.act,
          release_year: set.year
        });
      }
    });
  });
}
  render() {
    // The subtitle won't render if it's null
    const subtitle = this.state.isMouseOver ? movie.overview : null;

    return (
      <Card
        style={styles.card}
        onMouseOver={() => this.setState({isMouseOver: true})}
        onMouseLeave={() => this.setState({isMouseOver: false})}
        onClick={() => window.location.href='PlayVideo?isMovie=true&id=1'}>
        <CardMedia
          style={styles.cardMedia}
          overlay={
            <CardTitle
              title={movie.title}
              subtitle={subtitle}/>}>
          <img style={styles.bgImage} src={movie.poster_path} />
        </CardMedia>
      </Card>
    );
  }
}

export default MovieCard;
