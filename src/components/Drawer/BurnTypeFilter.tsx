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

export default function BurnTypeFilter(props: IFilterImplProps) {
    const [dropDownBurnType, setDropDownBurnType] = useState(false);

    const handleChangeBurnType = (event: SelectChangeEvent) => {
        updateState("burnType", event.target.value as string);
        props.touchFilter("burnType");
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
            <ListItem button key={"Sort by Burn Type"} onClick={() => setDropDownBurnType(!(props.filterState.fireType==="ESCAPED") && !dropDownBurnType)}>
                <ListItemText primary={"Sort by Burn Type"} primaryTypographyProps={(props.filterState.fireType==="ESCAPED")? { style: disabledStyle}: {style: enabledStyle}}/>
                {dropDownBurnType ? <ExpandLess color={(props.filterState.fireType==="ESCAPED")? "disabled": "inherit"}/> : <ExpandMore color={(props.filterState.fireType==="ESCAPED")? "disabled": "inherit"}/>}
            </ListItem>
            <Collapse in={!(props.filterState.fireType==="ESCAPED") && dropDownBurnType} timeout="auto" unmountOnExit>
                <ListItem alignItems="center">
                    <FormControl sx={{minWidth: 120}} variant="filled" color="primary">
                        <InputLabel id="demo-simple-select-label">Burn Type</InputLabel>
                        <Select
                            labelId="burnType-select-label"
                            id="burnType-select"
                            value={props.filterState.burnType}
                            label="Burn Type"
                            autoWidth
                            onChange={handleChangeBurnType}
                        >
                            <MenuItem value={"Broadcast"}>BROADCAST</MenuItem>
                            <MenuItem value={"Hand Pile"}>HAND PILE</MenuItem>
                            <MenuItem value={"Machine Pile"}>MACHINE PILE</MenuItem>
                            <MenuItem value={"UNK"}>UNK</MenuItem>
                        </Select>
                    </FormControl>
                </ListItem>
            </Collapse>
        </div>
    );
}