import axios from "axios";
//phonghoc@i91
const API_URL = `https://localhost:7202/api/NhanVien/`;

class NhanVienService {
  getAllNhanVien() {
    return axios.get(`${API_URL}GetAllNV`);
  }
  getNhanVien(iD_TaiKhoan) {
    return axios.get(`${API_URL}GetByIdTaiKhoan?idtk=${iD_TaiKhoan}`);
  }
  getCurrentNhanVien() {
    return JSON.parse(localStorage.getItem("nhanvien"));
  }
  addNhanVien(requestData) {
    return axios.post(`${API_URL}ThemNhanVien`, requestData);
  }
}

export default new NhanVienService();
