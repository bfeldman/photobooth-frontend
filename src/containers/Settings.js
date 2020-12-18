import React from 'react'
import { connect } from 'react-redux'
import { Form, Input } from 'semantic-ui-react'



class Settings extends React.Component {
  
  state = {
    username: ""
  }
  
  componentDidMount() {
  }
  
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
  
  render() {
    return (
      <Form onSubmit={this.updateUsername}>
        <Input
          label="change username"
          placeholder={this.props.storeUsername}
          value={this.state.username}
          onChange={(e, {value}) => {
            this.setState({username: value})
          }}
        />
      </Form>
    )
  }
}

const mapStateToProps = state => {
  return {
    userId: state.userId,
    storeUsername: state.username
  }
}

const mapDispatchToProps = dispatch => {
  return {
    dispatch
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings)