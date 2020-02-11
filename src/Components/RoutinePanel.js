import React, {useEffect, useState} from "react";

import Routine from "./Routine";
import api from "../Utils/api";

import {makeStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles({
    routinePanel: {
        marginTop: '10vh',
        marginLeft: '1vw',
        marginRight: '1vw',
        marginBottom: '10vh',
    },
    loader: {
        marginTop: '40vh',
        marginLeft: '50vw',
        color: 'white'
    }
});

export default function RoutinePanel() {
    const classes = useStyles();
    const [routineList, setRoutineList] = useState([]);
    const [isLoad, setIsLoad] = useState(false);

    useEffect(() => {
        async function getRoutineList() {
            const _data = await api.getRoutineList();
            setRoutineList(_data);
        }

        getRoutineList().then(() => setIsLoad(true));
    }, []);

    const buildCardPanel = () => {
        if (isLoad) {
            return (
                routineList.map((routineData, index) => {
                    return (<Routine key={"routine" + index} data={routineData}/>)
                })
            );
        } else {
            return (<CircularProgress className={classes.loader}/>)
        }
    };

    return (
        <div className={classes.routinePanel}>
            <Grid container spacing={2}>
                {buildCardPanel()}
            </Grid>
        </div>
    );
}