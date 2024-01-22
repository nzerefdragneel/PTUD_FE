import axios from "axios";
//phonghoc@i91
const API_URL = `https://localhost:7202/api/KhachHang/`;

class KhachHangService {
  getById(id) {
    return axios.get(`${API_URL}id?id=${id}`);
  }
  getAll() {
    return axios.get(`${API_URL}GetAll`);
  }
  getByIdTaiKhoan(id) {
    return axios.get(`${API_URL}GetByIdTaiKhoan?idtk=${id}`);
  }
}

export default new KhachHangService();
