import React, {useEffect, useState} from "react";

import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";


export default function SimpleSelect(props) {
    const [dataList, setSelectDataSet] = useState([]);
    const [value, setValue] = useState("");

    useEffect(() => {
        setSelectDataSet(props.data)
    }, [props.data]);

    useEffect(() => {
         setValue(props.value)
    }, [props.value]);

    const setSelectData = () => {
        return dataList.map((data, index) => {
            return (<MenuItem key={"select" + index + data.value} value={data.value}>{data.name}</MenuItem>);
        })
    };

    return (
        <Select
            value={value}
            onChange={props.onChange}
            className={props.className}
        >
            {setSelectData()}
        </Select>
    );
}