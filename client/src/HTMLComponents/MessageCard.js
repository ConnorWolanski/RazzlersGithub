import React from 'react';
const utilFunc = require('../Helpers/UtilityFunctions');

class MessageCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sender: props.sender,
      content: props.content,
      time: props.time,
      areSender: false
    };
    utilFunc.getUsernameFromID(props.sender).then(result=>
      {
        this.setState({sender:result.username});
        if(result.username.toLowerCase()===window.localStorage.getItem("Razzlers_Username").toLowerCase()){
          this.setState({areSender:true});
        }
      });
  }

  render()
  {
    const {content, sender, time, areSender} = this.state;
    if(areSender){
      return (
        <div className="leftmessageBubble">
          <font color = "white">{sender+":"}</font><br/>
          <font color = "white">{content}</font><br/>
          <div className = "time">
            <font color = "white">{time}</font>
          </div>
        </div>);
    }else{
      return (
        <div className="rightmessageBubble">
          <font color = "white">{sender+":"}</font><br/>
          <font color = "white">{content}</font><br/>
          <div className = "time">
            <font color = "white">{time}</font>
          </div>
        </div>);
    }
  }
}

export default MessageCard;
