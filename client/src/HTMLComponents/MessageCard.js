import React from 'react';

class MessageCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sender: props.sender,
      content: props.content,
      time: props.time
    };
  }

  render()
  {
    const {content, sender, time} = this.props;
    return (
      <div className="messageBubble">
        <font color = "white">{sender}</font>
        <font color = "white">{content}</font>
        <font color = "white">{time}</font>
      </div>);
  }
}

export default MessageCard;
