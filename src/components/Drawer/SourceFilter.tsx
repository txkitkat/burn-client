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

export default function SourceFilter(props: IFilterImplProps) {
    const [dropDownDataset, setDropDownDataset] = useState(false);

    const handleChangeDataset = (event: SelectChangeEvent) => {
        props.setFilterState({...props.filterState, source: event.target.value as string});
        props.touchFilter("source");
    };

    return (
        <div>
            <Divider/>
            <ListItem button key={"Sort by Dataset"} onClick={() => setDropDownDataset(!dropDownDataset)}>
                <ListItemText primary={"Sort by Dataset"}/>
                {dropDownDataset ? <ExpandLess/> : <ExpandMore/>}
            </ListItem>
            <Collapse in={dropDownDataset} timeout="auto" unmountOnExit>
                <ListItem alignItems="center">
                    <FormControl sx={{minWidth: 120}} variant="filled" color="primary">
                        <InputLabel id="source-select-label-input">Dataset</InputLabel>
                        <Select
                            labelId="dataset-select-label"
                            id="dataset-select"
                            value={props.filterState.source}
                            label="Dataset"
                            autoWidth
                            onChange={handleChangeDataset}
                        >
                            <MenuItem disabled={["WILDFIRE", "WILDLAND FIRE USE"].includes(props.filterState.fireType)} value={"CALFIRE"}>CALFIRES</MenuItem>
                            <MenuItem disabled={["WILDFIRE", "WILDLAND FIRE USE"].includes(props.filterState.fireType)} value={"PFIRS"}>PFIRx</MenuItem>
                            <MenuItem value={"MTBS"}>MTBS</MenuItem>
                        </Select>
                    </FormControl>
                </ListItem>
            </Collapse>
        </div>
    );
}