import React from 'react';
import {Card, CardTitle, CardMedia} from 'material-ui';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'


const styles = {
  cardTitle: {
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden'
  },
  cardMedia: {
    maxHeight: 399,
    overflow: 'hidden'

  },
  card: {
    cursor: 'pointer',
    height: 400,
    overflow: 'hidden'
  },
  bgImage: {
    minHeight:400,
    width: '100%'
  }
};

class MovieCard extends React.Component {
  constructor(props) {
    super(props);
    // Track if the mouse hovering over the movie card
    //console.log(this.props);
    this.state = {
      isMouseOver: false,
      movie: props
    };
  }

  render() {
    const {movie} = this.props;
    var loc = "//assets.razzlers.me/assets/thumbnails/movieThumbnails/" + movie.movie_id + ".jpg";

    // The subtitle won't render if it's null
    const subtitle = this.state.isMouseOver ? movie.movie_description : null;
    return (
      <MuiThemeProvider>
        <Card
          style={styles.card}
          onMouseOver={() => this.setState({isMouseOver: true})}
          onMouseLeave={() => this.setState({isMouseOver: false})}
          onClick={() => window.location.href="PlayVideo?isMovie=true&id=" + movie.movie_id}>
          <CardMedia
            style={styles.cardMedia}
            overlay={
              <CardTitle
                title={movie.movie_name + " (" + movie.movie_release_year + ")"}
                subtitle={subtitle}/>}>
            <img style={styles.bgImage} src={loc} alt="background"/>
          </CardMedia>
        </Card>
      </MuiThemeProvider>
    );
  }
}
export default MovieCard;
