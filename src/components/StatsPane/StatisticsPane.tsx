import React from "react";
import "./StatisticsPane.css";
import Tooltip from '@mui/material/Tooltip';
import {Grid} from "@mui/material";
interface IStatisticsPaneProps {
    counties: string[];
    statistics: string;
}

export default function StatisticsPane(props: IStatisticsPaneProps) {
    return (
        <div className="statistics-pane" style={{ overflow: "auto" }}>
            <Tooltip title="Statistics for applied filters will be displayed here" >
                <h3>STATISTICS</h3>
            </Tooltip>
            <React.Fragment key={""}>
                <div className="statistics">{props.statistics}</div>
            </React.Fragment>
            <Tooltip title="Counties in burn window" style={{marginTop: "100px"}}>
                <h3>COUNTIES</h3>
            </Tooltip>
            <Grid className="statistics-counties" container spacing={2}>
                <Grid item xs={6}>
                    <Tooltip title="Counties in burn window" >
                        <p>County</p >
                    </Tooltip>
                </Grid>
                <Grid item xs={6}>
                    <Tooltip title="Percentage of area that is in burn window for at least one day" >
                        <p>Percentage</p >
                    </Tooltip>
                </Grid>
            </Grid>
            <React.Fragment key={"1"}>
                {props.counties.map((county, i) => <pre className="statistics-counties-percentages">{county}</pre >)}
            </React.Fragment>
        </div>
    )
}