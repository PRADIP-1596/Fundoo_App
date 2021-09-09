import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import "./Registration.css";
import { InputAdornment } from "@material-ui/core";
import { Link } from "react-router-dom";
import UserService from "../../../services/UserService";

const service = new UserService();

export class Registration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fName: "",
      lName: "",
      email: "",
      password: "",
      confirm: "",
      emailError: false,
      passwordError: false,
      confirmError: false,
      fNameError: false,
      lNameError: false,
      textType: "password",
    };
  }

  showPassword = () => {
    console.log("showpassword");
    if (this.state.textType === "password") {
      this.setState({
        textType: "text",
      });
    } else {
      this.setState({
        textType: "password",
      });
    }
  };

  changeHandler = (e) => {
    if (e.target.name === "email") {
      this.setState({
        [e.target.name]: e.target.value + "@gmail.com",
      });
    } else {
      this.setState({
        [e.target.name]: e.target.value,
      });
    }
  };

  validation = () => {
    let isError = false;
    const error = this.state;
    error.fNameError = this.state.fName === "" ? true : false;
    error.lNameError = this.state.lName === "" ? true : false;
    error.emailError = this.state.email === "" ? true : false;
    error.passwordError = this.state.password === "" ? true : false;
    error.confirmError = this.state.confirm === "" ? true : false;

    this.setState({
      ...error,
    });

    return (isError =
      error.fNameError ||
      error.lNameError ||
      error.emailError ||
      error.confirmError ||
      error.passwordError);
  };
  Next = () => {
    var validated = this.validation();
    if (validated) {
      console.log("unsuccessfull validation ");
    } else {
      let data = {
        firstName: this.state.fName,
        lastName: this.state.lName,
        email: this.state.email,
        service: "advance",
        password: this.state.password,
      };
      service
        .Registration(data)
        .then((res) => {
          console.log(res);
          localStorage.setItem("token", res.data);
          console.log(res.data);
          this.props.history.push("/signin");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  render() {
    return (
      <div className="first-container">
        <div className="container">
          <form className="form">
            <div className="fundoo">
              <span className="letterF">F</span>
              <span className="letteru">u</span>
              <span className="lettern">n</span>
              <span className="letterd">d</span>
              <span className="letterO">o</span>
              <span className="lettero">o</span>
            </div>
            <h1 className="heading">Create your Fundoo Account </h1>
            <div className="name">
              <TextField
                name="fName"
                error={this.state.fNameError}
                className="fname"
                label="First name"
                helperText={this.state.fNameError ? "Enter First name " : ""}
                variant="outlined"
                onChange={(e) => this.changeHandler(e)}
              />
              <TextField
                name="lName"
                error={this.state.lNameError}
                className="lname"
                label="Last name"
                helperText={this.state.lNameError ? "Enter Last name " : ""}
                variant="outlined"
                onChange={(e) => this.changeHandler(e)}
              />
            </div>
            <div className="email1">
              <TextField
                name="email"
                error={this.state.emailError}
                fullWidth
                className="email"
                label="User name"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">@gmail.com</InputAdornment>
                  ),
                }}
                helperText={
                  this.state.emailError
                    ? "Choose a gmail address "
                    : "you can use use letters, number & periods"
                }
                variant="outlined"
                onChange={(e) => this.changeHandler(e)}
              />
              <br></br>
              <br></br>
            </div>
            <div className="text-link">
              <a className="mailinstead" href="#outlined-basic3">
                Use my email address instead
              </a>
            </div>
            <div className="password">
              <TextField
                name="password"
                type={this.state.textType}
                error={this.state.passwordError}
                id="outlined-password-input1"
                name="password"
                label="Password"
                className="password1"
                autoComplete="current-password"
                helperText={this.state.lNameError ? "Enter a password " : ""}
                variant="outlined"
                onChange={(e) => this.changeHandler(e)}
              />
              <TextField
                id="outlined-password-input"
                type={this.state.textType}
                error={this.state.confirmError}
                name="confirm"
                label="Confirm"
                className="confirm"
                autoComplete="current-password"
                helperText={
                  this.state.confirmError ? "Enter correct password " : ""
                }
                variant="outlined"
                onChange={(e) => this.changeHandler(e)}
              />
              <br></br>
            </div>
            {this.state.password !== this.state.confirm ? (
              <FormHelperText error>Password doesn't match</FormHelperText>
            ) : null}

            <span className="linepasswrd">
              Use 8 or more characters with a mix of letters, numbers & symbols
            </span>

            <div>
              <FormControlLabel
                control={<Checkbox color="primary" />}
                label="Show Password"
                onChange={this.showPassword}
              />
            </div>
            <div className="lastsec">
              <div className="signin-link">
                <Link className="signininstead" to="/signin">
                  {" "}
                  Sign in instead
                </Link>
              </div>
              <div className="nextbtn">
                <Button
                  variant="contained"
                  className="next"
                  color="primary"
                  onClick={this.Next}
                >
                  Next
                </Button>
              </div>
            </div>
          </form>
          <div className="section2">
            <img
              src="https://ssl.gstatic.com/accounts/signup/glif/account.svg"
              width="244"
              height="244"
              alt="Google image"
            />
            <span>
              One account. All of Google<br></br> working for you
            </span>
          </div>
        </div>
      </div>
    );
  }
}

export default Registration;
