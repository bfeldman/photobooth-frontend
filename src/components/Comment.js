import React from 'react'

function Comment({ comment }) {
  return(
    <div className="comment">
      <h4>{comment.username}</h4>
      <p>{comment.content}</p>
    </div>
  )
}

export default Comment