import { useState, ChangeEvent } from "react";
import { FeatureFormat, FeatureUnit } from "./FeaturesDisplay";
import IFeatureType from "../types/featureType";

export interface MissingFeature {
    index: number;
    attribute: keyof IFeatureType;
    name: string;
    tooltip: string;
    format: FeatureFormat;
    unit: FeatureUnit;
}

export interface InputtedFeature extends MissingFeature {
    value: number;
}

interface MissingFeaturesDialogProps {
    missingFeatures: MissingFeature[];
    onSubmit: (features: InputtedFeature[]) => void;
}

const getUnitString = (unit: FeatureUnit): string => {
    switch (unit) {
        case FeatureUnit.Feet: return " ft";
        case FeatureUnit.Fahrenheit: return " F°";
        case FeatureUnit.Celcius: return " C°";
        case FeatureUnit.Inches: return " in";
        case FeatureUnit.Meters: return " m";
        case FeatureUnit.Mph: return "mph";
        case FeatureUnit.Percentage: return "%";
        default: return "";
    }
};

export default function MissingFeaturesDialog(props: MissingFeaturesDialogProps) {
    const [values, setValues] = useState<{ [index: number]: string }>(() => {
        const initial: { [index: number]: string } = {};
        props.missingFeatures.forEach((f) => {
            initial[f.index] = "";
        });
        return initial;
    });

    const handleChange = (index: number, value: string) => {
        setValues((prev) => ({ ...prev, [index]: value }));
    };

    const handleSubmit = () => {
        const features: InputtedFeature[] = [];

        for (const feature of props.missingFeatures) {
            const raw = values[feature.index];
            const num = Number(raw);

            if (raw.trim() === "" || isNaN(num)) {
                alert(`Invalid input for "${feature.name}". Please enter a valid number.`);
                return;
            }

            features.push({ ...feature, value: num });
        }

        props.onSubmit(features);
    };

    return (
        <div style={styles.container}>
            <div style={styles.formContainer}>
                <h2>Enter Missing Features</h2>
                <p>Some features for the selected date and location couldn't be found. Please enter these features' values.</p>

                {props.missingFeatures.map(({ index, name, tooltip, unit }) => (
                    <div key={index} style={{ marginBottom: '1rem' }}>
                        <label title={tooltip}>
                            <strong>{name}</strong>: 
                        </label>
                        <input
                            type="text"
                            placeholder="Enter value"
                            value={values[index]}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(index, e.target.value)}
                            style={styles.input}
                        />
                        <span>{getUnitString(unit)}</span>
                    </div>
                ))}

                <button onClick={handleSubmit} style={styles.button}>Submit</button>
            </div>
        </div>
    );
}

const styles: { [key: string]: React.CSSProperties } = {
    container: {
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    formContainer: {
        backgroundColor: '#fff',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        textAlign: 'center',
        maxWidth: '400px',
        width: '90%',
    },
    input: {
        padding: '10px',
        marginLeft: '10px',
        borderRadius: '5px',
        border: '1px solid #ccc',
        width: '150px',
    },
    button: {
        marginTop: '20px',
        padding: '10px 20px',
        borderRadius: '5px',
        border: 'none',
        backgroundColor: '#007BFF',
        color: 'white',
        cursor: 'pointer',
    },
};
