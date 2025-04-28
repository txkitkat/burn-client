import ListItem from "@mui/material/ListItem";
import Collapse from "@mui/material/Collapse";
import React, {useState} from "react";
import ListItemText from "@mui/material/ListItemText";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import {Divider} from "@mui/material";
import Autocomplete, {AutocompleteChangeReason} from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import {IFilterImplProps} from "./Filters";

export default function LocationFilter(props: IFilterImplProps) {
    const [dropDownLocation, setDropDownLocation] = useState(false);

    const handleChangeLocation = (event: React.SyntheticEvent<Element, Event>, value: string | null, reason: AutocompleteChangeReason) => {
        props.setFilterState({...props.filterState, county: value as string});
        props.touchFilter("county");
    };

    return (
        <div>
            <Divider/>
            <ListItem component="button" key={"Sort by Location"} onClick={() => setDropDownLocation(!dropDownLocation)}>
                <ListItemText primary={"Sort by Location"}/>
                {dropDownLocation ? <ExpandLess/> : <ExpandMore/>}
            </ListItem>
            <Collapse in={dropDownLocation} timeout="auto" unmountOnExit>
                <Autocomplete
                    disablePortal
                    id="County"
                    options={counties}
                    sx={{marginLeft: 2, marginRight: 2}}
                    renderInput={(params) => <TextField {...params} label="County"/>}
                    onChange={handleChangeLocation}
                    value={props.filterState.county}
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

