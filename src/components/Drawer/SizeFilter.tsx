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

export default function SizeFilter(props: IFilterImplProps) {
    const [dropDownSize, setDropDownSize] = useState(false);
    const [minAcresValue, setMinAcresValue] = useState(props.filterState.minAcres);
    const [maxAcresValue, setMaxAcresValue] = useState(props.filterState.maxAcres);

    const handleChangeMinSize = (event: React.ChangeEvent<HTMLInputElement>) => {
        const enteredSize = parseFloat(event.target.value);
        if (enteredSize >= 0 && maxAcresValue>=0 && enteredSize <= maxAcresValue){
            setMinAcresValue(enteredSize);
            updateState("minAcres", enteredSize, "maxAcres", maxAcresValue);
            props.touchTwoFilters("minAcres", "maxAcres");
        }
    };

    const handleChangeMaxSize = (event: React.ChangeEvent<HTMLInputElement>) => {
        const enteredSize = parseFloat(event.target.value);
        if (enteredSize>=0 && minAcresValue>=0 && minAcresValue<= enteredSize){
            setMaxAcresValue(enteredSize);
            updateState("minAcres", minAcresValue, "maxAcres", enteredSize);
            props.touchTwoFilters("minAcres", "maxAcres");
        }
    };

    function updateState<KeyStateType>(key1: string, newState1: KeyStateType, key2: string, newState2: KeyStateType) {
        props.setFilterState({ ...props.filterState, [key1]: newState1, [key2]: newState2 })
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
                        <Tooltip title="Please provide max size followed by min size" arrow>
                            <TextField id="min-size" label="Min Size" variant="standard" type="number"
                                value={minAcresValue} InputLabelProps={{ shrink: true }}
                                onChange={handleChangeMinSize} />
                        </Tooltip>
                        <ListItemText primary={""} />
                        <Tooltip title="Please provide max size followed by min size" arrow>
                            <TextField id="max-size" required label="Max Size" variant="standard" type="number"
                                value={maxAcresValue} InputLabelProps={{ shrink: true }}
                                onChange={handleChangeMaxSize} />
                        </Tooltip>

                    </FormControl>
                </ListItem>
            </Collapse>
        </div>
    );
}