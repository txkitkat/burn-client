import ListItem from "@mui/material/ListItem";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Collapse from "@mui/material/Collapse";
import React, {useState} from "react";
import ListItemText from "@mui/material/ListItemText";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import {Divider} from "@mui/material";
import Typography from '@mui/material/Typography';
import {IFilterImplProps} from "./Filters";

export default function SeverityFilter(props: IFilterImplProps) {
    const [dropDownSeverity, setDropDownSeverity] = useState(false);

    const handleChangeMinSeverity = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newSeverity = parseFloat(event.target.value);
        (newSeverity >= 0) ? updateState("minSeverity", newSeverity) : updateState("minSeverity", 0);
        props.touchFilter("minSeverity");
    };

    const handleChangeMaxSeverity = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newSeverity = parseFloat(event.target.value);
        (newSeverity >= 0) ? updateState("minSeverity", newSeverity) : updateState("minSeverity", 0);
        props.touchFilter("maxSeverity");
    };

    function updateState<Type>(key: string, newState: Type) {
        props.setFilterState({...props.filterState, [key]: newState})
    }

    return (
        <div>
            <Divider/>
            <ListItem button key={"Sort by Severity"} onClick={() => setDropDownSeverity(!dropDownSeverity)}>
                <ListItemText primary={"Sort by Severity"}/>
                {dropDownSeverity ? <ExpandLess/> : <ExpandMore/>}
            </ListItem>
            <Collapse in={dropDownSeverity} timeout="auto" unmountOnExit>
                <ListItem alignItems="center">
                    <FormControl sx={{minWidth: 40}} variant="filled" color="primary">
                        <Typography variant="body2" gutterBottom align="center">
                            Specify Fire Severity
                        </Typography>
                        <TextField id="min-severity" label="Min Severity" variant="standard" type="number" defaultValue="-100.0"
                                   InputLabelProps={{shrink: true}} onChange={handleChangeMinSeverity}/>
                        <ListItemText primary={""}/>
                        <TextField id="max-severity" required label="Max Severity" variant="standard" type="number"
                                   defaultValue="50.0" InputLabelProps={{shrink: true}}
                                   onChange={handleChangeMaxSeverity}/>
                    </FormControl>
                </ListItem>
            </Collapse>
        </div>
    );
}