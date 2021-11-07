import React, {useState} from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import IconButton from "@mui/material/IconButton";
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import "./Filters.css";
import IFire from "../../types/fireType";
import SourceFilter from "./SourceFilter";
import SizeFilter from "./SizeFilter";
import BurnTypeFilter from "./BurnTypeFilter";
import LocationFilter from "./LocationFilter";
import TimeFilter from "./TimeFilter";
import TimeMonthFilter from "./TimeMonthFilter";
import OwnerFiler from "./OwnerFilter";
import SeverityFilter from "./SeverityFilter";
import Button from "@mui/material/Button";
import {getFiresByFilters} from "../../service/burnService";

interface IFiltersProps {
    setFireData: (fireData: IFire[]) => void;
}

export interface IFilterImplProps {
    setFilterState: (newState: IFiltersState) => void;
    touchFilter: (key: string) => void;
    filterState: IFiltersState
}

export interface IFiltersState {
    source: string
    county: string
    minAcres: number
    maxAcres: number
    burnType: string
    startYear: Date
    endYear: Date
    startMonth: number
    endMonth: number
    owner: string
    minSeverity: number
    maxSeverity: number
}

export interface IFiltersInteracted {
    source: boolean
    county: boolean
    minAcres: boolean
    maxAcres: boolean
    burnType: boolean
    startYear: boolean
    endYear: boolean
    startMonth: boolean
    endMonth: boolean
    owner: boolean
    minSeverity: boolean
    maxSeverity: boolean
}

export default function Filters(props: IFiltersProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [state, setState] = useState<IFiltersState>({
        source: "",
        county: "",
        minAcres: 0,
        maxAcres: 0,
        burnType: "",
        startYear: new Date("2020"),
        endYear: new Date("2021"),
        startMonth: 1,
        endMonth: 12,
        owner: "",
        minSeverity: 0,
        maxSeverity: 0,
    });

    const [interacted, setInteracted] = useState<IFiltersInteracted>({
        source: false,
        county: false,
        minAcres: false,
        maxAcres: false,
        burnType: false,
        startYear: false,
        endYear: false,
        startMonth: false,
        endMonth: false,
        owner: false,
        minSeverity: false,
        maxSeverity: false,
    })

    const toggleDrawer =
        (open: boolean) =>
            (event: React.KeyboardEvent | React.MouseEvent) => {
                if (
                    event.type === 'keydown' &&
                    ((event as React.KeyboardEvent).key === 'Tab' ||
                        (event as React.KeyboardEvent).key === 'Shift')
                ) {
                    return;
                }

                setIsOpen(open);
            };

    const touchFilter = (key: string) => {
        setInteracted({...interacted, [key]: true})
    }

    const handleApply = () => {
        getFiresByFilters(state, interacted)
            .then(fires => {
                console.log(fires);
                return fires;
            })
            .then(fires => props.setFireData(fires))
            .catch(err => console.error(err));
    }

    const filterImplProps = {
        setFilterState: setState,
        touchFilter: touchFilter,
        filterState: state
    }

    const list = () => (
        <Box
            sx={{width: 250, height: '100%', bgcolor: 'grey.100'}}
            role="presentation"
        >
            <List>
                <Typography align="center" variant={"h5"}>
                    All Filters
                </Typography>
                <SourceFilter {...filterImplProps}/>
                <LocationFilter {...filterImplProps}/>
                <SizeFilter {...filterImplProps}/>
                <BurnTypeFilter {...filterImplProps}/>
                <TimeFilter {...filterImplProps}/>
                <TimeMonthFilter {...filterImplProps}/>
                <OwnerFiler {...filterImplProps}/>
                <SeverityFilter {...filterImplProps}/>
                <Divider/>
                <Button variant="text" onClick={handleApply}>{"Apply Filter(s)"}</Button>
            </List>
        </Box>
    );

    return (
        <div className="filter-drawer">
            <React.Fragment key={"isOpen"}>
                <IconButton onClick={toggleDrawer(true)} aria-label={"filter"}>
                    <FilterAltOutlinedIcon/>
                </IconButton>
                <Drawer
                    anchor={"right"}
                    open={isOpen}
                    onClose={toggleDrawer(false)}
                >
                    {list()}
                </Drawer>
            </React.Fragment>
        </div>
    );
}
