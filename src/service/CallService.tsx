import BurnService from "./burnService";

function callService(methodName : string, params : any[]){
    switch(methodName){
        case "all" : return BurnService.getAll(params);
        case "source" : return BurnService.getBySource(params);
        case "county" : return BurnService.getByCounty(params);
        case "acres" : return BurnService.getByAcres(params);
        case "acreRange" : return BurnService.getByRangeOfAcres(params);
        case "year" : return BurnService.getByYear(params);
        case "yearRange" : return BurnService.getByRangeOfYears(params);
        case "burnType" : return BurnService.getByBurntype(params);
        case "dates" : return BurnService.getByDates(params);
    }
} 

export default callService;