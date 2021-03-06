import React from 'react'
import { Route, Switch, withRouter, Redirect} from 'react-router-dom'
import { connect } from 'react-redux'

import Studio from './containers/Studio'
import Gallery from './containers/Gallery'
import Settings from './containers/Settings'
import Albums from './containers/Albums'
import Home from './containers/Home'

import Navbar from "./components/Navbar"
import Login from "./components/Login"
import Signup from "./components/Signup"

import './App.css'
import 'semantic-ui-css/semantic.min.css'

class App extends React.Component {
    
  componentDidMount() {
    const token = localStorage.getItem("token")
    if (token) {
      fetch(`${process.env.REACT_APP_BASE_URL}/api/v1/profile`, {
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
            photos: data.user.photos,
            albums: data.user.albums,
            userIsPublic: data.user.is_public
          }
        })
      })
    } else if (this.props.location.pathname !== "/" && this.props.location.pathname !== "/studio") {
      this.props.history.push("/login")
    }
  }
  
  logoutHandler = () => {
    localStorage.clear()
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
            <Route exact path="/" render={Home} />
            
            <Route exact path="/gallery" >
              <Redirect to="/" />
            </Route>
            
            <Route path="/signup" component={Signup} />
            
            <Route path="/login" component={Login} />
            
            <Route path="/studio" component={Studio} />
            
            <Route path="/albums" component={Albums} />
            
            <Route
              path="/gallery/:username"
              render={
                ({match}) => <Gallery username={match.params.username} key={match.params.username} />
              }
            />
              
            <Route path="/settings" component={Settings} />
            
            
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
