// import axios from "axios"; // Assuming axios is imported elsewhere in your project
import axios from "axios";
const API_URL = "https://localhost:7202/api/YeuCauTuVan/";

class YeuCauTuVanService {
  getAll() {
    return axios.get(`${API_URL}GetAll`);
  }

  GetByIdNhanVien(idnv) {
    return axios.get(`${API_URL}GetByIdNhanVien?idnv=${idnv}`);
  }

  DatLichTuVan(iD_KhachHang, diaDiem, thoiGian) {
    return axios.post(`${API_URL}DatLichTuVan`, {
      iD_KhachHang,
      diaDiem,
      thoiGian,
    });
  }

  UpdateNhanVien(iD_YeuCauTuVan, iD_NhanVien) {
    return axios.post(`${API_URL}UpdateNhanVien`, {
      iD_YeuCauTuVan,
      iD_NhanVien,
    });
  }

  getByIdKhachHang(idKhachHang) {
    return axios.get(`${API_URL}GetByIdKhachHang`, {
      params: { idkh: idKhachHang },
    });
  } // Added closing parenthesis here

  UpdateTinhTrangDuyet(iD_YeuCauTuVan, tinhTrangDuyet) {
    return axios.post(
      `${API_URL}UpdateTinhTrangDuyet?id=${iD_YeuCauTuVan}&tinhTrangDuyet=${tinhTrangDuyet}`
    );
  }
}

export default new YeuCauTuVanService();
