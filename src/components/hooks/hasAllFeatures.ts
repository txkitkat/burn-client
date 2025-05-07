import IFeatureType from "../../types/featureType";

export default function hasAllFeatures(features: IFeatureType | undefined | null): boolean {
    console.log(Boolean(features &&
        features.climateAvg &&
        features.climateMin &&
        features.climateMax &&
        features.climateHumidity &&
        features.climatePrecip &&
        features.climateWindSpd &&
        features.elevationAvg &&
        features.elevationMin &&
        features.elevationMax &&
        features.elevationStd &&
        features.vegetationCover &&
        features.vegetationDeparture &&
        features.vegetationHeight));
        
    return Boolean(features &&
        features.climateAvg &&
        features.climateMin &&
        features.climateMax &&
        features.climateHumidity &&
        features.climatePrecip &&
        features.climateWindSpd &&
        features.elevationAvg &&
        features.elevationMin &&
        features.elevationMax &&
        features.elevationStd &&
        features.vegetationCover &&
        features.vegetationDeparture &&
        features.vegetationHeight);
}