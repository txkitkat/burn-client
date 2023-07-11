import ListItem from "@mui/material/ListItem";
import Collapse from "@mui/material/Collapse";
import React, { useState } from "react";
import ListItemText from "@mui/material/ListItemText";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { Divider } from "@mui/material";
import TextField from "@mui/material/TextField";
import Tooltip from '@mui/material/Tooltip';
import { IFilterImplProps } from "./Filters";

export default function TimeFilter(props: IFilterImplProps) {
    const [dropDownTime, setDropDownTime] = useState(false);

    const [isStartYearInError, setIsStartYearInError] = useState(false);
    const [isEndYearInError, setIsEndYearInError] = useState(false);
    const defaultStartYear = props.filterState.startYear;
    const defaultEndYear = props.filterState.endYear;
    const [startYearUserInput, setStartYearUserInput] = useState(defaultStartYear.toString());
    const [endYearUserInput, setEndYearUserInput] = useState(defaultEndYear.toString());
    const [helperTextStartYear, setHelperTextStartYear] = useState(" ");
    const [helperTextEndYear, setHelperTextEndYear] = useState(" ");

    const checkValidStartYearAndSetState = (newYear: string) => {
        if (newYear) {
            const startYear = parseInt(newYear);
            const endYear = parseInt(endYearUserInput);
            if (startYear && endYear && startYear <= endYear) {
                setIsStartYearInError(false);
                setIsEndYearInError(false);
                setHelperTextStartYear(" ");
                setHelperTextEndYear(" ");
                updateState("startYear", startYear, "endYear", endYear);//must do both together for state to update properly
                props.touchTwoFilters("startYear", "endYear");
            }
            else {
                console.log("error type 1");
                setIsStartYearInError(true);
                setHelperTextStartYear("select start year <= end year");
            }
        }
        else {
            console.log("error invalid value");
            setIsStartYearInError(true);
            setHelperTextStartYear("invalid value");
        }
    }

    const checkValidEndYearAndSetState = (newYear: string) => {
        if (newYear) {
            const endYear = parseInt(newYear);
            const startYear = parseInt(startYearUserInput);
            if (endYear && startYear && endYear >= startYear) {
                setIsStartYearInError(false);
                setIsEndYearInError(false);
                setHelperTextStartYear(" ");
                setHelperTextEndYear(" ");
                updateState("startYear", startYear, "endYear", endYear); //must do both together for state to update properly
                props.touchTwoFilters("startYear", "endYear");// this so that a default endYear is also touched
            }
            else {
                setIsEndYearInError(true);
                setHelperTextEndYear("select end year >= start year");
            }
        }
        else {
            setIsEndYearInError(true);
            setHelperTextEndYear("invalid value");
        }
    }

    const handleStartYearChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const newYear = event.target.value;
        setStartYearUserInput(newYear);
        checkValidStartYearAndSetState(newYear);
    }

    const handleEndYearChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const newYear = event.target.value;
        setEndYearUserInput(newYear);
        checkValidEndYearAndSetState(newYear);
    }

    function updateState<KeyStateType>(key1: string, newState1: KeyStateType, key2: string, newState2: KeyStateType) {
        props.setFilterState({ ...props.filterState, [key1]: newState1, [key2]: newState2 })
    }

    return (
        <div>
            <Divider />
            <ListItem button key={"Sort by Year"} onClick={() => setDropDownTime(!dropDownTime)}>
                <ListItemText primary={"Sort by Year"} />
                {dropDownTime ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={dropDownTime} timeout="auto" unmountOnExit>
                <Tooltip title="Please edit both start and end year values" arrow>
                    <TextField sx={{ marginLeft: 2, minWidth: 90 }}
                        id="start-year"
                        label="Start Year"
                        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        variant="standard"
                        defaultValue={defaultStartYear}
                        error={isStartYearInError}
                        helperText={helperTextStartYear}
                        onChange={handleStartYearChange}
                    />
                </Tooltip>
                <Tooltip title="Please edit both start and end year values" arrow>
                    <TextField sx={{ marginLeft: 2, minWidth: 90 }}
                        id="end-year"
                        label="End Year"
                        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        variant="standard"
                        defaultValue={defaultEndYear}
                        error={isEndYearInError}
                        helperText={helperTextEndYear}
                        onChange={handleEndYearChange}
                    />
                </Tooltip>
            </Collapse>
        </div>
    );
}