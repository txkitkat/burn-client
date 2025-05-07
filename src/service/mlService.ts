import axios, { AxiosError, AxiosResponse } from "axios";
import IFeatureType from "../types/featureType";

const mlHost: any = process.env.REACT_APP_FIRE_ML_BACKEND;

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

export async function getModelPrediction(latitude: number, longitude: number, date: Date): Promise<IPrediction> {
    const query = `${mlHost}/query?latitude=${latitude}&longitude=${longitude}&date=${date.toString()}`;
    console.log(query);
    
    return await axios.post(query)
        .then((response: AxiosResponse<any>) => {
            const data: JSON = response.data;

            if (response.status === 200 && data && 'spread' in data && typeof data.spread === 'number' && 'confidence' in data && typeof data.confidence === 'number' && 'features' in data) {
                return { acreage: data.spread, confidence: data.confidence, features: data.features! };
            }
            else {
                // Throw an error here, but for now return a static value.
                console.log(response);
                return samplePrediction;
            }
        })
        .catch((error: AxiosError) => {
            // We'll need to show an error here. But for now, we'll return a static value.
            console.log(error);
            return samplePrediction;
        })
        .finally(() => {
            return samplePrediction;
        })
}