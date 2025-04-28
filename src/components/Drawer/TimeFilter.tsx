import ListItem from "@mui/material/ListItem";
import Collapse from "@mui/material/Collapse";
import { useState } from "react";
import ListItemText from "@mui/material/ListItemText";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { Divider, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
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

    const handleStartYearChange = (event: SelectChangeEvent<string>) => {
        const newYear = event.target.value;
        setStartYearUserInput(newYear);
        checkValidStartYearAndSetState(newYear);
    }

    const handleEndYearChange = (event: SelectChangeEvent<string>) => {
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
            <ListItem component="button" key={"Sort by Year"} onClick={() => setDropDownTime(!dropDownTime)}>
                <ListItemText primary={"Sort by Year"} />
                {dropDownTime ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={dropDownTime} timeout="auto" unmountOnExit>
                <FormControl sx={{ margin: 2, minWidth: 90 }} variant="standard" color="primary">
                        <InputLabel>Start Year</InputLabel>
                        <Tooltip title="Please edit both start and end year values" arrow>
                            <Select
                                labelId="start-year-select-label"
                                id="start-year-select"
                                label="Start Year"
                                onChange={handleStartYearChange}
                            >
                                {years.map(year => (
                                    <MenuItem value={year.value} key={year.name}>
                                        {year.name}
                                    </MenuItem>
                                ))}

                            </Select>
                        </Tooltip>
                    </FormControl>
                    <FormControl sx={{ margin: 2, minWidth: 90 }} variant="standard" color="primary">
                        <InputLabel>End Year</InputLabel>
                        <Tooltip title="Please edit both start and end year values" arrow>
                        <Select
                                labelId="end-year-select-label"
                                id="end-year-select"
                                defaultValue={defaultEndYear.toString()}
                                value={defaultEndYear.toString()}
                                label="End Year"
                                onChange={handleEndYearChange}
                            >
                                {years.map(year => (
                                    <MenuItem value={year.value} key={year.name}>
                                        {year.name}
                                    </MenuItem>
                                ))}

                            </Select>
                        </Tooltip>
                    </FormControl>
            </Collapse>
        </div>
    );
}

//Years Covered: 1979 - 2020
const years: {
    name: string;
    value: number;
}[] =
    [
        {"name": "1979", "value": 1979}, {"name": "1980", "value": 1980}, {"name": "1981", "value": 1981}, {"name": "1982", "value": 1982},
        {"name": "1983", "value": 1983}, {"name": "1984", "value": 1984}, {"name": "1985", "value": 1985}, {"name": "1986", "value": 1986},
        {"name": "1987", "value": 1987}, {"name": "1988", "value": 1988}, {"name": "1989", "value": 1989}, {"name": "1990", "value": 1990},
        {"name": "1991", "value": 1991}, {"name": "1992", "value": 1992}, {"name": "1993", "value": 1993}, {"name": "1994", "value": 1994},
        {"name": "1995", "value": 1995}, {"name": "1996", "value": 1996}, {"name": "1997", "value": 1997}, {"name": "1998", "value": 1998},
        {"name": "1999", "value": 1999}, {"name": "2000", "value": 2000}, {"name": "2001", "value": 2001}, {"name": "2002", "value": 2002},
        {"name": "2003", "value": 2003}, {"name": "2004", "value": 2004}, {"name": "2005", "value": 2005}, {"name": "2006", "value": 2006},
        {"name": "2007", "value": 2007}, {"name": "2008", "value": 2008}, {"name": "2009", "value": 2009}, {"name": "2010", "value": 2010},
        {"name": "2011", "value": 2011}, {"name": "2012", "value": 2012}, {"name": "2013", "value": 2013}, {"name": "2014", "value": 2014},
        {"name": "2015", "value": 2015}, {"name": "2016", "value": 2016}, {"name": "2017", "value": 2017}, {"name": "2018", "value": 2018},
        {"name": "2019", "value": 2019}, {"name": "2020", "value": 2020}, {"name": "2021", "value": 2021}, {"name": "2022", "value": 2022},
        {"name": "2023", "value": 2023},
    ]