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
    maxHeight: 199,
	//minWidth: 499,
    overflow: 'hidden'
  },
  card: {
    cursor: 'pointer',
    height: 200,
	//width: 500,
    overflow: 'hidden'
  },
  bgImage: {
    minHeight: 200,
	//minWidth: 500,
    width: '100%'
  }
};

class EpisodeCard extends React.Component {
  constructor(props) {
    super(props);
    // Track if the mouse hovering over the episode card
    //console.log(this.props);
    this.state = {
      isMouseOver: false,
      episode: props
    };
  }

  render() {
    const {episode} = this.props;
    var loc = "//assets.razzlers.me/assets/thumbnails/episodeThumbnails/" + episode.episode_id + ".jpg";

    // The subtitle won't render if it's null
    const subtitle = this.state.isMouseOver ? episode.episode_description : null;
    return (
      <MuiThemeProvider>
        <Card
          style={styles.card}
          onMouseOver={() => this.setState({isMouseOver: true})}
          onMouseLeave={() => this.setState({isMouseOver: false})}
          onClick={() => window.location.href="episodeInformation?isMovie=false&id=" + episode.episode_id}>
          <CardMedia
            style={styles.cardMedia}
            overlay={
              <CardTitle
                title={episode.episode_name + " (S" + episode.season_id + " E" + episode.episode_number_in_season + ")"}
                subtitle={subtitle}/>}>
            <img style={styles.bgImage} src={loc} alt="background"/>
          </CardMedia>
        </Card>
      </MuiThemeProvider>
    );
  }
}
export default EpisodeCard;
