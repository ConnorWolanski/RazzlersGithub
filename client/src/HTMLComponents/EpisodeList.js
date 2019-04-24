import React from 'react';
import {Row, Col} from 'react-bootstrap';
import EpisodeCard from './EpisodeCard';

const styles = {
  showColumn: {
    marginBottom: 20
  }
}
const ShowListComponent = ({episodes}) =>
{
  const showColumns = episodes ? episodes.map(episode => (
    <Col style={styles.showColumn} key={episodes.episode_name} xs={8} sm={4} md={2} lg={2}>
      <EpisodeCard episode={episode} />
    </Col>
  )) : null;

  return (
    <Row>
      {showColumns}
    </Row>
  );
}

export default ShowListComponent;
