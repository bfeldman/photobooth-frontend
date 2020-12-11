import React from 'react'

class Signup extends React.Component {
    state = {
        username: "",
        password: "",
        email_address: ""
    }
    
    changeHandler = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }
    
    submitHandler = (event) => {
        event.preventDefault()
        this.props.submitHandler(this.state)
    }
    
    render() {
        return(
            <div className="signup-form">
                <h1>Sign Up</h1>
                <form>
                    <input type="text" name="username" placeholder="username" value={this.state.username} onChange={this.changeHandler} /><br/><br/>
                    <input type="text" name="password" placeholder="password" value={this.state.password} onChange={this.changeHandler} /><br/><br/>
                    <input type="text" name="email_address" placeholder="email address" value={this.state.email_address} onChange={this.changeHandler} /><br/><br/>
                    
                    <button onClick={this.submitHandler}>Sign Up</button>

                </form>
            </div>
        )
    }
}

export default Signup