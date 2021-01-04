import React from 'react'
import { connect } from 'react-redux'
import { Form, Input, Checkbox, Segment } from 'semantic-ui-react'



class Settings extends React.Component {
  
  state = {
    username: this.props.storeUsername
  }
  
  componentDidMount() {
  }
  
  /* sends patch request and then updates redux state */
  updateUsername = () => {
    const token = localStorage.getItem("token")
    fetch(`http://localhost:3000/api/v1/users/${this.props.userId}`, {
      method: "PATCH",
      headers: {
          "Content-Type": "application/json",
          "Accepts": "application/json",
          Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({username: this.state.username})
    })
    .then(response => response.json())
    .then(data => {
      this.props.dispatch({
        type: 'UPDATE_USERNAME',
        payload: {
          username: data.user.username
        }
      })
      this.props.history.push(`/gallery/${this.state.username}`)
    })
  }
  
  togglePublic = () => {
    const token = localStorage.getItem("token")
    fetch(`http://localhost:3000/api/v1/users/${this.props.userId}`, {
      method: "PATCH",
      headers: {
          "Content-Type": "application/json",
          "Accepts": "application/json",
          Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({is_public: !this.props.storeUserIsPublic})
    })
    .then(response => response.json())
    .then(data => {
      this.props.dispatch({
        type: 'UPDATE_IS_PUBLIC',
        payload: {
          userIsPublic: data.user.is_public
        }
      })
    })
  }
  
  /* renders form with current user details from Redux state */
  render() {
    return (
      <Segment.Group style={{width:"600px", margin:"0 auto"}}>
        <Segment>
            <Form onSubmit={this.updateUsername}>
              <Form.Field>
                <Input
                  label="change username"
                  placeholder={this.props.storeUsername}
                  value={this.state.username}
                  onChange={(e, {value}) => {
                    this.setState({username: value})
                  }}
                />
              </Form.Field>
            </Form>
        </Segment>
        <Segment>
              <Checkbox
                toggle
                label={this.props.storeUserIsPublic ? "Profile visibility: PUBLIC" : "Profile visibility: PRIVATE"}
                defaultChecked={this.props.storeUserIsPublic}
                onClick={this.togglePublic}
              />
        </Segment>
      </Segment.Group>
      
    )
  }
}

const mapStateToProps = state => {
  return {
    userId: state.userId,
    storeUsername: state.username,
    storeUserIsPublic: state.userIsPublic
  }
}

const mapDispatchToProps = dispatch => {
  return {
    dispatch
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings)