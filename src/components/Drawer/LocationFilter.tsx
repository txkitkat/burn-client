import ListItem from "@mui/material/ListItem";
import Collapse from "@mui/material/Collapse";
import React, {useState} from "react";
import {getFiresByCounty} from "../../service/burnService";
import IFire from "../../types/fireType";
import ListItemText from "@mui/material/ListItemText";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import {Divider} from "@mui/material";
import Autocomplete, { AutocompleteChangeReason } from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

interface ILocationFilterProps {
    setFireData: (fireData: IFire[]) => void;
}

export default function LocationFilter(props: ILocationFilterProps) {
    const [dropDownLocation, setDropDownLocation] = useState(false);
    const [location, setLocation] = React.useState('');

    const handleChangeLocation = (event: React.SyntheticEvent<Element, Event>, value: string | null, reason: AutocompleteChangeReason) => {
        setLocation(value as string);
        getFiresByCounty(value as string)
            .then(fires => props.setFireData(fires))
            .catch(err => console.error(err));
    };
   
    return (
        <div>
            <Divider/>
            <ListItem button key={"Sort by Location"} onClick={() => setDropDownLocation(!dropDownLocation)}>
                <ListItemText primary={"Sort by Location"}/>
                {dropDownLocation ? <ExpandLess/> : <ExpandMore/>}
            </ListItem>
            <Collapse in={dropDownLocation} timeout="auto" unmountOnExit>
            <Autocomplete
                disablePortal
                id="County"
                options={counties}
                sx={{ width: 200 }}
                renderInput={(params) => <TextField {...params} label="County" />}
                onChange={handleChangeLocation}
                value={location}
            />
            </Collapse>
        </div>
    );
}

const counties = ["Alameda",
"Alpine",
"Amador",
"Butte",
"Calaveras",
"Colusa",
"Contra Costa",
"Del Norte",
"El Dorado",
"Fresno",
"Glenn",
"Humboldt",
"Imperial",
"Inyo",
"Kern",
"Kings",
"Lake",
"Lassen",
"Los Angeles",
"Madera",
"Marin",
"Mariposa",
"Mendocino",
"Merced",
"Modoc",
"Mono",
"Monterey",
"Napa",
"Nevada",
"Orange",
"Placer",
"Plumas",
"Riverside",
"Sacramento",
"San Benito",
"San Bernardino",
"San Diego",
"San Francisco",
"San Joaquin",
"San Luis Obispo",
"San Mateo",
"Santa Barbara",
"Santa Clara",
"Santa Cruz",
"Shasta",
"Sierra",
"Siskiyou",
"Solano",
"Sonoma",
"Stanislaus",
"Sutter",
"Tehama",
"Trinity",
"Tulare",
"Tuolumne",
"Ventura",
"Yolo",
"Yuba"];

