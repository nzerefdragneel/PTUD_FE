import axios from 'axios';

const API_URL = 'https://localhost:7202/api/YeuCauTuVan/';

class YeuCauTuVanService {
    getAll() {
        return axios.get(`${API_URL}GetAll`);
    }
    DatLichTuVan(iD_KhachHang, diaDiem, thoiGian) {
        return axios.post(`${API_URL}DatLichTuVan`, {
            iD_KhachHang,
            diaDiem,
            thoiGian,
        });
    }
    UpdateNhanVien(iD_YeuCauTuVan, iD_NhanVien) {
        return axios.post(`${API_URL}UpdateNhanVien`, {
            iD_YeuCauTuVan,
            iD_NhanVien,
        });
    }
}

export default new YeuCauTuVanService();
