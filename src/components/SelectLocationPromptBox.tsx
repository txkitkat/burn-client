import "./SelectLocationPromptBox.css";

export default function SelectLocationPromptBox() {
    return (
        <div className="prompt">
            <strong style={{fontSize: 18}}>Please select a location</strong>
            <div style={{fontSize: 18}}>to model a prescribed fire.</div>
        </div>
    )
}