import React, {useState} from "react";
import {Link} from 'react-router-dom';

import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardHeader from "@material-ui/core/CardHeader";
import {ActiveSwitch} from "./Utils/ActiveSwitch";

import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles(theme => ({
    content: {
        height: "20vh",
    },
    media: {
        height: "100%",
        width: "auto",
        maxWidth: "100%"
    },
    routineName: {
        float: 'left',
        marginLeft: '2vw'
    },
    switch: {
        float: 'right',
    }
}));

export default function Routine(props) {
    const classes = useStyles();
    const routineData = props.data;
    const [isActive, setIsActive] = useState(routineData.isActive);

    const handleSwitchChange = () => {
        setIsActive(!isActive);
    };

    const buildHeader = () => {
        return (
            <div>
                <Typography variant="h5" className={classes.routineName}>
                    {routineData.name}
                </Typography>
                <ActiveSwitch checked={isActive} value={isActive} onChange={handleSwitchChange}
                              className={classes.switch}/>
            </div>
        )
    };

    return (
        <Grid item xs={9} sm={6} md={4}>
            <div className="shadow-2xl routineCard">
                <Card className="MuiCard-root">
                    <Link to={{
                        pathname: "routine",
                        state: {
                            routineData: routineData
                        }
                    }}>
                        <CardActionArea>
                            <CardContent className={classes.content}>
                                <img
                                    className={classes.media}
                                    src={require('../assets/' + routineData.actionService + '.png')}
                                    alt="logo"/>
                            </CardContent>
                        </CardActionArea>
                    </Link>
                    <CardHeader title={buildHeader()}/>
                </Card>
            </div>
        </Grid>
    );
}