import ListItem from "@mui/material/ListItem";
import FormControl from "@mui/material/FormControl";
import Collapse from "@mui/material/Collapse";
import React, {useState} from "react";
import ListItemText from "@mui/material/ListItemText";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import {Divider} from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import Select, {SelectChangeEvent} from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import {IFilterImplProps} from "./Filters";

export default function OwnerFiler(props: IFilterImplProps) {
    const [dropDownSize, setDropDownSize] = useState(false);

    const handleChangeOwner = (event: SelectChangeEvent) => {
        updateState("owner", event.target.value);
        props.touchFilter("owner");
    };

    // const handleApplyOwner = () => {
    //     getFiresByOwner(owner)
    //         .then(fires => props.setFireData(fires))
    //         .catch(err => console.error(err));
    // };

    function updateState<KeyStateType>(key: string, newState: KeyStateType) {
        props.setFilterState({...props.filterState, [key]: newState})
    }

    return (
        <div>
            <Divider/>
            <ListItem button key={"Sort by Owner"} onClick={() => setDropDownSize(!dropDownSize)}>
                <ListItemText primary={"Sort by Owner"}/>
                {dropDownSize ? <ExpandLess/> : <ExpandMore/>}
            </ListItem>
            <Collapse in={dropDownSize} timeout="auto" unmountOnExit>
                <ListItem alignItems="center">
                    <FormControl sx={{minWidth: 120}} variant="filled" color="primary">
                        <InputLabel id="owner-select-label-input">Owner</InputLabel>
                        <Select
                            labelId="owner-select-label"
                            id="owner-select"
                            value={props.filterState.owner}
                            label="Owner"
                            autoWidth
                            onChange={handleChangeOwner}
                        >
                            <MenuItem value={"Private"}>Private</MenuItem>
                            <MenuItem value={"Federal"}>Federal</MenuItem>
                            <MenuItem value={"State"}>State</MenuItem>
                            <MenuItem value={"County"}>County</MenuItem>
                            <MenuItem value={"City"}>City</MenuItem>
                            <MenuItem value={"Special District"}>Special District</MenuItem>
                            <MenuItem value={"Non Profit"}>Non Profit</MenuItem>
                        </Select>
                    </FormControl>
                </ListItem>
            </Collapse>
        </div>
    );
}