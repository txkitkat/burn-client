import http from "../http-common";

class BurnService {

     host = process.env.REACT_APP_FIRE_BACKEND;

    getAll(param: any[]) {
        // @ts-ignore
        console.log(this.host+`/fires`);
        return http.get(this.host+`/fires`);
    }

    getBySource(source : any[]){
        return http.get(this.host+`/fires/search/findBySource?source=${source[0]}`);

    }

    getByCounty(county : any[]){
        return http.get(this.host+`/fires/search/findByCounty?county=${county[0]}`);
    }

    getByBurntype(type : any[]){
        return http.get(this.host+`/fires/search/findByBurnType?burnType=${type[0]}`);

    }

    getByYear(year : any[]){
        return http.get(this.host+`/fires/search/findByYear?year=${year[0]}`);

    }

    getByRangeOfYears(years: any[]){
        return http.get(this.host+`/fires/search/findByYearIsBetween?fromYear=${years[0]}&toYear=${years[1]}`)
    }

    getByAcres(acres : any[]){
        return http.get(this.host+`/fires/search/findByAcres?acres=${acres[0]}`);

    }

    getByRangeOfAcres(acres : any[]){
        return http.get(this.host+`/fires/search/findByAcresIsBetween?min=${acres[0]}&max=${acres[1]}`);

    }

    getByDates(dates : any[]){
        return http.get(this.host+`/fires/search/findByDateIsBetween?fromDate=${dates[0]}&toDate=${dates[1]}`);

    }
}

export default new BurnService();