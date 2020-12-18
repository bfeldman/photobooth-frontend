import React from 'react'
import { Form, Button } from 'semantic-ui-react'

class Login extends React.Component {
    state = {
        username: "",
        password: ""
    }
    
    changeHandler = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }
    
    /* sends state object up to submit handler in App.js for processing*/
    submitHandler = (event) => {
        event.preventDefault()
        this.props.submitHandler(this.state)
    }
    
    render() {
        return(
            <div className="login-form">
                <h1>Log In</h1>
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
                    <Button onClick={this.submitHandler}>Log In</Button>
                </Form>
                

            </div>
        )
    }
}

export default Login