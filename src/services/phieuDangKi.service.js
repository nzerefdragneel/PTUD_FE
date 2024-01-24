import axios from "axios";

const API_URL = "https://localhost:7202/api/PhieuDangKi/";

class PhieuDangKiService {
  getAll() {
    return axios.get(`${API_URL}GetAll`);
  }
  xetDuyetPhieuDangKy(id, tinhTrang) {
    const url = `${API_URL}XetDuyetPhieuDangKy?id=${id}&tinhTrangDuyet=${tinhTrang}`;
    return axios.post(url);
  }

  UpdateNhanVien(iD_PhieuDangKi, iD_NhanVien) {
    return axios.post(`${API_URL}ThemNhanVienChoPhieuDangKi`, {
      iD_PhieuDangKi,
      iD_NhanVien,
    });
  }
  GetbyKH(id) {
    const url = `${API_URL}GetByIdKhachHang?idkh=${id}`;
    return axios.get(url);
  }
}

export default new PhieuDangKiService();
