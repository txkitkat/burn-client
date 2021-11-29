import React from "react";
import "./StatisticsPane.css";
import Tooltip from '@mui/material/Tooltip';
interface IStatisticsPaneProps {
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
        </div>
    )
}