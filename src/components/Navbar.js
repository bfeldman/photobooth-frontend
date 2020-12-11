import React from 'react'
import { NavLink } from 'react-router-dom'

function Navbar(props) {
    return(
        <div className="navbar">
            <div className="site-name">
                <NavLink to="/"><h1>Boto Phooth</h1></NavLink>
            </div>
            <div className="nav-menu">
                <NavLink to="/gallery">Gallery</NavLink>
                <NavLink to="/studio">New pic</NavLink>
                {props.user ?
                    <NavLink to="/" onClick={ props.logoutHandler }>Log Out</NavLink>
                    :
                    <>
                    <NavLink to="/signup">Sign Up</NavLink>
                    <NavLink to="/login">Log in</NavLink>
                    </>
                }
            </div>
        </div>
    )
}

export default Navbar