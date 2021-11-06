import ListItem from "@mui/material/ListItem";
import Collapse from "@mui/material/Collapse";
import React, {useState} from "react";
import ListItemText from "@mui/material/ListItemText";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import {Divider} from "@mui/material";
import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import {IFilterImplProps} from "./Filters";

export default function TimeFilter(props: IFilterImplProps) {
    const [dropDownTime, setDropDownTime] = useState(false);

    // const handleChangeTime = () => {
    //     const _startYear = props.filterState.startYear?.getFullYear();
    //     const _endYear = props.filterState.endYear?.getFullYear();
    //     if (_startYear && _endYear && _startYear <= _endYear) {
    //         getFiresByRangeOfYears(_startYear, _endYear)
    //             .then(fires => props.setFireData(fires))
    //             .catch(err => console.error(err));
    //     }
    // };

    const handleStartDateChange = (newYear: Date | null) => {
        if (newYear && props.filterState.endYear && newYear <= props.filterState.endYear) {
            updateState("startYear", newYear);
            props.touchFilter("startYear");
            // handleChangeTime();
        }
    }

    const handleEndDateChange = (newYear: Date | null) => {
        if (newYear && props.filterState.startYear && newYear >= props.filterState.startYear) {
            updateState("endYear", newYear);
            props.touchFilter("endYear");
            // handleChangeTime();
        }
    }

    function updateState<KeyStateType>(key: string, newState: KeyStateType) {
        props.setFilterState({...props.filterState, [key]: newState})
    }

    return (
        <div>
            <Divider/>
            <ListItem button key={"Sort by Year"} onClick={() => setDropDownTime(!dropDownTime)}>
                <ListItemText primary={"Sort by Year"}/>
                {dropDownTime ? <ExpandLess/> : <ExpandMore/>}
            </ListItem>
            <Collapse in={dropDownTime} timeout="auto" unmountOnExit>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                        views={['year']}
                        label="Start Year"
                        minDate={new Date('1977')}
                        maxDate={new Date(Date.now())}
                        value={props.filterState.startYear}
                        onChange={handleStartDateChange}
                        renderInput={(params) => <TextField {...params} helperText={null}/>}
                    />
                    <ListItemText primary={""}/>
                    <DatePicker
                        views={['year']}
                        label="End Year"
                        minDate={new Date('1977')}
                        maxDate={new Date(Date.now())}
                        value={props.filterState.endYear}
                        onChange={handleEndDateChange}
                        renderInput={(params) => <TextField {...params} helperText={null}/>}
                    />
                </LocalizationProvider>
            </Collapse>
        </div>
    );
}