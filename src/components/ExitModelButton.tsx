import "./ModelButton.css";

export interface ExitModelButtonProps {
    onExit: () => void;
}

export default function ExitModelButton(props: ExitModelButtonProps) {
    return (
        <button className="exit-model-button" onClick={props.onExit}>
            X
        </button>
    )
}