import React from 'react';
import FriendCard from './FriendCard';

const FriendsList = ({friends, IDs, parent, handler}) =>
{
  var friendsList = [];
  for(var i = 0; i < friends.length; i++)
  {
    friendsList[friendsList.length] = JSON.parse('{"username": "' + friends[i] + '", "key": "' + IDs[i] + '"}')
  }
  const finfriends = friendsList ? friendsList.map(current => (
    <div key={current.key}>
      <FriendCard username={current.username} handler = {handler}/>
    </div>
  )) : null;
  return (
    <div className="autoFlow">
      {finfriends}
    </div>
  );
}

export default FriendsList;
