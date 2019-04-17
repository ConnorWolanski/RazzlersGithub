import React from 'react';

class CommentCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: props,
	  body: props
    };
  }

  render() {
    const {username, body} = this.props;
    return (
      <div className ="commentCard">
        <font>{username}</font>
		<font>{body}</font>
      </div>
    );
  }
}
export default CommentCard;
