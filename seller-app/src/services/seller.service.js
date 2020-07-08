import http from "../http-common";

class SellerDataService {
    getAll() {
        return http.get(`/sellers`);
    }

    get(id) {
        return http.get(`/sellers/${id}`);
    }

    create(data) {
        return http.post(`/sellers`, data);
    }

    delete(id) {
        return http.delete(`/sellers/${id}`);
    }
}

export default new SellerDataService();