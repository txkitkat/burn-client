import http from "../http-common";
import IFire from "../types/fireType";
import IFireStat from "../types/statType";
import {IFiltersInteracted, IFiltersState} from "../components/Drawer/Filters";

const host: any = process.env.REACT_APP_FIRE_BACKEND;

console.log(host);

interface IServerResp {
    _embedded: {
        fires: IFire[]
    }
}

export async function getAllFires(): Promise<IFire[]> {
    return (await http.get<IFire[]>(`${host}/fires`)).data;
}

export async function getAllPrescribedFires(){
    return (await http.get<IServerResp>(`${host}/fires/search/findByEscapedFalse`)).data._embedded.fires;
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
            // @ts-ignore
            query += `${key}=${filterState[key]}&`;
        }
    }
    query = query.slice(0, -1);
    let resp = await http.get<IServerResp>(query);

    console.log(resp)

    return resp.data._embedded.fires;
}

export async function getFireStatistics(filterState: IFiltersState, interactedFilters: IFiltersInteracted) {
    let statQuery = `${host}/statistics?`;

    for (const key in filterState) {
        // @ts-ignore
        if (interactedFilters[key]) {
            // @ts-ignore
            statQuery += `${key}=${filterState[key]}&`;
        }
    }
    statQuery = statQuery.slice(0, -1);
    let resp = await http.get<IFireStat>(statQuery);

    console.log(resp)

    return resp.data;
}
