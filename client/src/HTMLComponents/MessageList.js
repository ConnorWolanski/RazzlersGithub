import React from 'react';
import MessageCard from './MessageCard';

const MessageList = ({messageList}) =>
{
  const finMessages = messageList ? messageList.map(current => (
    <div key={current.message_id}>
      <MessageCard content={current.message_body} sender={current.user_id} time={current.time}/>
    </div>
  )) : null;
  return (
    <div>
      {finMessages}
    </div>
  );
}

export default MessageList;
