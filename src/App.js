import React from 'react'
import { Route, Switch, withRouter} from 'react-router-dom'
import { connect } from 'react-redux'

import Studio from './containers/Studio'
import Gallery from './containers/Gallery'
import Settings from './containers/Settings'


import Navbar from "./components/Navbar"
import Login from "./components/Login"
import Signup from "./components/Signup"

import './App.css'
import 'semantic-ui-css/semantic.min.css'

class App extends React.Component {
    
  componentDidMount() {
    const token = localStorage.getItem("token")
    if (token) {
      fetch('http://localhost:3000/api/v1/profile', {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(response => response.json())
      .then(data => {
        this.props.dispatch({
          type: 'SET_USER',
          payload: {
            userId: data.user.id,
            username: data.user.username,
            photos: data.user.photos
          }
        })
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
        'Accepts': 'application/json'
      },
      body: JSON.stringify({ user: userObj })
    })
    .then(response => response.json())
    .then(data => {
      localStorage.setItem('token', data.jwt)
      this.props.dispatch({
        type: 'SET_USER',
        payload: {
          userId: data.user.id,
          username: data.user.username,
          photos: data.user.photos
        }
      })
      this.props.history.push("/gallery/" + data.user.username)
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
        this.props.dispatch({
          type: 'SET_USER',
          payload: {
            userId: data.user.id,
            username: data.user.username,
            photos: data.user.photos
          }
        })
        this.props.history.push("/gallery/" + data.user.username)
      })
    }
  }
  
  logoutHandler = () => {
    localStorage.removeItem("token")
    this.props.dispatch({
      type: 'LOGOUT_USER',
      payload: {
        userId: null,
        username: "",
        photos: [],
        loggedIn: false
      }
    })
    this.props.history.push("/login")
  }
  
  render() {
    return (
      <div className="App">
        <Navbar logoutHandler={this.logoutHandler}/>
        <main>
          <Switch>
            {/* <Route exact path="/" render={Home} /> */}
            <Route path="/signup" render={ () => <Signup submitHandler={this.signupHandler} /> } />
            <Route path="/login" render={ () => <Login submitHandler={this.loginHandler} /> } />
            <Route path="/studio" render={ () => <Studio /> } />
            <Route path="/gallery/:username" render={ 
              ({match}) => <Gallery username={match.params.username} key={match.params.username} /> } />
            <Route path="/settings" render={ () => <Settings /> } />
          </Switch>
        </main>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return { user: state.user }
}

const mapDispatchToProps = dispatch => {
  return {
    dispatch
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(App))
