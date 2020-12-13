import React from 'react'
import { Route, Switch, withRouter} from 'react-router-dom'

import Studio from './containers/Studio'
import Gallery from './containers/Gallery'

import Navbar from "./components/Navbar"
import Login from "./components/Login"
import Signup from "./components/Signup"

import './App.css'
import 'semantic-ui-css/semantic.min.css'

class App extends React.Component {
  
  state = {
    user: null
  }
  
  componentDidMount() {
    const token = localStorage.getItem("token")
    if (token) {
      fetch('http://localhost:3000/api/v1/profile', {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(response => response.json())
      .then(data => {
        this.setState({user: data.user})
      })
    } else {
      this.props.history.push("/login")
    }
  }
  
  signupHandler = (userObj) => {
    fetch('http://localhost:3000/api/v1/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "Accepts": 'application/json'
      },
      body: JSON.stringify({ user: userObj})
    })
    .then(response => response.json())
    .then(data => {
      localStorage.setItem("token", data.jwt)
      this.setState({user: data.user})
      this.props.history.push("/gallery")
    })
  }
  
  loginHandler = (userObj) => {
    const token = localStorage.getItem("token")
    if (token) {
      this.props.history.push("/gallery")
    } else {
      fetch('http://localhost:3000/api/v1/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          "Accepts": 'application/json'
        },
        body: JSON.stringify({ user: userObj})
      })
      .then(response => response.json())
      .then(data => {
        localStorage.setItem("token", data.jwt)
        this.setState({user: data.user})
        this.props.history.push("/gallery")
      })
    }
  }
  
  logoutHandler = () => {
    localStorage.removeItem("token")
    this.setState({user: null})
    this.props.history.push("/login")
  }
  
  render() {
    return (
      <div className="App">
        <Navbar user={!!this.state.user} logoutHandler={this.logoutHandler}/>
        <main>
          <Switch>
            {/* <Route exact path="/" render={Home} /> */}
            <Route path="/signup" render={ () => <Signup submitHandler={this.signupHandler} /> } />
            <Route path="/login" render={ () => <Login submitHandler={this.loginHandler} /> } />
            <Route path="/studio" render={ () => <Studio user={this.state.user} /> } />
            <Route path="/gallery" render={ () => <Gallery />} />
          </Switch>
        </main>
        
      </div>
    )
  }
}

export default withRouter(App);
