import React from "react";
import {DrawerContent} from "./DrawerContent";
import Drawer from '@material-ui/core/Drawer';
import Fab from "@material-ui/core/Fab";
import MenuRoundedIcon from '@material-ui/icons/MenuRounded';
import CloseIcon from "@material-ui/icons/Close";
import PowerSettingsNewRoundedIcon from "@material-ui/icons/PowerSettingsNewRounded";
import API from "../Utils/api";

export class Header extends React.Component {

    state = {
        isDrawerVisible: false
    };

    toggleDrawer = () => {
        this.setState({
            isDrawerVisible: !this.state.isDrawerVisible
        });
    };

    disconnect = () => {
        API.logout();
        window.location = "/";
    };

    render() {
        return (
            <>
                <Drawer anchor="right" open={this.state.isDrawerVisible} onClose={this.toggleDrawer}>
                    <div className="bg-gray-200">
                        <div className="inline-block d-flex justify-content-around m-2">
                            <Fab color="primary" size="small" className="noFocus orange" title={"Get back to dashboard"} onClick={this.toggleDrawer}>
                                <CloseIcon/>
                            </Fab>
                            <div className="ml-2">
                                <Fab color="primary" size="small" className="noFocus orange" title={"Disconnect"} onClick={this.disconnect}>
                                    <PowerSettingsNewRoundedIcon/>
                                </Fab>
                            </div>
                        </div>
                        <DrawerContent/>
                    </div>
                </Drawer>
                <div className="inline-block flex float-right mt-3 mr-3 drawerButton">
                    <div>
                        <Fab color="primary" size="medium" title={"Handle widgets"} className="noFocus orange" onClick={this.toggleDrawer}>
                            <MenuRoundedIcon/>
                        </Fab>
                    </div>
                </div>
            </>
        );
    }
}