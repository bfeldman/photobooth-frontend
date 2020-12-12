import React from 'react'
import { Form, Button } from 'semantic-ui-react'


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
                    <Form.Input
                        label='email address'
                        name='email_address'
                        placeholder='email address'
                        value={this.state.email_address}
                        onChange={this.changeHandler}
                    />
                    <Button onClick={this.submitHandler}>Sign Up</Button>
                </Form>
            </div>
        )
    }
}

export default Signup