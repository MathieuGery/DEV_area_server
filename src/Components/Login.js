import React, {Component} from "react";
import API from "../Utils/api";
import {toast} from "react-toastify";
import Cookies from 'js-cookie'

export default class Login extends Component {
    constructor(props) {
        super(props);
        // if (Cookies.get('jwt') !== undefined) {
        //     window.location = "/";
        // }
    }

    state = {
        email: "",
        password: ""
    };

    send = async () => {
        const {email, password} = this.state;
        if (!email || email.length === 0) {
            toast.error("Please fill email champ");
            return;
        }
        if (!password || password.length === 0) {
            toast.error("Please fill password champ");
            return;
        }
        try {
            await API.login(email, password).then((response) => {
                if (response.status !== 200) {
                    toast.error(response.data.message);
                    return
                }
                Cookies.set("jwt", response.data.token);
                Cookies.set("email", email);
                window.location = "/";
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
        const {email, password} = this.state;

        return (
            <div className="auth-inner">
                <form>
                    <h3>Sign In</h3>

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

                    <button type="submit" className="btn btn-primary btn-block" onClick={(e) => {
                        e.preventDefault();
                        this.send()
                    }}>Submit
                    </button>
                </form>
            </div>
        );
    }
}