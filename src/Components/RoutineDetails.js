import React, {useEffect, useState} from "react";

import makeStyles from "@material-ui/core/styles/makeStyles";

import {ActiveSwitch} from "./Utils/ActiveSwitch"
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import api from "../Utils/api";
import SimpleSelect from "./Utils/SimpleSelect";

const useStyles = makeStyles(theme => ({
    main: {
        backgroundColor: 'white',
        borderRadius: '4px',
        position: 'absolute',
        left: '50%',
        top: '40%',
        transform: 'translate(-50%, -50%)',
        width: '50vw'
    },
    header: {
        minHeight: '7vh',
        borderBottom: '1px solid grey',

        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    content: {
        marginTop: '2vh',
        marginBottom: '2vh'
    },
    switch: {
        position: 'fixed',
        right: '2%',
    },
    select: {
        marginTop: '2vh',
        minWidth: '50%'
    }
}));

export default function RoutineDetails(props) {
    const classes = useStyles();
    const routineData = props.location.state.routineData;
    const [isActive, setIsActive] = useState(routineData.isActive);
    const [actionService, setActionService] = useState(routineData.actionService);
    const [serviceArray, setServiceArray] = useState([]);

    useEffect(() => {
        api.getServices().then((response) => {
            setServiceArray(response);
        })
    }, []);

    const handleSwitchChange = () => {
        setIsActive(!isActive);
    };

    const handleActionServiceChange = (elem) => {
        setActionService(elem.target.value);
        //api.setActionService(newValue)
    };

    return (
        <div className={classes.main}>
            <div className={classes.header}>
                <div style={{fontSize: "1.20rem"}}>
                    {routineData.name}
                </div>
                <ActiveSwitch checked={isActive} value={isActive} onChange={handleSwitchChange}
                              className={classes.switch}/>
            </div>
            <div className={classes.content}>
                <div>
                    {routineData.actionService}
                </div>
                <SimpleSelect
                    data={serviceArray}
                    value={actionService}
                    onChange={handleActionServiceChange}
                    className={classes.select}
                />
            </div>
        </div>
    );
}