import React from 'react';
import MessageCard from './MessageCard';

const MessageList = ({messageList}) =>
{
  console.log(messageList)
  const finMessages = messageList ? messageList.map(current => (
    <div key={current.message_id}>
      <MessageCard content={current.message_body} sender={current.user_id} time={current.time}/>
    </div>
  )) : null;
  return (
    <div className="autoFlow">
      {finMessages}
    </div>
  );
}

export default MessageList;
