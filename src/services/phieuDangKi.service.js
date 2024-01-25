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

  UpdateNhanVien(requestData) {
    const api = `${API_URL}ThemNhanVienChoPhieuDangKi`;
    return axios.post(api, requestData);
  }
  GetbyKH(id) {
    const url = `${API_URL}GetByIdKhachHang?idkh=${id}`;
    return axios.get(url);
  }
  GetByIdNhanVien(idnv) {
    const url = `${API_URL}GetByIdNhanVien?idnv=${idnv}`;
    return axios.get(url);
  }
}

export default new PhieuDangKiService();
