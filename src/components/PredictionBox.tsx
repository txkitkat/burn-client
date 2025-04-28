import "./PredictionBox.css";

export default function PredictionBox (props: {confidence: number, predicted_reach: number}) {
    return (
    <div className="dialogue_box"> 
        <strong style={{fontSize: "18px"}}>Escaped Fire Prediction</strong> 
        <p><strong>Model confidence</strong>: {(props.confidence*100).toFixed(2)}%</p>
        <p><strong>Estimated reach:</strong> {(props.predicted_reach).toFixed(2)} acres</p>
    </div>
    )
}