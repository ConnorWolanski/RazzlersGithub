import React from 'react';
import FriendCard from './FriendCard';

const FriendsList = ({friends, IDs}) =>
{
  var friendsList = [];
  console.log(typeof IDs);
  console.log(IDs[0]);
  for(var i = 0; i < friends.length; i++)
  {
    friendsList[friendsList.length] = JSON.parse('{"username": "' + friends[i] + '", "key": "' + IDs[i] + '"}')
  }
  console.log(friendsList);
  const finfriends = friendsList ? friendsList.map(current => (
    <div key={current.key}>
      <FriendCard username={current.username}/>
    </div>
  )) : null;
  return (
    <div>
      {finfriends}
    </div>
  );
}

export default FriendsList;
