import React from 'react'
import { connect } from 'react-redux'
import { Form, Button, Message } from 'semantic-ui-react'


class Signup extends React.Component {
  
  state = {
    user: {
      username: "",
      password: "",
      email_address: "",
      is_public: true
    },
    errorMessage: false
  }
  
  changeHandler = (event) => {
    this.setState({
      user: {
        ...this.state.user,
        [event.target.name]: event.target.value
      }
    })
  }
  
  /* sends state object up to signup handler in App.js for processing */
  submitHandler = (event) => {
    event.preventDefault()
    fetch(`${process.env.REACT_APP_BASE_URL}/api/v1/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accepts': 'application/json'
      },
      body: JSON.stringify({ user: this.state.user })
    })
    .then(response => response.json())
    .then(data => {
      console.log(data)
      if (!data.error) {
        localStorage.setItem('token', data.jwt)
        this.props.dispatch({
          type: 'SET_USER',
          payload: {
            userId: data.user.id,
            username: data.user.username,
            photos: data.user.photos,
            albums: data.user.albums,
            userIsPublic: data.user.is_public
            }
        })
        this.props.history.push("/gallery/" + data.user.username)
      } else {
        this.setState({errorMessage: true})
      }
    })
  }
  
  render() {
    return(
      <div className="signup-form" style={{width:"300px", margin:"0 auto"}}>
        <h1>Sign Up</h1>
        
        {this.state.errorMessage ?
          <Message negative>
            <Message.Header>Whoops!</Message.Header>
            <p>We had an issue signing you up. Maybe your username or email is already taken!</p>
          </Message>
        : null }
        
        <Form>
          <Form.Input
            label='username'
            name='username'
            placeholder='username'
            value={this.state.username}
            onChange={this.changeHandler}
          />
          <Form.Input
            type='password'
            label='password'
            name="password"
            placeholder="password" 
            value={this.state.password} 
            onChange={this.changeHandler}
          />
          <Form.Input
            label='email address'
            name='email_address'
            placeholder='email address'
            value={this.state.email_address}
            onChange={this.changeHandler}
          />
          <Button onClick={this.submitHandler} color="black">Sign Up</Button>
        </Form>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    dispatch
  }
}

export default connect(null, mapDispatchToProps)(Signup)