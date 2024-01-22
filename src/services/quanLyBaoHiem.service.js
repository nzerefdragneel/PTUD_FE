import axios from "axios";

const API_URL = "https://localhost:7202/api/QuanLyBaoHiem/";

class QuanLyBaoHiemService {
  getByIDKH(id) {
    return axios.get(`${API_URL}GetByIdKhachHang?idkh=${id}`);
  }
}

export default new QuanLyBaoHiemService();
