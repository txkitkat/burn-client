import http from "../http-common";

class BurnService {
    getAll() {
        // @ts-ignore
        return http.get(process.env.REACT_APP_FIRE_BACKEND);
    }
}

export default new BurnService();