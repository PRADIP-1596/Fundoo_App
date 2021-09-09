import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import '../Registration/Registration.css'
import '../Signin/Signin.css'
import '../ForgotPassword/ForgotPassword.css'

import UserService from '../../../services/UserService';


const service = new UserService();


export class ForgotPassword extends Component {
    constructor(props) {
        super(props)

        this.state = {
            username: '',
            usernameError: false,


        }
    }
    changeHandler = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        })
    }
    validation = () => {
        let isError = false;
        const error = this.state;
        error.usernameError = this.state.username === '' ? true : false;
        this.setState({
            ...error
        })

        return isError = error.usernameError;
    }
    Send = () => {
        var validated = this.validation();
        if (validated) {
            console.log("unsuccessfull validation ")
        } else {

            let data = {
                email: this.state.username
            }
            service.ForgetPassword(data)
                .then(res => {
                    console.log(res);
                    // localStorage.setItem("token", res.data.id);
                    this.props.history.push("/");
                })
                .catch(err => {
                    console.log(err)
                })
        }
    }


    render() {
        return (
            <div className="first-container">
                <div className="forgotpassword-container">
                    <div className="fundoo fundoo-sign">
                        <span className="letterF">F</span>
                        <span className="letteru">u</span><span className="lettern">n</span><span className="letterd">d</span><span className="letterO">o</span><span className="lettero">o</span>
                    </div>
                    <h1 className="heading-sign">Forgot Password </h1>
                    <h1 className="heading-account"> Enter your Fundoo Account </h1>
                    <div className="email1">
                        <TextField
                            name="username"
                            error={this.state.usernameError}
                            fullWidth="true"
                            id="outlined-basic4"
                            className="email1"
                            label="Enter your phoneno or Email"
                            helperText={this.state.usernameError ? "Enter an email or phone number " : ''}
                            variant="outlined"
                            onChange={e => this.changeHandler(e)}
                        /><br></br><br></br>
                    </div>
                    <div className="sendbtn">
                        <Button variant="contained" className="next" color="primary" onClick={this.Send}>
                            Send
                        </Button>
                    </div>
                </div>
            </div>
        )
    }
}

export default ForgotPassword
