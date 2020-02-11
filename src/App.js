import React from 'react';
import {toast} from 'react-toastify';
import {BrowserRouter as Router, Link, Route, Switch} from "react-router-dom";

//API
import API from "./Utils/api";

//Components
import {PrivateRoute} from "./Components/PrivateRoute"
import Login from "./Components/Login";
import SignUp from "./Components/Signup";
import Dashboard from "./Components/Dashboard";
import RoutineDetails from "./Components/RoutineDetails";

//CSS
import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';

toast.configure();

function App() {
    return (<Router>
            <div className="App">
                <nav className="navbar navbar-expand-lg navbar-light fixed-top">
                    <div className="container">
                        <Link className="navbar-brand" to={"/"}>AREA</Link>
                        {
                            !API.isAuth() &&
                                <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                                    <ul className="navbar-nav ml-auto">
                                        <li className="nav-item">
                                            <Link className="nav-link" to={"/sign-in"}>Login</Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link className="nav-link" to={"/sign-up"}>Sign up</Link>
                                        </li>
                                    </ul>
                                </div>
                        }
                    </div>
                </nav>

                <div>
                    <Switch>
                        <PrivateRoute exact path="/" component={Dashboard}/>
                        <Route exact path="/sign-in" component={Login}/>
                        <Route exact path="/sign-up" component={SignUp}/>
                        <Route exact path="/routine" component={RoutineDetails}/>
                    </Switch>
                </div>
            </div>
        </Router>
    );
}

export default App;
