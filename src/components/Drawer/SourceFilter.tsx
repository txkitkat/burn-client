import ListItem from "@mui/material/ListItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select, {SelectChangeEvent} from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Collapse from "@mui/material/Collapse";
import React, {useState} from "react";
import {getFiresBySource} from "../../service/burnService";
import IFire from "../../types/fireType";
import ListItemText from "@mui/material/ListItemText";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import {Divider} from "@mui/material";

interface ISourceFilterProps {
    setFireData: (fireData: IFire[]) => void;
}

export default function SourceFilter(props: ISourceFilterProps) {
    const [dropDownDataset, setDropDownDataset] = useState(false);
    const [dataset, setDataset] = React.useState('');

    const handleChangeDataset = (event: SelectChangeEvent) => {
        setDataset(event.target.value as string);
        getFiresBySource(event.target.value as string)
            .then(fires => props.setFireData(fires))
            .catch(err => console.error(err));
    };

    return (
        <div>
            <Divider/>
            <ListItem button key={"Sort by Dataset"} onClick={() => setDropDownDataset(!dropDownDataset)}>
                <ListItemText primary={"Sort by Dataset"} inset/>
                {dropDownDataset ? <ExpandLess/> : <ExpandMore/>}
            </ListItem>
            <Collapse in={dropDownDataset} timeout="auto" unmountOnExit>
                <ListItem alignItems="center">
                    <FormControl sx={{minWidth: 120}} variant="filled" color="primary">
                        <InputLabel id="demo-si\
                            mple-select-label">Dataset</InputLabel>
                        <Select
                            labelId="dataset-select-label"
                            id="dataset-select"
                            value={dataset}
                            label="Dataset"
                            autoWidth
                            onChange={handleChangeDataset}
                        >
                            <MenuItem value={"CALFIRE"}>CALFIRES</MenuItem>
                            <MenuItem value={"PFIRS"}>PFIRx</MenuItem>
                            <MenuItem value={"MTBS"}>MTBS</MenuItem>
                        </Select>
                    </FormControl>
                </ListItem>
            </Collapse>
        </div>
    );
}