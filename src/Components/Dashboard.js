import React, {Component} from "react";
import {Header} from "./Header";
import RoutinePanel from "./RoutinePanel";

export default class Dashboard extends Component {
    render() {
        return (
            <div>
                <Header/>
                <RoutinePanel className="routine-panel"/>
            </div>
        );
    }
}