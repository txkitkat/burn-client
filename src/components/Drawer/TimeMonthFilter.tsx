import ListItem from "@mui/material/ListItem";
import Collapse from "@mui/material/Collapse";
import React, {useState} from "react";
import ListItemText from "@mui/material/ListItemText";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import {Divider} from "@mui/material";
import TextField from "@mui/material/TextField";
import DatePicker from "@mui/lab/DatePicker";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import {IFilterImplProps} from "./Filters";

export default function TimeMonthFilter(props: IFilterImplProps) {
    const [dropDownTimeMonth, setDropDownTimeMonth] = useState(false);

    const handleStartDateChange = (newDate: Date | null) => {
        if (newDate && props.filterState.endMonth >= newDate)
            updateState("startMonth", newDate);

        // handleChangeTimeMonth(newDate, endDate);
    }

    const handleEndDateChange = (newDate: Date | null) => {
        if (newDate && props.filterState.startMonth <= newDate)
            updateState("endMonth", newDate);

        // handleChangeTimeMonth(newDate, endDate);
    }

    // const handleChangeTimeMonth = (_startDate: Date | null, _endDate: Date | null) => {
    //     if (_startDate && _endDate && _startDate <= _endDate) {
    //         getFiresByDates(_startDate.toLocaleDateString("en-US"), _endDate.toLocaleDateString("en-US"))
    //             .then(fires => props.setFireData(fires))
    //             .catch(err => console.error(err));
    //     }
    // };

    function updateState<KeyStateType>(key: string, newState: KeyStateType) {
        props.setFilterState({...props.filterState, [key]: newState})
    }

    return (
        <div>
            <Divider/>
            <ListItem button key={"Sort by Year and Month"} onClick={() => setDropDownTimeMonth(!dropDownTimeMonth)}>
                <ListItemText primary={"Sort by Year and Month"}/>
                {dropDownTimeMonth ? <ExpandLess/> : <ExpandMore/>}
            </ListItem>
            <Collapse in={dropDownTimeMonth} timeout="auto" unmountOnExit>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                        views={['year', 'month']}
                        label="Start Month"
                        minDate={new Date('01/1977')}
                        maxDate={new Date(Date.now())}
                        value={props.filterState.startMonth}
                        onChange={handleStartDateChange}
                        renderInput={(params) => <TextField {...params} helperText={null}/>}
                    />
                    <ListItemText primary={""}/>
                    <DatePicker
                        views={['year', 'month']}
                        label="End Month"
                        minDate={new Date('01/2021')}
                        maxDate={new Date('12/2021')}
                        value={props.filterState.endMonth}
                        onChange={handleEndDateChange}
                        renderInput={(params) => <TextField {...params} helperText={null}/>}
                    />
                </LocalizationProvider>
            </Collapse>
        </div>
    );
}