import { ChangeEvent } from "react";
import IFeatureType from "../types/featureType"
import "./FeaturesDisplay.css"

export interface FeaturesDisplayProps {
    features?: IFeatureType;
    setFeatures: (features: IFeatureType) => void;
    showErrors: boolean;
};

enum FeatureFormat {
    Integer,
    Decimal,
    Percentage
}

enum FeatureUnit {
    Feet,
    Fahrenheit,
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
            return (value * 100).toFixed(2);
    }
}

const getUnitString = (unit: FeatureUnit): string => {
    switch (unit) {
        case (FeatureUnit.Feet):
            return " ft";
        case (FeatureUnit.Fahrenheit):
            return "F°";
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
            ["climateAvg", "Average Temperature", features.climateAvg, "The average temperature in Fahrenheit for this latitude and longitude.", FeatureFormat.Integer, FeatureUnit.Fahrenheit],
            ["climateMin", "Low Temperature", features.climateMin, "The lowest temperature for the day on this latitude and longitude, in Fahrenheit.", FeatureFormat.Integer, FeatureUnit.Fahrenheit],
            ["climateMax", "High Temperature", features.climateMax, "The highest temperature for the day on this latitude and longitude, in Fahrenheit.", FeatureFormat.Integer, FeatureUnit.Fahrenheit],
            ["climateHumidity", "Average Humidity", features.climateHumidity, "The average humidity for the day on this latitude and longitude.", FeatureFormat.Percentage, FeatureUnit.None],
            ["climatePrecip", "Average Precipitation", features.climatePrecip, "The average precipitation for this day on this latitude and longitude.", FeatureFormat.Decimal, FeatureUnit.Inches],
            ["climateWindSpd", "Average Wind Speed", features.climateWindSpd, "The average wind speed for this day on this latitude and longitude.", FeatureFormat.Decimal, FeatureUnit.Mph],
            ["vegetationCover", "Vegetation Cover", features.vegetationCover, "The percent coverage of vegetation on the latitude and longitude.", FeatureFormat.Percentage, FeatureUnit.None],
            ["vegetationHeight", "Vegetation Height", features.vegetationHeight, "The average vegetation height on the latitude and longitude.", FeatureFormat.Decimal, FeatureUnit.Meters],
            ["vegetationDeparture", "Vegetation Departure", features.vegetationDeparture, "The average departure of vegetation from the area.", FeatureFormat.Percentage, FeatureUnit.None] // NEEDS REVIEW
        ]
    }

    if (!props.features)
        return null;

    const handleChange = (attribute: string, value: number | undefined) => {
        console.log(value);
        if (!value)
            return;

        props.setFeatures({
            ...props.features,
            [attribute]: value
        })
    }

    return (
        <div className="features_box"> 
            {getCurrentFeatures(props.features!)?.map(([attribute, label, value, tooltip, format, unit]: [string, string, number | undefined, string, FeatureFormat, FeatureUnit]) => {
                //if (value) return <p className="feature_text"><strong>{label}</strong>: {getFormatString(value, format) + getUnitString(unit)}</p>
                
                return <p className="feature_text">
                    <strong>{label}</strong>: <input 
                        className={value === undefined ? "input-error" : "feature-input"}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(attribute, parseFloat(e.target.value))} 
                        value={value}
                        defaultValue={value ? getFormatString(value, format) : undefined}
                        placeholder="Enter feature" 
                    />{getUnitString(unit)}
                </p>
            })}
        </div>
    )
}