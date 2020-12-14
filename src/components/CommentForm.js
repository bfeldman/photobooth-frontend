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
  
  handleKeyPress = (e) => {
    if(e.key === 'Enter'){
      this.submitComment()
    }
  }
  
  submitComment = () => {
    const token = localStorage.getItem("token")
    fetch(`http://localhost:3000/api/v1/comments`, {
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