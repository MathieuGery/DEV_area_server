import React, {Component} from "react";
import API from "../Utils/api";
import {toast} from "react-toastify";

export default class SignUp extends Component {
    state = {
        email: "",
        password: "",
        cpassword: ""
    };

    send = async () => {
        const {email, password, cpassword} = this.state;
        if (!email || email.length === 0) {
            toast.error("Please fill email champ");
            return;
        }
        if (!password || password.length === 0 || !cpassword || cpassword.length === 0) {
            toast.error("Please fill password champ");
            return;
        }
        if (password !== cpassword) {
            toast.error("Confirmation password is not identical");
            return;
        }
        try {
            await API.signup(email, password).then((response) => {
                console.log(response);
                if (response.status !== 201) {
                    toast.error(response.data.message);
                } else {
                    window.location = '/'
                }
            });
        } catch (error) {
            console.error(error);
        }
    };

    handleChange = (event) => {
        this.setState({
            [event.target.id]: event.target.value
        });
    };

    render() {
        const {email, password, cpassword} = this.state;

        return (
            <div className="auth-inner">
                <form>
                    <h3>Sign Up</h3>

                    <div className="form-group">
                        <label>Email address</label>
                        <input id="email" type="email" value={email} onChange={this.handleChange}
                               className="form-control" placeholder="Enter email"/>
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <input id="password" type="password" value={password} onChange={this.handleChange}
                               className="form-control" placeholder="Enter password"/>
                    </div>

                    <div className="form-group">
                        <label>Confirm password</label>
                        <input id="cpassword" type="password" value={cpassword} onChange={this.handleChange}
                               className="form-control" placeholder="Enter password"/>
                    </div>

                    <button type="submit" className="btn btn-primary btn-block" onClick={(e) => {
                        e.preventDefault();
                        this.send()
                    }}>Sign Up
                    </button>
                    <p className="forgot-password text-right">
                        Already registered <a href="/sign-in">sign in?</a>
                    </p>
                </form>
            </div>
        );
    }
}