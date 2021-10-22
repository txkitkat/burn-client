import http from "../http-common";

class BurnService {
    getAll(param: any[]) {
        // @ts-ignore
        return http.get(process.env.REACT_APP_FIRE_BACKEND);
    }

    getBySource(source : any[]){
        return http.get(`/fires/search/findBySource?source=${source[0]}`);

    }

    getByCounty(county : any[]){
        return http.get(`/fires/search/findByCounty?county=${county[0]}`);
    }

    getByBurntype(type : any[]){
        return http.get(`/fires/search/findByBurnType?burnType=${type[0]}`);

    }

    getByYear(year : any[]){
        return http.get(`/fires/search/findByYear?year=${year[0]}`);

    }

    getByAcres(acres : any[]){
        return http.get(`/fires/search/findByAcres?acres=${acres[0]}`);

    }
}

export default new BurnService();