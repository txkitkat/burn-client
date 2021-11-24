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

export default function FireTypeFilter(props: IFilterImplProps) {
    const [dropDownFireType, setDropDownFireType] = useState(false);

    const handleChangeFireType = (event: SelectChangeEvent) => {
        props.setFilterState({...props.filterState, fireType: event.target.value as string});
        props.touchFilter("fireType");
        // getFiresBySource(event.target.value as string)
        //     .then(fires => props.setFireData(fires))
        //     .catch(err => console.error(err));
    };

    return (
        <div>
            <Divider/>
            <ListItem button key={"Type of Fire"} onClick={() => setDropDownFireType(!dropDownFireType)}>
                <ListItemText primary={"Type of Fire"}/>
                {dropDownFireType ? <ExpandLess/> : <ExpandMore/>}
            </ListItem>
            <Collapse in={dropDownFireType} timeout="auto" unmountOnExit>
                <ListItem alignItems="center">
                    <FormControl sx={{minWidth: 120}} variant="filled" color="primary">
                        <InputLabel id="source-select-label-input">Fire Type</InputLabel>
                        <Select
                            //labelId="dataset-select-label"
                            //id="dataset-select"
                            value={props.filterState.fireType}
                            label="Fire Type"
                            autoWidth
                            onChange={handleChangeFireType}
                        >
                            <MenuItem value={"PRESCRIBED"}>PRESCRIBED</MenuItem>
                            <MenuItem value={"ESCAPED"}>ESCAPED</MenuItem>
                            <MenuItem value={"ALL"}>ALL</MenuItem>
                        </Select>
                    </FormControl>
                </ListItem>
            </Collapse>
        </div>
    );
}