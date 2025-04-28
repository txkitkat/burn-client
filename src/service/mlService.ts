import axios, { AxiosError, AxiosResponse } from "axios";
import { STATUS_CODES } from "http";

const mlHost: any = process.env.REACT_APP_FIRE_ML_BACKEND;

export interface IPrediction {
    acreage: number;
    confidence: number;
}

export async function getModelPrediction(latitude: number, longitude: number, date: Date): Promise<IPrediction> {
    const query = `${mlHost}/query?latitude=${latitude}&longitude=${longitude}&date=${date.toString()}`;
    console.log(query);
    
    return await axios.post(query)
        .then((response: AxiosResponse<any>) => {
            const data: JSON = response.data;

            if (response.status === 200 && data && 'spread' in data && typeof data.spread === 'number' && 'confidence' in data && typeof data.confidence === 'number') {
                return { acreage: data.spread, confidence: data.confidence };
            }
            else {
                // Throw an error here, but for now return a static value.
                console.log(response);
                return { acreage: 50, confidence: 50 };
            }
        })
        .catch((error: AxiosError) => {
            // We'll need to show an error here. But for now, we'll return a static value.
            console.log(error);
            return { acreage: 50, confidence: 0.50 };
        })
        .finally(() => {
            return { acreage: 50}
        })
}