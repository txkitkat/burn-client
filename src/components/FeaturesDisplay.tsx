import { ChangeEvent } from "react";
import IFeatureType from "../types/featureType"
import "./FeaturesDisplay.css"

export interface FeaturesDisplayProps {
    features?: IFeatureType;
    featureOverrides: (string | null)[];
    date: Date;
    setFeatures: (features: IFeatureType) => void;
    setFeatureOverrides: (featureOverrides: (string | null)[]) => void;
    setDate: (date: Date) => void;
    showErrors: boolean;
};

export enum FeatureFormat {
    Integer,
    Decimal,
    Percentage
}

export enum FeatureUnit {
    Feet,
    Fahrenheit,
    Celcius,
    None,
    Inches,
    Mph,
    Meters,
    Percentage
}

const getFormatString = (value: number, format: FeatureFormat): string => {
    switch (format) {
        case (FeatureFormat.Integer):
            return value.toFixed(0);
        case (FeatureFormat.Decimal):
            return value.toFixed(2);
        case (FeatureFormat.Percentage):
            return value.toFixed(1);
    }
}

const getUnitString = (unit: FeatureUnit): string => {
    switch (unit) {
        case (FeatureUnit.Feet):
            return " ft";
        case (FeatureUnit.Fahrenheit):
            return " F°";
        case (FeatureUnit.Celcius):
            return " C°";
        case (FeatureUnit.Inches):
            return " in";
        case (FeatureUnit.Meters):
            return " m";
        case (FeatureUnit.Mph):
            return "mph";
        case (FeatureUnit.Percentage):
            return "%";
        default:
            return "";
    }
}

export default function FeaturesDisplay(props: FeaturesDisplayProps) {
    const getCurrentFeatures = (features: IFeatureType | undefined): null | [string, string, number | undefined, string, FeatureFormat, FeatureUnit][] => {
        if (!features) {
            console.log("Features are null");
            return null;
        }

        console.log("Features aren't null")
        return [
            ["elevationAvg", "Elevation Average", features.elevationAvg, "The average elevation for this latitude and longitude.", FeatureFormat.Integer, FeatureUnit.Feet],
            ["elevationMin", "Elevation Min", features.elevationMin, "The minimum elevation for this latitude and longitude.", FeatureFormat.Integer, FeatureUnit.Feet],
            ["elevationMax", "Elevation Max", features.elevationMax, "The maximum elevation for this latitude and longitude.", FeatureFormat.Integer, FeatureUnit.Feet],
            ["elevationStd", "Elevation Std Dev", features.elevationStd, "The standard deviation for this latitude and longitude.", FeatureFormat.Integer, FeatureUnit.Feet],
            ["climateAvg", "Average Temperature", features.climateAvg, "The average temperature in Fahrenheit for this latitude and longitude.", FeatureFormat.Decimal, FeatureUnit.Celcius],
            ["climateMin", "Low Temperature", features.climateMin, "The lowest temperature for the day on this latitude and longitude, in Fahrenheit.", FeatureFormat.Decimal, FeatureUnit.Celcius],
            ["climateMax", "High Temperature", features.climateMax, "The highest temperature for the day on this latitude and longitude, in Fahrenheit.", FeatureFormat.Decimal, FeatureUnit.Celcius],
            ["climateHumidity", "Average Humidity", features.climateHumidity, "The average humidity for the day on this latitude and longitude.", FeatureFormat.Percentage, FeatureUnit.Percentage],
            ["climatePrecip", "Average Precipitation", features.climatePrecip, "The average precipitation for this day on this latitude and longitude.", FeatureFormat.Decimal, FeatureUnit.Inches],
            ["climateWindSpd", "Average Wind Speed", features.climateWindSpd, "The average wind speed for this day on this latitude and longitude.", FeatureFormat.Decimal, FeatureUnit.Mph],
            ["vegetationCover", "Vegetation Cover", features.vegetationCover, "The percent coverage of vegetation on the latitude and longitude.", FeatureFormat.Percentage, FeatureUnit.Percentage],
            ["vegetationHeight", "Vegetation Height", features.vegetationHeight, "The average vegetation height on the latitude and longitude.", FeatureFormat.Decimal, FeatureUnit.Meters],
            ["vegetationDeparture", "Vegetation Departure", features.vegetationDeparture, "The average departure of vegetation from the area.", FeatureFormat.Percentage, FeatureUnit.Percentage]
        ]
    }

    if (!props.features)
        return null;

    const handleChange = (index: number, value: string | undefined) => {
        if (value === undefined)
            return;

        const newFeatureOverrides = [...props.featureOverrides];
        newFeatureOverrides[index] = value;
        props.setFeatureOverrides(newFeatureOverrides);
    }

    const handleCheck = (value: number, index: number, format: FeatureFormat) => {
        console.log("Checked!");
        const newFeatureOverrides = [...props.featureOverrides];
        newFeatureOverrides[index] = props.featureOverrides[index] !== null ? null : getFormatString(value, format);
        props.setFeatureOverrides(newFeatureOverrides);
    }

    return (
        <div className="features_box">
            <div className="date-line">
                <label className="date-label">Select Date: </label>
                <input
                    type="date"
                    value={props.date.toISOString().split("T")[0]}
                    onChange={(e) => props.setDate(new Date(e.target.value))}
                />
            </div>
            {getCurrentFeatures(props.features!)?.map(([attribute, label, value, tooltip, format, unit], index) => {
                return <p className="feature_text">
                    <input type="checkbox" checked={props.featureOverrides[index] !== null} onChange={() => handleCheck(value!, index, format)} />
                    {props.featureOverrides[index] !== null ? 
                        <>
                            <strong>{label}</strong>: <input 
                                className={value === undefined ? "input-error" : "feature-input"}
                                onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(index, e.target.value)} 
                                value={props.featureOverrides[index] || ""}
                                placeholder="Enter feature" 
                            />{getUnitString(unit)}
                        </> :
                        <>
                            <strong>{label}</strong>: <span 
                                className={value === undefined ? "input-error" : "feature-input"}
                                onClick={() => handleCheck(value!, index, format)}
                            >{getFormatString(value!, format)}</span>{getUnitString(unit)}
                        </>
                    }
                </p>
            })}
        </div>
    )
}