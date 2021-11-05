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

export default function IntensityFilter(props: IFilterImplProps) {
    const [dropDownSize, setDropDownSize] = useState(false);

    const handleChangeMinIntensity = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newIntensity = parseFloat(event.target.value);
        (newIntensity >= 0) ? updateState("minIntensity", newIntensity) : updateState("minIntensity", 0);
        props.touchFilter("minIntensity");
    };

    const handleChangeMaxIntensity = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newIntensity = parseFloat(event.target.value);
        (newIntensity >= 0) ? updateState("minIntensity", newIntensity) : updateState("minIntensity", 0);
        props.touchFilter("maxIntensity");
    };

    function updateState<Type>(key: string, newState: Type) {
        props.setFilterState({...props.filterState, [key]: newState})
    }

    return (
        <div>
            <Divider/>
            <ListItem button key={"Sort by Intensity"} onClick={() => setDropDownSize(!dropDownSize)}>
                <ListItemText primary={"Sort by Intensity"}/>
                {dropDownSize ? <ExpandLess/> : <ExpandMore/>}
            </ListItem>
            <Collapse in={dropDownSize} timeout="auto" unmountOnExit>
                <ListItem alignItems="center">
                    <FormControl sx={{minWidth: 40}} variant="filled" color="primary">
                        <Typography variant="body2" gutterBottom align="center">
                            Specify Fire Intensity
                        </Typography>
                        <TextField id="min-size" label="Min Size" variant="standard" type="number" defaultValue="-100.0"
                                   InputLabelProps={{shrink: true}} onChange={handleChangeMinIntensity}/>
                        <ListItemText primary={""}/>
                        <TextField id="max-size" required label="Max Size" variant="standard" type="number"
                                   defaultValue="50.0" InputLabelProps={{shrink: true}}
                                   onChange={handleChangeMaxIntensity}/>
                    </FormControl>
                </ListItem>
            </Collapse>
        </div>
    );
}