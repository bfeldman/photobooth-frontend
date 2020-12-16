import React from 'react'
import { connect } from 'react-redux'
import { Form, Input, Button } from 'semantic-ui-react'


class Settings extends React.Component {
  
  state = {
    username: this.props.currentUsername
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
      console.log("updated!", data.user)
      this.props.dispatch({
        type: 'UPDATE_USERNAME',
        payload: {
          username: data.user.username
        }
      })
    })
  }
  
  render() {
    return (
      <Form>
        <Input
          placeholder="username"
          value={this.state.username}
          onChange={(e, {value}) => {
            this.setState({username: value}, () => console.log(this.state.username))
          }}
        />
        <Button onClick={this.updateUsername}>Update</Button>
      </Form>
    )
  }
}

const mapStateToProps = state => {
  return {
    currentUsername: state.username,
    userId: state.userId
  };
}

const mapDispatchToProps = dispatch => {
  return {
    dispatch
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings)