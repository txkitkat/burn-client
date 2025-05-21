import IFeatureType from "../../types/featureType";
import MissingFeature from "../../types/missingFeature";
import { FeatureFormat, FeatureUnit } from "../FeaturesDisplay";
import { getFeatureSpecs } from "./getFeatures";

type FeatureKeys = keyof IFeatureType;

export function hasAllFeatures(features: IFeatureType | undefined | null): boolean {
  const requiredFields: FeatureKeys[] = getFeatureSpecs().map((feature) => feature[0]);    
  return features != null && requiredFields.every((key) => features[key] != null);
}

export function getMissingFeatures(features: IFeatureType | undefined | null): MissingFeature[] {
  console.log(features);
  const requiredFields: [keyof IFeatureType, string, string, FeatureFormat, FeatureUnit][] = getFeatureSpecs();
  if (features === undefined || features === null) {
    return requiredFields.map(([attribute, name, tooltip, format, unit], index) => {
      return {
        index,
        attribute,
        name,
        tooltip,
        format,
        unit
      }
    });
  }
  else {
    return requiredFields.map(([attribute, name, tooltip, format, unit], index) => {
      return {
        index,
        attribute,
        name,
        tooltip,
        format,
        unit
      }
    }).filter((x): x is MissingFeature => x !== null);
  }
}