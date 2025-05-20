import { ReactElement } from "react";
import "./PredictionBox.css";

export default function PredictionBox (props: {confidence: number, predicted_reach: number}) {
    const formatEscapeChance = (confidence: number): ReactElement => {
        if (confidence > .95) {
            return <span className="high-risk">{">95%"}</span>;
        }
        if (confidence < .05) {
            return <span className="low-risk">{"<5%"}</span>;
        }
        return <strong className="mid-risk">{(confidence*100).toFixed(2)}%</strong>;
    }

    return (
        <div className="dialogue_box"> 
            <strong style={{fontSize: "18px", textJustify: "inherit"}}>Escaped Fire Prediction</strong> 
            <p><strong>Chance of Escape</strong>: {formatEscapeChance(props.confidence)}</p>
            <p><strong>Estimated reach</strong>: {(props.predicted_reach).toFixed(2)} acres</p>
        </div>
    )
}