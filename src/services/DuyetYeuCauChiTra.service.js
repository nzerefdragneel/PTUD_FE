import axios from 'axios';

const API_URL = 'https://localhost:7202/api/YeuCauChiTra/';

class DuyetYeuCauChiTraService {
    getAll() {
        return axios.get(`${API_URL}GetAll`);
    }

    duyetYeuCauChiTra(iD_YeuCauChiTra, tinhTrangDuyet) {
        return axios.post(
            `${API_URL}DuyetYeuCauChiTra`,
            {
                iD_YeuCauChiTra,
                tinhTrangDuyet
            }
        );
    }
}

export default new DuyetYeuCauChiTraService();