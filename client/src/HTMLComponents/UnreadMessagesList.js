import React from 'react';
import UnreadMessagesCard from './UnreadMessagesCard';

const UnreadMessagesList = ({unreadList}) =>
{
  const finunread = unreadList ? unreadList.map(current => (
    <div key={current.id}>
      <UnreadMessagesCard unread={current}/>
    </div>
  )) : null;
  return (
    <div className="autoFlow">
      {finunread}
    </div>
  );
}

export default UnreadMessagesList;
