import axios from "axios";
//phonghoc@i91
const API_URL = `https://localhost:7202/api/HopDong/`;
class HopDongService {
  getByIdKhachHang(id) {
    return axios.get(`${API_URL}GetByIdKh?idkh=${id}`);
  }
  getByIdHopDong(id) {
    return axios.get(`${API_URL}GetByIdKh?idkh=${id}`);
  }
  taoHopDong(iD_PhieuDangKi) {
    return axios.post(`${API_URL}HopDong?idPDK=${iD_PhieuDangKi}`);
  }
}

export default new HopDongService();
