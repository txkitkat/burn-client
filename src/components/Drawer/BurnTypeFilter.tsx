import ListItem from "@mui/material/ListItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select, {SelectChangeEvent} from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Collapse from "@mui/material/Collapse";
import React, {useState} from "react";
import {getFiresByBurnType} from "../../service/burnService";
import IFire from "../../types/fireType";
import ListItemText from "@mui/material/ListItemText";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import {Divider} from "@mui/material";

interface IBurnTypeFilterProps {
    setFireData: (fireData: IFire[]) => void;
}

export default function BurnTypeFilter(props: IBurnTypeFilterProps) {
    const [dropDownBurnType, setDropDownBurnType] = useState(false);
    const [burnType, setBurnType] = React.useState('');

    const handleChangeBurnType = (event: SelectChangeEvent) => {
        setBurnType(event.target.value as string);
        getFiresByBurnType(event.target.value as string)
            .then(fires => props.setFireData(fires))
            .catch(err => console.error(err));
    };

    return (
        <div>
            <Divider/>
            <ListItem button key={"Sort by Burn Type"} onClick={() => setDropDownBurnType(!dropDownBurnType)}>
                <ListItemText primary={"Sort by Burn Type"}/>
                {dropDownBurnType ? <ExpandLess/> : <ExpandMore/>}
            </ListItem>
            <Collapse in={dropDownBurnType} timeout="auto" unmountOnExit>
                <ListItem alignItems="center">
                    <FormControl sx={{minWidth: 120}} variant="filled" color="primary">
                        <InputLabel id="demo-simple-select-label">Burn Type</InputLabel>
                        <Select
                            labelId="burnType-select-label"
                            id="burnType-select"
                            value={burnType}
                            label="Burn Type"
                            autoWidth
                            onChange={handleChangeBurnType}
                        >
                            <MenuItem value={"Broadcast"}>BROADCAST</MenuItem>
                            <MenuItem value={"Hand Pile"}>HAND PILE</MenuItem>
                            <MenuItem value={"Machine Pile"}>MACHINE PILE</MenuItem>
                        </Select>
                    </FormControl>
                </ListItem>
            </Collapse>
        </div>
    );
}