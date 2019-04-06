import React from 'react';

class FriendCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: props
    };
  }

  render() {
    const {username} = this.props;
    return (
      <div className ="friendCard">
        <font>{username}</font>
      </div>
    );
  }
}
export default FriendCard;
