import axios from 'axios';

const API_URL = 'https://localhost:7202/api/ChiTietChinhSach/GetAllChitietchinhsach';

class ChinhSachService {
    getById(idGoiBaoHiem) {
        return axios.get(`${API_URL}?idGoiBaoHiem=${idGoiBaoHiem}`);
    }
}

export default new ChinhSachService();
