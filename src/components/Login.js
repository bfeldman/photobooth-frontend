import React from 'react'
import { connect } from 'react-redux'
import { Form, Button, Message } from 'semantic-ui-react'

class Login extends React.Component {
  state = {
    user: {
      username: "",
      password: ""
    },
    errorMessage: false
  }
  
  componentDidMount() {
    if (localStorage.getItem("token")) {
      this.props.history.push("/")
    }
  }
  
  changeHandler = (event) => {
    this.setState({ user: {
      ...this.state.user,
      [event.target.name]: event.target.value}
    })
  }
    
  /* sends credentials, gets JWT and sets Redux store, then redirects */
  submitHandler = (event) => {
    event.preventDefault()
    fetch(`${process.env.REACT_APP_BASE_URL}/api/v1/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accepts': 'application/json'
      },
      body: JSON.stringify({ user: this.state.user })
    })
    .then(response => response.json())
    .then(data => {
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
      <div className="login-form" style={{width:"300px", margin:"0 auto"}}>
        <h1>Log In</h1>
        
        {this.state.errorMessage ?
        <Message negative>
          <Message.Header>Whoops!</Message.Header>
          <p>We had an issue logging you in. Check your username and password for errors!</p>
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
          <Button onClick={this.submitHandler} color="black">Log In</Button>
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

export default connect(null, mapDispatchToProps)(Login)