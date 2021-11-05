import ListItem from "@mui/material/ListItem";
import Collapse from "@mui/material/Collapse";
import React, {useState} from "react";
import IFire from "../../types/fireType";
import ListItemText from "@mui/material/ListItemText";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import {Divider} from "@mui/material";
import TextField from "@mui/material/TextField";
import DatePicker from "@mui/lab/DatePicker";
import {getFiresByDates} from "../../service/burnService";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import getDaysInMonth from 'date-fns/getDaysInMonth'


interface ITimeMonthFilterProps {
    setFireData: (fireData: IFire[]) => void;
}

export default function TimeMonthFilter(props: ITimeMonthFilterProps) {
    const [dropDownTimeMonth, setDropDownTimeMonth] = useState(false);
    const [startDate, setStartDate] = React.useState<Date | null>(new Date());
    const [endDate, setEndDate] = React.useState<Date | null>(new Date());

    const handleChangeTimeMonth = (_startDate: Date | null, _endDate: Date | null) => {
        if (_startDate && _endDate) {
            getFiresByDates(_startDate.toLocaleDateString("en-US"), _endDate.toLocaleDateString("en-US"))
                .then(fires => props.setFireData(fires))
                .catch(err => console.error(err));
            //console.log(_startDate.toLocaleDateString("en-US"))
            //console.log(_endDate.toLocaleDateString("en-US"))
        } else {
            // do nothing
        }

    };

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
                        label="Start Month and Year"
                        minDate={new Date('01/1977')}
                        maxDate={new Date('12/2023')}
                        value={startDate}
                        onChange={(newDate) => {
                            if (newDate) {
                                newDate.setDate(1);
                            }
                            setStartDate(newDate);
                            handleChangeTimeMonth(newDate, endDate);
                        }}

                        renderInput={(params) => <TextField {...params} helperText={null}/>}
                    />
                    <ListItemText primary={""}/>
                    <DatePicker
                        views={['year', 'month']}
                        label="End Month and Year"
                        minDate={new Date('01/1977')}
                        maxDate={new Date('12/2023')}
                        value={endDate}
                        onChange={(newDate) => {
                            if (newDate) {
                                newDate.setDate(getDaysInMonth(newDate));
                            }
                            setEndDate(newDate);
                            handleChangeTimeMonth(startDate, newDate);
                        }}

                        renderInput={(params) => <TextField {...params} helperText={null}/>}
                    />
                </LocalizationProvider>

            </Collapse>
        </div>
    );
}