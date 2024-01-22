import axios from "axios";

const API_URL = "https://localhost:7202/api/PhieuDangKi/";

class PhieuDangKiService {
  getAll() {
    return axios.get(`${API_URL}GetAll`);
  }
  xetDuyetPhieuDangKy(id, updatedPhieuDangKy) {
    const url = `${API_URL}XetDuyetPhieuDangKy/${id}`;
    return axios.post(url, updatedPhieuDangKy);
  }

  UpdateNhanVien(iD_PhieuDangKi, iD_NhanVien) {
    return axios.post(`${API_URL}ThemNhanVienChoPhieuDangKi`, {
      iD_PhieuDangKi,
      iD_NhanVien,
    });
  }
}

export default new PhieuDangKiService();
