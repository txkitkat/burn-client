import React, {useState} from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
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
import FireTypeFilter from "./FireTypeFilter";
import Button from "@mui/material/Button";
import {downloadFireWindow, getFiresByFilters, getFireStatistics} from "../../service/burnService";
import {Checkbox} from '@mui/material';
import FormControlLabel from '@mui/material/FormControlLabel';
import Tooltip from '@mui/material/Tooltip';

interface IFiltersProps {
    setFireData: (fireData: IFire[]) => void;
    setStatistics: (statistics: string) => void;
}

export interface IFilterImplProps {
    setFilterState: (newState: IFiltersState) => void;
    touchFilter: (key: string) => void;
    touchTwoFilters: (key1: string, key2: string) => void;
    filterState: IFiltersState
}

export interface IFiltersState {
    source: string
    county: string
    minAcres: number
    maxAcres: number
    burnType: string
    startYear: number
    endYear: number
    startMonth: number
    endMonth: number
    owner: string
    minSeverity: number
    maxSeverity: number
    fireType: string
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
    fireType: boolean
}

export default function Filters(props: IFiltersProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [state, setState] = useState<IFiltersState>({
        source: "",
        county: "",
        minAcres: 0,
        maxAcres: 0,
        burnType: "",
        startYear: 2010,
        endYear: 2020,
        startMonth: 0,
        endMonth: 11,
        owner: "",
        minSeverity: 0,
        maxSeverity: 0,
        fireType: "PRESCRIBED"
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
        fireType: true
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

    const touchTwoFilters = (key1: string, key2: string) => {
        setInteracted({...interacted, [key1]: true, [key2]: true});
    }

    const removeInapplicableFilters = () => {
        if (state.fireType === "ESCAPED") {
            setInteracted({...interacted, "burnType": false});
            setState({...state, "source": "CALFIRE"});
        }
    }

    const [filtersDescription, setFiltersDescription] = useState("");

    const createFiltersDescription = () => {
        let descString = "";
        for (const key in state) {
            // @ts-ignore
            if (interacted[key]) {
                // @ts-ignore
                descString = descString + "\n" + key + ": " + state[key];
            }
        }
        setFiltersDescription(descString);
    }


    const handleApply = () => {
        const FileDownload = require("js-file-download");

        removeInapplicableFilters();
        createFiltersDescription();
        getFiresByFilters(state, interacted)
            .then(fires => {
                console.log(fires);
                return fires;
            })
            .then(fires => {
                if (checkedShowStatistics) {
                    getFireStatistics(state, interacted)
                        .then(fireStats => {
                            console.log(fireStats)
                            let statsDisplay = "For Applied Filter: \n Fire(s) Count: " + fireStats.numFires
                                + "\n Start Year: " + fireStats.minYear + "\n End Year: " + fireStats.maxYear + "\n Average Size: " + fireStats.avgSize.toFixed(2) + "\n Minimum Size: " + fireStats.minSize.toFixed(3) + "\n Maximum Size: " + fireStats.maxSize.toFixed(2)
                            props.setStatistics(statsDisplay);
                        }).catch(err => {
                        console.log(err);
                        props.setStatistics("For Applied Filter: No statistics available");
                    })

                } else {
                    props.setStatistics("");
                }

                return fires;
            })
            .then(fires => props.setFireData(fires))
            .then(() => {
                if (checkedDownloadRaster) {
                    let baseDate = new Date(1979, 0, 0);
                    let startDate = new Date(state.startYear, state.startMonth - 1, 0);
                    let endDate;
                    if (state.endMonth === 12)
                        endDate = new Date(state.endYear + 1, 0, 0);
                    else
                        endDate = new Date(state.endYear, state.endMonth, 0);

                    downloadFireWindow((startDate.getTime() - baseDate.getTime()) / (1000 * 3600 * 24),
                        (endDate.getTime() - baseDate.getTime()) / (1000 * 3600 * 24)).then((data) => {
                        return data.data
                    }).then((data: any) => FileDownload(new Blob([data]), "window.nc"));
                }
            })
            .catch(err => console.error(err));
    }

    const [checkedShowStatistics, setCheckedShowStatistics] = React.useState(false);
    const [checkedDownloadRaster, setCheckedDownloadRaster] = React.useState(false);

    const handleShowStatistics = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCheckedShowStatistics(event.target.checked)
    }

    const handleDownloadRaster = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCheckedDownloadRaster(event.target.checked)
    }

    const filterImplProps = {
        setFilterState: setState,
        touchFilter: touchFilter,
        touchTwoFilters: touchTwoFilters,
        filterState: state
    }

    const list = () => (

        <Box
            sx={{width: 250, height: '100%', bgcolor: 'grey.100'}}
            role="presentation">

            <List>
                <Typography align="center" variant={"h5"}>
                    All Filters
                </Typography>
                <Typography align="center" variant={"body2"} color="blue" fontStyle="italic">
                    Select from the Filter Options below
                </Typography>
                <Typography align="center" variant={"body2"} color="blue" fontStyle="italic">
                    Click on Apply Filter(s) when finished
                </Typography>
                <FireTypeFilter {...filterImplProps} />
                <SourceFilter {...filterImplProps} />
                <LocationFilter {...filterImplProps} />
                <SizeFilter {...filterImplProps} />
                <BurnTypeFilter {...filterImplProps} />
                <TimeFilter {...filterImplProps} />
                <TimeMonthFilter {...filterImplProps} />
                <OwnerFiler {...filterImplProps} />
                {/* <SeverityFilter {...filterImplProps} /> */}
                <Divider/>
                <FormControlLabel control={<Checkbox onChange={handleShowStatistics}/>} label="Show statistics"
                                  labelPlacement="end"/>
                <FormControlLabel control={<Checkbox onChange={handleDownloadRaster}/>}
                                  label="Download Burn Window Raster for Time Frame" labelPlacement="end"/>
                <Button variant="text" onClick={handleApply}>{"Apply Filter(s)"}</Button>
            </List>
        </Box>
    );

    return (
        <div className="filter-drawer">
            <React.Fragment key={"isOpen"}>
                <Tooltip title="Select from multiple filter categories" arrow>
                    <Button variant="contained" onClick={toggleDrawer(true)}>
                        Filters
                    </Button>
                </Tooltip>
                <Typography variant="body2" color="blue" align="center">
                    <strong>Filters Applied</strong>
                </Typography>
                <Tooltip title="Months if specified will be in range 0-11" arrow>
                    <Typography variant="body2" color="blue" fontStyle="italic" align="center">
                        {filtersDescription}
                    </Typography>
                </Tooltip>
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
