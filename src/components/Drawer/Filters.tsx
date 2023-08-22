import React, {useState, useRef} from 'react';
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
import {downloadFireWindow, getFiresByFilters, getFireStatistics, query_counties} from "../../service/burnService";
import {Checkbox} from '@mui/material';
import FormControlLabel from '@mui/material/FormControlLabel';
import Tooltip from '@mui/material/Tooltip';
import ReactLoading from "react-loading";


interface IFiltersProps {
    setFireData: (fireData: IFire[]) => void;
    setStatistics: (statistics: string) => void;
    updateBurnWindow: () => void;
    resetBurnWindow: () => void;
    setCounties: (counties: string[]) => void;
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
    const [isLoading, setIsLoading] = useState(false)
    const [isOpen, setIsOpen] = useState(false);
    const [state, setState] = useState<IFiltersState>({
        source: "",
        county: "",
        minAcres: 0,
        maxAcres: 0,
        burnType: "",
        startYear: 1900, //Earliest Fire Data By Default
        endYear: 2023,
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

        setIsLoading(true)

        removeInapplicableFilters();
        createFiltersDescription();
        getFiresByFilters(state, interacted)
            .then(fires => {
                console.log(fires);

                if(!checkedShowStatistics && !checkedDownloadRaster) setIsLoading(false);

                return fires;
            })
            .then(fires => {
                if (checkedShowStatistics) {
                    getFireStatistics(state, interacted)
                        .then(fireStats => {
                            console.log(fireStats)
                            let statsDisplay = "For Applied Filter:\nFire(s) Count: " + fireStats.numFires
                                + "\nStart Year: " + fireStats.minYear + "\nEnd Year: " + fireStats.maxYear + "\nAvg Size: " + fireStats.avgSize.toFixed(2) + " acres\nMin Size: " + fireStats.minSize.toFixed(3) + " acres\nMax Size: " + fireStats.maxSize.toFixed(2) + " acres"
                            props.setStatistics(statsDisplay);
                        }).catch(err => {
                        console.log(err);
                        props.setStatistics("For Applied Filter: No statistics available");
                    })

                } else {
                    props.setStatistics("");
                }

                if(!checkedDownloadRaster) setIsLoading(false)

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

                    let startDateInSeconds = Math.floor((startDate.getTime() - baseDate.getTime()) / (1000 * 3600 * 24));
                    let endDateInSeconds = Math.ceil((endDate.getTime() - baseDate.getTime()) / (1000 * 3600 * 24));

                    downloadFireWindow(startDateInSeconds, endDateInSeconds)
                    .then((data) => { return data.data})
                    .then((data: any) => props.resetBurnWindow())
                    .then((data: any) => props.updateBurnWindow())
                    .then(() => setIsLoading(false));
                }
            })
            .catch(err => console.error(err));
    }

    const [checkedShowStatistics, setCheckedShowStatistics] = React.useState(false);
    const [checkedDownloadRaster, setCheckedDownloadRaster] = React.useState(true);

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
                <FormControlLabel sx={{ margin: 1 }} control={<Checkbox onChange={handleShowStatistics}/>} 
                                  label="Show statistics" labelPlacement="end"/>
                <FormControlLabel sx={{ margin: 1 }} control={<Checkbox onChange={handleDownloadRaster}/>}
                                  checked={checkedDownloadRaster} label="Show Burn Window Raster for Time Frame" labelPlacement="end"/>
                <Button className = "apply-filter-button" variant="text" onClick={handleApply}>{"Apply Filter(s)"}</Button>
                {isLoading == true && <ReactLoading className = "burn-window-loading" type="spin" color="blue" height={35} width={30} />}
            </List>
        </Box>
    );

    const [date, setDate] = useState('');
    const dateInputRef = useRef(null);
    const [date2, setDate2] = useState('');
    const date2InputRef = useRef(null);
    const toDate = (date: string) => Math.floor((new Date(date).getTime() - (new Date(1979, 0, 0)).getTime()) / (1000 * 3600 * 24));
    const handleWindow = () => {
        setIsLoading(true);
        query_counties(toDate(date), toDate(date2)).then((data)=>props.setCounties(data.data)).then(() => console.log("DATE2: " + date2));
        if (checkedDownloadRaster) {
            downloadFireWindow(toDate(date), toDate(date2))
            .then((data) => props.resetBurnWindow())
            .then((data) => props.updateBurnWindow())
            .then(() => setIsLoading(false));
        }
    }
    const [hideFire, setHideFire] = useState(false);

    return (
        <div className="filter-drawer">
            <React.Fragment key={"isOpen"}>
                <Tooltip title="Select from multiple filter categories" arrow>
                    <Button className = "filter-button" variant="contained" onClick={toggleDrawer(true)}>
                        Filters
                    </Button>
                </Tooltip>
                <Typography variant="body2" color="blue" align="center">
                    <strong>Filters Applied</strong>
                </Typography>
            
                <Typography variant="body2" color="blue" fontStyle="italic" align="center">
                    <div className = "filtersDescription">{filtersDescription}</div>
                </Typography>
                
                <Button className='burn-window' variant="contained">Burn Window</Button>
                <p>Start Date</p>
                <input className='date-change' type="date" onChange={(e) => setDate(e.target.value)} ref={dateInputRef} />
                <p>End Date</p>
                <input className='date-change' type="date" onChange={(e) => setDate2(e.target.value)} ref={date2InputRef} />
                <Tooltip title="Search counties in burn window during a time period" arrow>
                    <Button className = "filter-button"
                            variant="contained"
                            onClick={() => handleWindow()}
                            disabled = {date == '' || date2 == '' || toDate(date2) < toDate(date)}>
                        Search
                    </Button>
                </Tooltip>
                <FormControlLabel sx={{ marginLeft: 1 }} control={<Checkbox onChange={handleDownloadRaster}/>} checked={checkedDownloadRaster} 
                                  label={<Box component="div" fontSize={12}>Show Burn Window Raster</Box>} labelPlacement="end"/>
                {isLoading == true && <ReactLoading className = "burn-window-loading" type="spin" color="blue" height={35} width={30} />}
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
