import React from 'react'
import {connect} from 'react-redux'

import { NavLink } from 'react-router-dom'
import { Menu } from 'semantic-ui-react'

class Navbar extends React.Component {
    
    state = {
        activeItem: ""
    }
    
    componentDidMount() {
        this.setState({ loggedIn: this.props.loggedIn })
    }
    
    handleItemClick = (e, { name }) => this.setState({ activeItem: name })
    
    render() {
        const activeItem = this.state.activeItem
        return(
            <Menu>
                <Menu.Item>
                    BOTO PHOOTH
                </Menu.Item>
                <Menu.Item
                    as={NavLink}
                    to={`/gallery/${this.props.username}`}
                    name='gallery'
                    active={activeItem === 'gallery'}
                    onClick={this.handleItemClick}
                >
                    🖼 My Gallery
                </Menu.Item>
        
                <Menu.Item
                    as={NavLink}
                    exact to="/studio"
                    name='studio'
                    active={activeItem === 'studio'}
                    onClick={this.handleItemClick}
                >
                    🎨 Studio
                </Menu.Item>
                
                <Menu.Item
                    as={NavLink}
                    exact to="/albums"
                    name='albums'
                    active={activeItem === 'albums'}
                    onClick={this.handleItemClick}
                >
                    📒 Albums
                </Menu.Item>
        
                {/* renders different options based on login status */}
                {this.props.loggedIn ?
                    <>                
                    {/* options when logged in */}
                    <Menu.Item
                        as={NavLink}
                        exact to="/settings"
                        name='settings'
                        active={activeItem === 'settings'}
                        position="right"
                        onClick={this.handleItemClick}
                    >
                        ⚙️ Settings
                    </Menu.Item>
                    
                    <Menu.Item
                        name='logout'
                        active={activeItem === 'logout'}
                        onClick={this.props.logoutHandler}
                    >
                        Log Out
                    </Menu.Item>
                    
                    </>
                :
                    <>
                    {/* options when logged out */}
                    <Menu.Item
                        as={NavLink}
                        exact to="/login"
                        name='login'
                        position="right"
                        active={activeItem === 'login'}
                        onClick={this.handleItemClick}
                    >
                        Log In
                    </Menu.Item>
                    
                    <Menu.Item
                        as={NavLink}
                        exact to="/signup"
                        name='signup'
                        active={activeItem === 'signup'}
                        onClick={this.handleItemClick}
                    >
                        Sign Up
                    </Menu.Item>
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