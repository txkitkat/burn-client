import IFeatureType from "../../types/featureType";

export default function hasAllFeatures(features: IFeatureType | undefined | null): boolean {
    type FeatureKeys = keyof IFeatureType;

    const requiredFields: FeatureKeys[] = [
      'climateAvg',
      'climateMin',
      'climateMax',
      'climateHumidity',
      'climatePrecip',
      'climateWindSpd',
      'elevationAvg',
      'elevationMin',
      'elevationMax',
      'elevationStd',
      'vegetationCover',
      'vegetationDeparture',
      'vegetationHeight'
    ];
        
    return features != null && requiredFields.every((key) => features[key] != null);
}