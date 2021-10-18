import http from "../http-common";

class BurnService{

    getAll(){
        return http.get("/fires");
    }
}

export default new BurnService();