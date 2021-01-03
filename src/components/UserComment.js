/* renders a single comment */
import React from 'react'
import { Comment } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

import { format } from 'timeago.js'


function UserComment({ comment }) {
  return(
    <Comment className="comment">
      <Comment.Content>
        <Comment.Author as={Link} to={`/gallery/${comment.username}`}>
          {comment.username}
        </Comment.Author>
        
        <Comment.Metadata>
          <div>{format(comment.created_at, { relativeDate: Date.now()})}</div>
        </Comment.Metadata>
        
        <Comment.Text>
          {comment.content}
        </Comment.Text>
      </Comment.Content>
    </Comment>
  )
}

export default UserComment