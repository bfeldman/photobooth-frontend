/* renders a single comment */
import React from 'react'
import { Comment as SComment } from 'semantic-ui-react'
import { Link } from 'react-router-dom'


function Comment({ comment }) {
  return(
    <SComment className="comment">
      <SComment.Content>
        <SComment.Author as={Link} to={`/gallery/${comment.username}`}>
          {comment.username}
        </SComment.Author>
        <SComment.Text>{comment.content}</SComment.Text>
      </SComment.Content>
    </SComment>
  )
}

export default Comment