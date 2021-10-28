import ListItem from "@mui/material/ListItem";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Collapse from "@mui/material/Collapse";
import React, {useState} from "react";
import {getFiresByRangeOfAcres} from "../../service/burnService";
import IFire from "../../types/fireType";
import ListItemText from "@mui/material/ListItemText";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import {Divider} from "@mui/material";
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

interface ISizeFilterProps {
    setFireData: (fireData: IFire[]) => void;
}

export default function SizeFilter(props: ISizeFilterProps) {
    const [dropDownSize, setDropDownSize] = useState(false);
    const [minSize, setMinSize] = React.useState(0);
    const [maxSize, setMaxSize] = React.useState(0);

    const handleChangeMinSize = (event: React.ChangeEvent<HTMLInputElement>) => {
        const minSize = parseFloat(event.target.value);
        (minSize >=0)? setMinSize(minSize): setMinSize(0);
    };
    const handleChangeMaxSize = (event: React.ChangeEvent<HTMLInputElement>) => {
        const maxSize = parseFloat(event.target.value);
        maxSize >=0 ? setMaxSize(maxSize): setMaxSize(0);
    };
    const handleApplySize = () => {
        getFiresByRangeOfAcres(minSize, maxSize)
            .then(fires => props.setFireData(fires))
            .catch(err => console.error(err));
    };

    return (
        <div>
            <Divider/>
            <ListItem button key={"Sort by Maximum Size"} onClick={() => setDropDownSize(!dropDownSize)}>
                <ListItemText primary={"Sort by Maximum Size"}/>
                {dropDownSize ? <ExpandLess/> : <ExpandMore/>}
            </ListItem>
            <Collapse in={dropDownSize} timeout="auto" unmountOnExit>
                <ListItem alignItems="center">
                    <FormControl sx={{minWidth: 40}} variant="filled" color="primary">
                    <Typography variant="body2" gutterBottom align="center">
                        Specify Fire size in Acres
                    </Typography>
                        <TextField id="min-size" label="Min Size" variant="standard" type="number" defaultValue="0" InputLabelProps={{shrink: true}} onChange={handleChangeMinSize}/>
                        <ListItemText primary={""}/>
                        <TextField id="max-size" required label="Max Size" variant="standard" type="number" defaultValue="1000" InputLabelProps={{shrink: true}} onChange={handleChangeMaxSize}/>
                    </FormControl>
                </ListItem>
                <Button variant="text" onClick={handleApplySize}>{"Apply Size"}</Button>
            </Collapse>
        </div>
    );
}