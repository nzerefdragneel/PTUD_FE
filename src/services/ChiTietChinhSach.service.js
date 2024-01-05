import axios from 'axios';

const API_URL = 'https://localhost:7202/api/ChiTietChinhSach/GetAllChitietchinhsach/';

class ChiTietChinhSachService {
    getChiTietChinhSach(id) {
        return axios.get(`${API_URL}idGoiBaoHiem?idGoiBaoHiem=${id}`);
    }
    getById(idGoiBaoHiem) {
        return axios.get(`${API_URL}?idGoiBaoHiem=${idGoiBaoHiem}`);
    }
}

export default new ChiTietChinhSachService();
