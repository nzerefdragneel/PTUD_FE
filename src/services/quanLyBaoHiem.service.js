import axios from "axios";

const API_URL = "https://localhost:7202/api/QuanLyBaoHiem/";

class QuanLyBaoHiemService {
  getByIDKH(id) {
    return axios.get(`${API_URL}GetByIdKhachHang?idkh=${id}`);
  }
 
  capNhatHanMucSuDung(qlbhid, soTienYeuCauChiTra) {
    const queryString = `id=${qlbhid}&HanMucSuDung=${soTienYeuCauChiTra}`;
    return axios.post(`${API_URL}CapNhatHanMucSuDung?${queryString}`);
  }

  quanLyBaoHiem(data) {
    return axios.post(`${API_URL}QuanLyBaoHiem`, data);
  }
  
}

export default new QuanLyBaoHiemService();
