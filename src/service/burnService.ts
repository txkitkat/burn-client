import http from "../http-common";
import IFire from "../types/fireType";
import IFireStat from "../types/statType";
import {IFiltersInteracted, IFiltersState} from "../components/Drawer/Filters";
import axios from "axios";

const host: any = process.env.REACT_APP_FIRE_BACKEND;
const windowHost: any = process.env.REACT_APP_FIRE_WINDOW_BACKEND;

console.log(host);

interface IServerResp {
    _embedded: {
        fires: IFire[]
    }
}

/*getFiresByFilters() getAllPrescribedFires() and getFireStatistics()  are the main service methods used
retaining the signatures for the remaining methods for possible future applications*/

export async function getAllFires(): Promise<IFire[]> {
    return (await http.get<IFire[]>(`${host}/fires`)).data;
}

export async function getAllPrescribedFires(){
    return (await http.get<IServerResp>(`${host}/fires/search/findByFireType?fireType=PRESCRIBED%20FIRE`)).data._embedded.fires;
}

export async function getAllEscapedFires(){
    return (await http.get<IServerResp>(`${host}/fires/search/findByEscapedTrue`)).data._embedded.fires;
}

export async function getFiresBySource(source: string) {
    return (await http.get<IServerResp>(`${host}/fires/search/findBySource?source=${source}`)).data._embedded.fires;
}

export async function getFiresByCounty(county: string) {
    return (await http.get<IServerResp>(`${host}/fires/search/findByCounty?county=${county}`)).data._embedded.fires;
}

export async function getFiresByBurnType(type: string) {
    return (await http.get<IServerResp>(`${host}/fires/search/findByBurnType?burnType=${type}`)).data._embedded.fires;
}

export async function getFiresByYear(year: number) {
    return (await http.get<IServerResp>(`${host}/fires/search/findByYear?year=${year}`)).data._embedded.fires;
}

export async function getFiresByRangeOfYears(fromYear: number, toYear: number) {
    return (await http.get<IServerResp>(`${host}/fires/search/findByYearIsBetween?fromYear=${fromYear}&toYear=${toYear}`)).data._embedded.fires;
}

export async function getFiresByAcres(acres: number) {
    return (await http.get<IServerResp>(`${host}/fires/search/findByAcres?acres=${acres}`)).data._embedded.fires;
}

export async function getFiresByRangeOfAcres(lower: number, upper: number): Promise<IFire[]> {
    return (await http.get<IServerResp>(`${host}/fires/search/findByAcresIsBetween?min=${lower}&max=${upper}`)).data._embedded.fires;
}

export async function getFiresByOwner(owner: String) {
    return (await http.get<IServerResp>(`${host}/fires/search/findByOwner?owner=${owner}`)).data._embedded.fires;
}

export async function getFiresBySeverity(lower: number, upper: number) {
    return (await http.get<IServerResp>(`${host}/fires/search/findBySeverityBetween?min=${lower}&max=${upper}`)).data._embedded.fires;
}

export async function getFiresByFilters(filterState: IFiltersState, interactedFilters: IFiltersInteracted) {
    let query = `${host}/query?`;

    for (const key in filterState) {
        // @ts-ignore
        if (interactedFilters[key]) {
            if (key === "fireType"){
                switch (filterState[key]) {
                    case "PRESCRIBED":
                        query += 'fireType=PRESCRIBED%20FIRE&';
                        break;
                    case "WILDFIRE":
                        query += 'fireType=WILDFIRE&';
                        break;
                    case "WILDLAND FIRE USE":
                        query += 'fireType=WILDLAND%20FIRE%20USE&';
                        break;
                    case "UNKNOWN":
                        query += 'fireType=UNKNOWN&';
                        break;
                    case "ALL":
                        break;
                    default:
                        break;
                }
            }else{
            // @ts-ignore
            query += `${key}=${filterState[key]}&`;
            }
        }
    }
    query = query.slice(0, -1);
    console.log(query);
    let resp = await http.get<IServerResp>(query);

    console.log(resp)

    return resp.data._embedded.fires;
}

export async function downloadFireWindow(startDate: number, endDate: number) {
    let downloadQuery = `${windowHost}/query?start_date=${startDate}&end_date=${endDate}`
    console.log(downloadQuery);
    let resp = await axios({
        url: downloadQuery,
        method: "GET",
        responseType: "blob"
    });
    console.log(resp)

    return resp;
}
export async function query_counties(startDate: number, endDate: number) {
    let query = `${windowHost}/county?start_date=${startDate}&end_date=${endDate}`
    console.log(query);
    let resp = await http.get<string[]>(query);

    return resp;
}

export async function getFireStatistics(filterState: IFiltersState, interactedFilters: IFiltersInteracted) {
    let statQuery = `${host}/statistics?`;

    for (const key in filterState) {
        // @ts-ignore
        if (interactedFilters[key]) {
            if (key === "fireType"){
                switch (filterState[key]) {
                    case "PRESCRIBED":
                        statQuery += 'fireType=PRESCRIBED%20FIRE&';
                        break;
                    case "WILDFIRE":
                        statQuery += 'fireType=WILDFIRE&';
                        break;
                    case "WILDLAND FIRE USE":
                        statQuery += 'fireType=WILDLAND%20FIRE%20USE&';
                        break;
                    case "UNKNOWN":
                        statQuery += 'fireType=UNKNOWN&';
                        break;
                    case "ALL":
                        break;
                    default:
                        break;
                }
            }else{
            // @ts-ignore
            statQuery += `${key}=${filterState[key]}&`;
            }
        }
    }
    statQuery = statQuery.slice(0, -1);
    console.log(statQuery);
    let resp = await http.get<IFireStat>(statQuery);

    console.log(resp)

    return resp.data;
}
