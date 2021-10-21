import BurnService from "./burnService";

function callService(methodName : string, params : any[]){
    switch(methodName){
        case "all" : return BurnService.getAll(params);
        case "source" : return BurnService.getBySource(params);
        case "county" : return BurnService.getByCounty(params);
        case "acres" : return BurnService.getByAcres(params);
        case "year" : return BurnService.getByYear(params);
        case "burnType" : return BurnService.getByBurntype(params);
    }
} 

export default callService;