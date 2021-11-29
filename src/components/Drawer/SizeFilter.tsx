import ListItem from "@mui/material/ListItem";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Tooltip from '@mui/material/Tooltip';
import Collapse from "@mui/material/Collapse";
import React, { useState } from "react";
import ListItemText from "@mui/material/ListItemText";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { Divider } from "@mui/material";
import Typography from '@mui/material/Typography';
import { IFilterImplProps } from "./Filters";

const MIN_FIRE_SIZE = 0;
const MAX_FIRE_SIZE = 100000;

export default function SizeFilter(props: IFilterImplProps) {
    const [dropDownSize, setDropDownSize] = useState(false);

    const handleChangeMinSize = (event: React.ChangeEvent<HTMLInputElement>) => {
        const enteredSize = parseFloat(event.target.value);
        if (enteredSize > props.filterState.maxAcres) updateState("minAcres", props.filterState.maxAcres)
        else (enteredSize >= 0) ? updateState("minAcres", enteredSize) : updateState("minAcres", 0);
        props.touchFilter("minAcres");
    };

    const handleChangeMaxSize = (event: React.ChangeEvent<HTMLInputElement>) => {
        const enteredSize = parseFloat(event.target.value);
        if (enteredSize < props.filterState.minAcres) updateState("maxAcres", props.filterState.minAcres)
        else enteredSize >= 0 ? updateState("maxAcres", enteredSize) : updateState("maxAcres", 0);
        props.touchFilter("maxAcres");
    };

    function updateState<KeyStateType>(key: string, newState: KeyStateType) {
        props.setFilterState({ ...props.filterState, [key]: newState })
    }

    return (
        <div>
            <Divider />
            <ListItem button key={"Sort by Size"} onClick={() => setDropDownSize(!dropDownSize)}>
                <ListItemText primary={"Sort by Size"} />
                {dropDownSize ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={dropDownSize} timeout="auto" unmountOnExit>
                <ListItem alignItems="center">
                    <FormControl sx={{ minWidth: 40 }} variant="filled" color="primary">
                        <Typography variant="body2" gutterBottom align="center">
                            Specify Fire size in Acres
                        </Typography>
                        <Tooltip title="Please edit both min and max size values" arrow>
                            <TextField id="min-size" label="Min Size" variant="standard" type="number"
                                defaultValue={MIN_FIRE_SIZE} InputLabelProps={{ shrink: true }}
                                onChange={handleChangeMinSize} />
                        </Tooltip>
                        <ListItemText primary={""} />
                        <Tooltip title="Please edit both min and max size values" arrow>
                            <TextField id="max-size" required label="Max Size" variant="standard" type="number"
                                defaultValue={MAX_FIRE_SIZE} InputLabelProps={{ shrink: true }}
                                onChange={handleChangeMaxSize} />
                        </Tooltip>

                    </FormControl>
                </ListItem>
            </Collapse>
        </div>
    );
}