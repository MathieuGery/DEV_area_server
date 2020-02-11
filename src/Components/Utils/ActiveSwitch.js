import {withStyles} from "@material-ui/core/styles";
import {blue, red} from "@material-ui/core/colors";
import Switch from "@material-ui/core/Switch";

export const ActiveSwitch = withStyles({
    switchBase: {
        color: red[300],
        '&$checked': {
            color: blue[500],
        },
        '&$checked + $track': {
            backgroundColor: blue[500],
        },
    },
    checked: {},
    track: {},
})(Switch);