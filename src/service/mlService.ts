import axios, { AxiosError, AxiosResponse } from "axios";
import IFeatureType from "../types/featureType";

const mlHost: string | undefined = process.env.REACT_APP_FIRE_WINDOW_BACKEND;

export interface IPrediction {
    acreage: number;
    confidence: number;
    features?: IFeatureType;
}

const samplePrediction: IPrediction = {
    acreage: 50,
    confidence: .50,
    features: {
       elevationAvg: 40,
       elevationMin: 20,
       elevationMax: 60,
       elevationStd: 10,
       climateAvg: 70,
       climateMin: 50,
       climateMax: 80,
       climateHumidity: .20,
       climatePrecip: 5,
       climateWindSpd: 15,
       vegetationCover: .50,
       vegetationHeight: 3,
       vegetationDeparture: .20
    }
}

const partialPrediction: IPrediction = {
    acreage: -1,
    confidence: -1,
    features: {
       elevationAvg: 40,
       elevationMin: 20,
       elevationMax: 60,
       elevationStd: 10,
       vegetationCover: .50,
       vegetationHeight: 3,
       vegetationDeparture: .20
    }
}

export async function getModelPrediction(latitude: number, longitude: number, date: Date, overrideFeatures: IFeatureType, testing: boolean = false): Promise<IPrediction> {
    const query = mlHost?.toString() + "/predict";
    console.log(query);
    
    return await axios.post(query!, {
                latitude,
                longitude,
                year: date.getFullYear().toString(),
                month: date.getMonth().toString(),
                day: date.getDate().toString(),
                overrideFeatures
            }).then((response: AxiosResponse<any>) => {
                console.log(response);
            const data: JSON = response.data;

            if (response.status === 200 && data && 'predicted_acreage' in data && typeof data.predicted_acreage === 'number' && 'confidence' in data && typeof data.confidence === 'number' && 'features' in data) {
                console.log("Here!");
                return { acreage: data.predicted_acreage, confidence: data.confidence, features: data.features! };
            }
            else {
                // Throw an error here, but for now return a static value.
                console.log("Uh-oh!");
                return testing ? partialPrediction : samplePrediction;
            }
        })
        .catch((error: AxiosError) => {
            // We'll need to show an error here. But for now, we'll return a static value.
            console.log(error);
            return testing ? partialPrediction : samplePrediction;
        })
        .finally(() => {
            return testing ? partialPrediction : samplePrediction;
        });
}