import http from "../http-common";
import IFire from "../types/fireType";

const host = process.env.REACT_APP_FIRE_BACKEND;

console.log(host);

interface IServerResp {
    _embedded: {
        fires: IFire[]
    }
}

export async function getAllFires(): Promise<IFire[]> {
    return (await http.get<IFire[]>(host + `/fires`)).data;
}

export async function getFiresBySource(source: string) {
    return (await http.get<IServerResp>(host + `/fires/search/findBySource?source=${source}`)).data._embedded.fires;
}

export async function getFiresByCounty(county: string) {
    return (await http.get<IServerResp>(host + `/fires/search/findByCounty?county=${county}`)).data._embedded.fires;
}

export async function getFiresByBurnType(type: string) {
    return (await http.get<IServerResp>(host + `/fires/search/findByBurnType?burnType=${type}`)).data._embedded.fires;
}

export async function getFiresByYear(year: number) {
    return (await http.get<IServerResp>(host + `/fires/search/findByYear?year=${year}`)).data._embedded.fires;
}

export async function getFiresByRangeOfYears(fromYear: number, toYear: number) {
    return (await http.get<IServerResp>(host + `/fires/search/findByYearIsBetween?fromYear=${fromYear}&toYear=${toYear}`)).data._embedded.fires;
}

export async function getFiresByAcres(acres: number) {
    return (await http.get<IServerResp>(host + `/fires/search/findByAcres?acres=${acres}`)).data._embedded.fires;
}

export async function getFiresByRangeOfAcres(lower: number, upper: number): Promise<IFire[]> {
    return (await http.get<IServerResp>(host + `/fires/search/findByAcresIsBetween?min=${lower}&max=${upper}`)).data._embedded.fires;
}

export async function getFiresByDates(fromDate: String, toDate: String) {
    return (await http.get<IServerResp>(host + `/fires/search/findByDateIsBetween?fromDate=${fromDate}&toDate=${toDate}`)).data._embedded.fires;
}
