import React from "react";
import "./StatisticsPane.css";

interface IStatisticsPaneProps{
    statistics: string;
}

export default function StatisticsPane(props: IStatisticsPaneProps) {
    return (
        <div className="statistics-pane">
            <h3>Statistics</h3>
            <React.Fragment key={""}>
                <p className="statistics">{props.statistics}</p>
            </React.Fragment>
        </div>
    )
}