import React from 'react';
import CommentCard from './CommentCard';

const CommentsList = ({bodies, IDs}) =>
{
  var commentsList = [];
  for(var i = 0; i < bodies.length; i++)
  {
    commentsList[commentsList.length] = JSON.parse('{"body": "' + bodies[i] + '", "key": "' + IDs[i] + '"}')
  }
  const finbodies = commentsList ? commentsList.map(current => (
    <div key={current.key}>
      <CommentCard body={current.body}/>
    </div>
  )) : null;
  return (
    <div>
      {finbodies}
    </div>
  );
}

export default CommentsList;
