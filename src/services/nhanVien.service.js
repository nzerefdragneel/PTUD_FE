import axios from 'axios';
//phonghoc@i91
const API_URL = `https://localhost:7202/api/NhanVien/`;

class NhanVienService {
    getAllNhanVien() {
        return axios.get(`${API_URL}GetAllNV`);
    }
}

export default new NhanVienService();
