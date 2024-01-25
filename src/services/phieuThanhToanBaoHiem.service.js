import axios from "axios";

const API_URL = "https://localhost:7202/api/PhieuThanhToanBaoHiem/";

class PhieuThanhToanBaoHiemService {
  getGoiBaoHiemChuaThanhToan(soNgay) {
    return axios.get(`${API_URL}GetPhieuThanhToanDenHan?soNgay=${soNgay}`);
  }
  getByIdHopDong(id) {
    return axios.get(`${API_URL}GetByIdHopDong?idhd=${id}`);
  }

  ThemPhieuThanhToanBaoHiem(
    ngayThanhToan,
    hinhThucThanhToan,
    soTien,
    iD_HopDong
  ) {
    return axios.post(`${API_URL}ThemPhieuThanhToanBaoHiem`, {
      ngayThanhToan,
      hinhThucThanhToan,
      soTien,
      iD_HopDong,
    });
  }
  XetDuyetPhieuThanhToan(iD_PhieuThanhToan, tinhTrangDuyet) {
    return axios.post(
      `${API_URL}XetDuyetPhieuThanhToan/${iD_PhieuThanhToan}?tinhTrangDuyet=${tinhTrangDuyet}`
    );
  }
}

export default new PhieuThanhToanBaoHiemService();
