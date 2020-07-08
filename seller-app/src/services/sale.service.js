import http from "../http-common";

class SaleDataService {
    get(id) {
        return http.get(`/sales/${id}`)
    }

    create(data) {
        return http.post(`/sales/`, data)
    } 

    delete(id) {
        return http.delete(`/sales/${id}`)
    } 
}

export default new SaleDataService();