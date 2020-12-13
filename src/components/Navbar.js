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
                    exact to="/gallery"
                    name='gallery'
                    active={activeItem === 'gallery'}
                    onClick={this.handleItemClick}
                >
                    🖼 Gallery
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
        
                {this.props.loggedIn ?
                    <Menu.Item
                        name='logout'
                        active={activeItem === 'logout'}
                        onClick={this.props.logoutHandler}
                    >
                        Log Out
                    </Menu.Item>
                :
                    <Menu.Item
                        as={NavLink}
                        exact to="/login"
                        name='login'
                        active={activeItem === 'login'}
                        onClick={this.handleItemClick}
                    >
                        Log In
                    </Menu.Item>
                }
            </Menu>
        )
    }
}

const mapStateToProps = state => {
    return { loggedIn: state.loggedIn }
}

export default connect(mapStateToProps)(Navbar)