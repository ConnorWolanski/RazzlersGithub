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
    width: '100%'
  }
};

class ShowCard extends React.Component {
  constructor(props) {
    super(props);
    // Track if the mouse hovering over the show card
    //console.log(this.props);
    this.state = {
      isMouseOver: false,
      show: props
    };
  }

  render() {
    const {show} = this.props;
    var loc = "//razzlers.me/assets/thumbnails/showThumbnails/" + show.tv_show_id + ".jpg";

    // The subtitle won't render if it's null
    const subtitle = this.state.isMouseOver ? show.tv_show_description : null;
    return (
      <MuiThemeProvider>
        <Card
          style={styles.card}
          onMouseOver={() => this.setState({isMouseOver: true})}
          onMouseLeave={() => this.setState({isMouseOver: false})}
          onClick={() => window.location.href="PlayVideo?isMovie=false&id=" + show.tv_show_id}>
          <CardMedia
            style={styles.cardMedia}
            overlay={
              <CardTitle
                title={show.tv_show_name + " (" + show.tv_show_release_year + ")"}
                subtitle={subtitle}/>}>
            <img style={styles.bgImage} src={loc} alt="background"/>
          </CardMedia>
        </Card>
      </MuiThemeProvider>
    );
  }
}
export default ShowCard;
