import http from "../http-common";

class BurnService {
    getAll(param: any[]) {
        // @ts-ignore
        return http.get(`/fires`);
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

    getByRangeOfYears(years: any[]){
        return http.get(`/fires/search/findByYearIsBetween?fromYear=${years[0]}&toYear=${years[1]}`)
    }

    getByAcres(acres : any[]){
        return http.get(`/fires/search/findByAcres?acres=${acres[0]}`);

    }

    getByRangeOfAcres(acres : any[]){
        return http.get(`/fires/search/findByAcresIsBetween?min=${acres[0]}&max=${acres[1]}`);

    }

    getByDates(dates : any[]){
        return http.get(`/fires/search/findByDateIsBetween?fromDate=${dates[0]}&toDate=${dates[1]}`);

    }
}

export default new BurnService();