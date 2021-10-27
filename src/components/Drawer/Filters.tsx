import React from 'react';
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

interface IFiltersProps {
    setFireData: (fireData: IFire[]) => void;
}

type Anchor = 'top' | 'left' | 'bottom' | 'right';

export default function Filters(props: IFiltersProps) {
    const [state, setState] = React.useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
    });

    const toggleDrawer =
        (anchor: Anchor, open: boolean) =>
            (event: React.KeyboardEvent | React.MouseEvent) => {
                if (
                    event.type === 'keydown' &&
                    ((event as React.KeyboardEvent).key === 'Tab' ||
                        (event as React.KeyboardEvent).key === 'Shift')
                ) {
                    return;
                }

                setState({...state, [anchor]: open});
            };

    const list = (anchor: Anchor) => (
        <Box
            sx={{width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250, height: '100%', bgcolor: 'grey.100'}}
            role="presentation"
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <List>
                <Typography align="center">
                    <h3>All Filters</h3>
                </Typography>
                <SourceFilter setFireData={props.setFireData}/>
                {/*TODO Add your filters here modelled after the SourceFilter*/}

                <Divider/>
                {/*No need to add any more dividers in this scope. The only change you need make is add Filters*/}
            </List>
        </Box>
    );

    return (
        <div className="filter-drawer">
            {(['right'] as const).map((anchor) => (
                <React.Fragment key={anchor}>
                    <IconButton onClick={toggleDrawer(anchor, true)} aria-label={"filter"}>
                        <FilterAltOutlinedIcon/>
                    </IconButton>
                    <Drawer
                        anchor={anchor}
                        open={state[anchor]}
                        onClose={toggleDrawer(anchor, false)}
                    >
                        {list(anchor)}
                    </Drawer>
                </React.Fragment>
            ))}
        </div>
    );
}
