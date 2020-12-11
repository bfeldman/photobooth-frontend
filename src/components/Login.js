import React from 'react'

class Login extends React.Component {
    state = {
        username: "",
        password: ""
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
            <div className="login-form">
                <h1>Log In</h1>
                <form>
                    <input type="text" name="username" placeholder="username" value={this.state.username} onChange={this.changeHandler} /><br/><br/>
                    <input type="text" name="password" placeholder="password" value={this.state.password} onChange={this.changeHandler} /><br/><br/>
                    <button onClick={this.submitHandler}>Log In</button>
                </form>
            </div>
        )
    }
}

export default Login