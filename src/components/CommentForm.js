/* handle comment input and posting */

import React from 'react'
import { connect } from 'react-redux'
import { Input, Icon } from 'semantic-ui-react'

class CommentForm extends React.Component {
  
  state = {
    comment: ""
  }
  
  handleChange = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }
  
  /* submits comment on enter press*/
  handleKeyPress = (e) => {
    if(e.key === 'Enter'){
      this.submitComment()
    }
  }
  
  submitComment = () => {
    const token = localStorage.getItem("token")
    fetch(`${process.env.REACT_APP_BASE_URL}/api/v1/comments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        photo_id: this.props.photoId,
        user_id: this.props.currentUserId,
        content: this.state.comment
      })
    })
    .then(response => response.json())
    .then(data => {
      /* sends comment up to modal to be added to redux state and displayed, then resets form */
      this.props.displayNewComment(data.comment)
      this.setState({comment: ""})
    })
  }
  
  render() {
    return(
      <Input
        name="comment"
        value={this.state.comment}
        icon={<Icon name='comments outline'  />}
        iconPosition='left'
        placeholder='add comment'
        onChange={this.handleChange}
        onKeyPress={this.handleKeyPress}
      />
    )
  }
}

const mapStateToProps = state => {
  return {
      currentUserId: state.userId
  }
}

export default connect(mapStateToProps)(CommentForm)