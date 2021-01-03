import React from 'react'
import {connect} from 'react-redux'
import { NavLink } from 'react-router-dom'
import { Menu, Icon, Image } from 'semantic-ui-react'

import Catherine from '../img/cath.png'


class Navbar extends React.Component {
    
        
    render() {
        return(
            <Menu icon='labeled'>
                <Menu.Item header>
                    <Image size="mini" src={Catherine} />
                    BOTO PHOOTH
                </Menu.Item>
                
                <Menu.Item
                    as={NavLink}
                    exact to="/studio"
                >
                    <Icon name='camera retro' />
                    Studio
                </Menu.Item>

                {/* renders different options based on login status */}
                    {this.props.loggedIn ?
                        <>                
                        {/* options when logged in */}
                        <Menu.Item
                            as={NavLink}
                            to={`/gallery/${this.props.username}`}
                        >
                            <Icon name='picture' />
                            My Gallery
                        </Menu.Item>
                        
                        <Menu.Item
                            as={NavLink}
                            exact to="/albums"
                        >
                            <Icon name='images' />
                            My Albums
                        </Menu.Item>
                        
                        <Menu.Menu position="right">
                            <Menu.Item
                                as={NavLink}
                                exact to="/settings"
                            >
                                <Icon name="settings" />
                                Settings
                            </Menu.Item>
                            
                            <Menu.Item
                                name='logout'
                                onClick={this.props.logoutHandler}
                            >
                                <Icon name="log out" />
                                Log Out
                            </Menu.Item>
                        </Menu.Menu>
                        </>
                    :
                        <>
                        {/* options when logged out */}
                        <Menu.Menu position="right">
                            <Menu.Item
                                as={NavLink}
                                exact to="/login"
                            >
                                <Icon name="sign in" />
                                Log In
                            </Menu.Item>
                            
                            <Menu.Item
                                as={NavLink}
                                exact to="/signup"
                            >
                                <Icon name="signup" />
                                Sign Up
                            </Menu.Item>
                        </Menu.Menu>
                        </>
                    }
            </Menu>
        )
    }
}

const mapStateToProps = state => {
    return {
        loggedIn: state.loggedIn,
        username: state.username
    }
}

export default connect(mapStateToProps)(Navbar)