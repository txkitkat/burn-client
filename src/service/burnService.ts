import http from "../http-common";

class BurnService {
    getAll() {
        // @ts-ignore
        return http.get(process.env.REACT_APP_FIRE_BACKEND);
    }

    getBySource(source : String){

        return http.get(`/fires/search/findBySource?source=${source}`);

    }

    getByCounty(county : String){
        return http.get(`/fires/search/findByCounty?county=${county}`);
    }

    getByBurntype(type : String){
        return http.get(`	
        /fires/search/findByBurntype?burntype=${type}`);

    }

    getByYear(year : number){
        return http.get(`/fires/search/findByYear?year=${year}`);

    }

    getByAcres(acres : number){
        return http.get(`/fires/search/findByAcres?acres=${acres}`);

    }
}

export default new BurnService();