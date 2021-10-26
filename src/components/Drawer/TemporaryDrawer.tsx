import React, {useState} from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import IconButton from "@mui/material/IconButton";
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Typography from '@mui/material/Typography';

import "./TemporaryDrawer.css";

type Anchor = 'top' | 'left' | 'bottom' | 'right';

export default function TemporaryDrawer() {
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

      setState({ ...state, [anchor]: open });
    };
    const [dropDownDataset, setDropDownDataset] = useState(false);
    const [dropDownTime, setDropDownTime] = useState(false);
  const [dataset, setDataset] = React.useState('');
  const [time, setTime] = React.useState('');


  const handleChangeDataset = (event: SelectChangeEvent) => {
    setDataset(event.target.value as string);
  };

  const handleChangeTime = (event: SelectChangeEvent) => {
    setTime(event.target.value as string);
  };


  const list = (anchor: Anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 , height: '100%', bgcolor: 'grey.100'}}
      role="presentation"
      //onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
          <Typography align="center">
            <h3> All filters</h3>
          </Typography>
        <Divider/>
          <ListItem button key={"Sort by Dataset"} onClick = {()=> setDropDownDataset(!dropDownDataset)}>
          <ListItemText primary={"Sort by Dataset"} inset />
          {dropDownDataset? <ExpandLess/>: <ExpandMore/>}
          </ListItem>
          <Collapse in={dropDownDataset} timeout="auto" unmountOnExit>
            <ListItem alignItems="center">
            <FormControl sx={{minWidth: 120}} variant="filled" color="primary">
        <InputLabel id="demo-simple-select-label">Dataset</InputLabel>
        <Select
          labelId="dataset-select-label"
          id="dataset-select"
          value={dataset}
          label="Dataset"
          autoWidth
          onChange={handleChangeDataset}
        >
          <MenuItem value={"CALFIRES"}>CALFIRES</MenuItem>
          <MenuItem value={"PFIRx"}>PFIRx</MenuItem>
          <MenuItem value={"MTBS"}>MTBS</MenuItem>
        </Select>
      </FormControl>
      </ListItem>
          </Collapse>
          <Divider />

          <ListItem button key={"Sort by Time"} onClick = {()=> setDropDownTime(!dropDownTime)}>
          <ListItemText primary={"Sort by Time"} inset />
          {dropDownTime? <ExpandLess/>: <ExpandMore/>}
          </ListItem>
          <Collapse in={dropDownTime} timeout="auto" unmountOnExit>
            <ListItem alignItems="center">
            <FormControl sx={{minWidth: 120}} variant="filled" color="primary">
        <InputLabel id="time-select-label-label">Time</InputLabel>
        <Select
          labelId="time-select-label"
          id="time-select"
          value={time}
          label="time"
          autoWidth
          onChange={handleChangeTime}
        >
          <MenuItem value={"DUMMY-TIME1"}>DUMMY TIME 1</MenuItem>
          <MenuItem value={"DUMMY-TIME2"}>DUMMY TIME 2</MenuItem>
          <MenuItem value={"DUMMY-TIME3"}>DUMMY TIME 3</MenuItem>
        </Select>
      </FormControl>
      </ListItem>
          </Collapse>
          <Divider />

      </List>
      <List>
        <ListItem alignItems="center">
      <Button variant="contained" onClick={toggleDrawer(anchor, false)}>Apply filter</Button>
      </ListItem>
      </List>
    </Box>
  );

  return (
    <div className="temporary-drawer">
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
