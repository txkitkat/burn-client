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
import {getFiresByRangeOfYears} from "../../service/burnService";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";


interface ITimeFilterProps {
    setFireData: (fireData: IFire[]) => void;
}

export default function TimeFilter(props: ITimeFilterProps) {
    const [dropDownTime, setDropDownTime] = useState(false);
    const [startYear, setStartYear] = React.useState<Date | null>(new Date());
    const [endYear, setEndYear] = React.useState<Date | null>(new Date());

    const handleChangeTime = () => {
        const _startYear = startYear?.getFullYear();
        const _endYear = endYear?.getFullYear();
        if (_startYear && _endYear)
        {
            getFiresByRangeOfYears(_startYear, _endYear)
            .then(fires => props.setFireData(fires))
            .catch(err => console.error(err));
        }else{
            // do nothing
        }

    };
   
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
                maxDate={new Date('2023')}
                value={startYear}
                onChange={(newYear)=>{
                    setStartYear(newYear);
                    handleChangeTime();
                }} 
          
          renderInput={(params) => <TextField {...params} helperText={null} />}
        />
        <ListItemText primary={""}/>
           <DatePicker
                views={['year']}
                label="End Year"
                minDate={new Date('1977')}
                maxDate={new Date('2023')}
                value={endYear}
                onChange={(newYear)=>{
                    setEndYear(newYear);
                    handleChangeTime();
                }} 
          
          renderInput={(params) => <TextField {...params} helperText={null} />}
        />
        </LocalizationProvider>
            
            </Collapse>
        </div>
    );
}