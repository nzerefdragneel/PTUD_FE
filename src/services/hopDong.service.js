import axios from "axios";
//phonghoc@i91
const API_URL = `https://localhost:7202/api/HopDong/`;
class HopDongService {
  getAll() {
    return axios.get(`${API_URL}GetAll`);
  }
  getByIdKhachHang(id) {
    return axios.get(`${API_URL}GetByIdKh?idkh=${id}`);
  }
  getByIdHopDong(id) {
    return axios.get(`${API_URL}GetById?id=${id}`);
  }
  XacDinhGiaTriHopDong(id, price) {
    return axios.post(`${API_URL}XacDinhGiaTriHopDong`, {
      id,
      price,
    });
  }
}

export default new HopDongService();
