import axios from "axios";

const API_URL = `https://localhost:7202/api/LichSuChiTra/`;

class LichSuChiTraService {
    getAllLichSuChiTra() {
        return axios.get(`${API_URL}GetAll`);
    }

    getLichSuChiTraById(id) {
        return axios.get(`${API_URL}GetById?id=${id}`);
    }

    getLichSuChiTraByIdYeuCauChiTra(idycct) {
        return axios.get(`${API_URL}GetByIdYeuCauChiTra?idycct=${idycct}`);
    }

    themLichSuChiTra(addLichSuChiTraDTO) {
        return axios.post(`${API_URL}ThemLichSuChiTra`, addLichSuChiTraDTO);
    }
}

export default new LichSuChiTraService();