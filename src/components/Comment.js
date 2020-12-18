/* renders a single comment */

import React from 'react'

function Comment({ comment }) {
  return(
    <div className="comment">
      <h4>{comment.username}:</h4>
      <p>{comment.content}</p>
      <hr />
    </div>
  )
}

export default Comment