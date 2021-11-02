import ListItem from "@mui/material/ListItem";
import FormControl from "@mui/material/FormControl";
import Collapse from "@mui/material/Collapse";
import React, {useState} from "react";
import {getFiresByOwner} from "../../service/burnService";
import IFire from "../../types/fireType";
import ListItemText from "@mui/material/ListItemText";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import {Divider} from "@mui/material";
import Button from '@mui/material/Button';
import InputLabel from "@mui/material/InputLabel";
import Select, {SelectChangeEvent} from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

interface IOwnerFilterProps {
    setFireData: (fireData: IFire[]) => void;
}

export default function OwnerFiler(props: IOwnerFilterProps) {
    const [dropDownSize, setDropDownSize] = useState(false);
    const [owner, setOwner] = React.useState("");

    const handleChangeOwner = (event: SelectChangeEvent) => {
        setOwner(event.target.value);
    };

    const handleApplyOwner = () => {
        getFiresByOwner(owner)
            .then(fires => props.setFireData(fires))
            .catch(err => console.error(err));
    };

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
                            value={owner}
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
                <Button variant="text" onClick={handleApplyOwner}>{"Apply Owner"}</Button>
            </Collapse>
        </div>
    );
}