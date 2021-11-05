import ListItem from "@mui/material/ListItem";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Collapse from "@mui/material/Collapse";
import React, {useState} from "react";
import {getFiresByIntensity} from "../../service/burnService";
import IFire from "../../types/fireType";
import ListItemText from "@mui/material/ListItemText";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import {Divider} from "@mui/material";
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

interface IIntensityFilterProps {
    setFireData: (fireData: IFire[]) => void;
}

export default function IntensityFilter(props: IIntensityFilterProps) {
    const [dropDownSize, setDropDownSize] = useState(false);
    const [minIntensity, setMinIntensity] = React.useState(0);
    const [maxIntensity, setMaxIntensity] = React.useState(0);

    const handleChangeMinIntensity = (event: React.ChangeEvent<HTMLInputElement>) => {
        const minIntensity = parseFloat(event.target.value);
        (minIntensity >= 0) ? setMinIntensity(minIntensity) : setMinIntensity(0);
    };
    const handleChangeMaxIntensity = (event: React.ChangeEvent<HTMLInputElement>) => {
        const maxIntensity = parseFloat(event.target.value);
        maxIntensity >= 0 ? setMaxIntensity(maxIntensity) : setMaxIntensity(0);
    };
    const handleIntensity = () => {
        getFiresByIntensity(minIntensity, maxIntensity)
            .then(fires => props.setFireData(fires))
            .catch(err => console.error(err));
    };

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
                <Button variant="text" onClick={handleIntensity}>{"Apply Intensity"}</Button>
            </Collapse>
        </div>
    );
}