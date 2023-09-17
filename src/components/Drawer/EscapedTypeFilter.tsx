import ListItem from "@mui/material/ListItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select, {SelectChangeEvent} from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Collapse from "@mui/material/Collapse";
import React, {useState} from "react";
import ListItemText from "@mui/material/ListItemText";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import {Divider} from "@mui/material";
import {IFilterImplProps} from "./Filters";

export default function EscapedTypeFilter(props: IFilterImplProps) {
    const [dropDownEscaped, setDropDownEscaped] = useState(false);

    const handleChangeEscaped = (event: SelectChangeEvent) => {
        updateState("escaped", event.target.value as string);
        props.touchFilter("escaped");
    };

    function updateState<KeyStateType>(key: string, newState: KeyStateType) {
        props.setFilterState({...props.filterState, [key]: newState})
    }

    const enabledStyle = {
        color: "black"
    };

    const disabledStyle = {
        color: "gray"
    };

    return (
        <div>
            <Divider/>
            <ListItem key={"Sort By Escaped"} onClick={() => setDropDownEscaped(!["WILDFIRE","WILDLAND FIRE USE","UNKNOWN","ALL"].includes(props.filterState.fireType) && !dropDownEscaped)}>
                <ListItemText primary={"Sort By Escaped"} 
                    primaryTypographyProps={["WILDFIRE","WILDLAND FIRE USE","UNKNOWN","ALL"].includes(props.filterState.fireType) ? { style: disabledStyle}: {style: enabledStyle}}/>
                {dropDownEscaped ? <ExpandLess color={(["WILDFIRE","WILDLAND FIRE USE","UNKNOWN","ALL"].includes(props.filterState.fireType))? "disabled": "inherit"}/> : <ExpandMore color={(["WILDFIRE","WILDLAND FIRE USE","UNKNOWN","ALL"].includes(props.filterState.fireType))? "disabled": "inherit"}/>}
            </ListItem>
            <Collapse in={!(["WILDFIRE","WILDLAND FIRE USE","UNKNOWN","ALL"].includes(props.filterState.fireType)) && dropDownEscaped} timeout="auto" unmountOnExit>
                <ListItem alignItems="center">
                    <FormControl sx={{minWidth: 120}} variant="filled" color="primary">
                        <InputLabel id="demo-simple-select-label">Escaped</InputLabel>
                        <Select
                            labelId="escaped-select-label"
                            id="escaped-select"
                            value={props.filterState.escaped}
                            label="Escaped Fire"
                            autoWidth
                            onChange={handleChangeEscaped}
                        >
                            <MenuItem value={"TRUE"}>Escaped</MenuItem>
                            <MenuItem value={"FALSE"}>Not Escaped</MenuItem>
                        </Select>
                    </FormControl>
                </ListItem>
            </Collapse>
        </div>
    );
}