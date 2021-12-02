import ListItem from "@mui/material/ListItem";
import Collapse from "@mui/material/Collapse";
import React, { useState } from "react";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { Divider } from "@mui/material";
import Tooltip from '@mui/material/Tooltip';
import { IFilterImplProps } from "./Filters";

export default function TimeMonthFilter(props: IFilterImplProps) {
    const [dropDownMonth, setDropDownMonth] = useState(false);
    const [startMonthValue, setStartMonthValue] = useState(props.filterState.startMonth);
    const [endMonthValue, setEndMonthValue] = useState(props.filterState.endMonth);

    const handleStartMonthChange = (event: SelectChangeEvent<number>) => {
        const startMonth = event.target.value as number;
        if (startMonth>=0 && endMonthValue >= startMonth) {
            setStartMonthValue(startMonth);
            updateState("startMonth", startMonth, "endMonth", endMonthValue);
            props.touchTwoFilters("startMonth", "endMonth");// this so that default endMonth is also touched
        }
    }

    const handleEndMonthChange = (event: SelectChangeEvent<number>) => {
        const endMonth = event.target.value as number;
        if (endMonth>=0 && startMonthValue <= endMonth) {
            setEndMonthValue(endMonth);
            updateState("endMonth", endMonth, "startMonth", startMonthValue);
            props.touchTwoFilters("startMonth", "endMonth");// this so that default startMonth is also touched
        }
    }

    function updateState<KeyStateType>(key1: string, newState1: KeyStateType, key2: string, newState2: KeyStateType) {
        props.setFilterState({ ...props.filterState, [key1]: newState1, [key2]: newState2 })
    }

    return (
        <div>
            <Divider />
            <ListItem button key={"Sort by Month"} onClick={() => setDropDownMonth(!dropDownMonth)}>
                <ListItemText primary={"Sort by Month"} />
                {dropDownMonth ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={dropDownMonth} timeout="auto" unmountOnExit>
                <ListItem key={"Dropdown Month"} alignItems="center">
                    <FormControl sx={{ margin: 2, minWidth: 90 }} variant="standard" color="primary">
                        <InputLabel>Start Month</InputLabel>
                        <Tooltip title="Please edit both start and end month values" arrow>
                            <Select
                                labelId="start-month-select-label"
                                id="start-month-select"
                                value={startMonthValue}
                                label="Start Month"
                                onChange={handleStartMonthChange}
                            >
                                {months.map(month => (
                                    <MenuItem value={month.value} key={month.name}>
                                        {month.name}
                                    </MenuItem>
                                ))}

                            </Select>
                        </Tooltip>
                    </FormControl>
                    <FormControl sx={{ margin: 2, minWidth: 90 }} variant="standard" color="primary">
                        <InputLabel>End Month</InputLabel>
                        <Tooltip title="Please edit both start and end month values" arrow>
                            <Select
                                labelId="end-month-select-label"
                                id="end-month-select"
                                value={endMonthValue}
                                label="End Month"
                                onChange={handleEndMonthChange}
                            >
                                {months.map(month => (
                                    <MenuItem value={month.value} key={month.name}>
                                        {month.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </Tooltip>
                    </FormControl>
                </ListItem>
            </Collapse>
        </div>
    );
}

//Backend expects months in number range from 0-11
const months: {
    name: string;
    value: number;
}[] =
    [
        {
            "name": "Jan",
            "value": 0
        },
        {
            "name": "Feb",
            "value": 1
        },
        {
            "name": "Mar",
            "value": 2
        },
        {
            "name": "Apr",
            "value": 3
        },
        {
            "name": "May",
            "value": 4
        },
        {
            "name": "Jun",
            "value": 5
        },
        {
            "name": "Jul",
            "value": 6
        },
        {
            "name": "Aug",
            "value": 7
        },
        {
            "name": "Sep",
            "value": 8
        },
        {
            "name": "Oct",
            "value": 9
        },
        {
            "name": "Nov",
            "value": 10
        },
        {
            "name": "Dec",
            "value": 11
        }
    ]