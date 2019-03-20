import React from 'react';
import {Row, Col} from 'react-bootstrap';
import ShowCard from './ShowCard';

const styles = {
  showColumn: {
    marginBottom: 20
  }
}
const ShowListComponent = ({shows}) =>
{
  const showColumns = shows ? shows.map(show => (
    <Col style={styles.showColumn} key={show.tv_show_title} xs={8} sm={4} md={2} lg={2}>
      <ShowCard show={show} />
    </Col>
  )) : null;

  return (
    <Row>
      {showColumns}
    </Row>
  );
}

export default ShowListComponent;
