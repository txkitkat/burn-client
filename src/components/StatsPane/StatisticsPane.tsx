import React from "react";
import "./StatisticsPane.css";
import Tooltip from '@mui/material/Tooltip';
interface IStatisticsPaneProps {
    counties: string[];
    statistics: string;
}

export default function StatisticsPane(props: IStatisticsPaneProps) {
    return (
        <div className="statistics-pane">
            <Tooltip title="Statistics for applied filters will be displayed here" >
                <h3>STATISTICS</h3>
            </Tooltip>
            <React.Fragment key={""}>
                <p className="statistics">{props.statistics}</p>
            </React.Fragment>
            <Tooltip title="Counties in burn window" style={{marginTop: "100px"}}>
                <h3>COUNTIES</h3>
            </Tooltip>
            <React.Fragment key={"1"}>
                {props.counties.map((county, i) => <p className="statistics">{county}</p >)}
            </React.Fragment>
        </div>
    )
}