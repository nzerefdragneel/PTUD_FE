import axios from "axios";

const API_URL = "https://localhost:7202/api/ChiTietChinhSach/";

class ChiTietChinhSachService {
  getByIdGoiBaoHiem(idGoiBaoHiem) {
    return axios.get(
      `${API_URL}GetByIdGoiBaoHiem?idGoiBaoHiem=${idGoiBaoHiem}`
    );
  }
  voHieuHoaChinhSach(id, ngayKetThuc) {
    return axios.post(`${API_URL}VoHieuHoaChiTietChinhSach`, {
      id,
      ngayKetThuc,
    });
  }
  ThemChinhSachChoGoiBaoHiem(iD_GoiBaoHiem, iD_ChinhSach, ngayBatDau) {
    return axios.post(`${API_URL}ThemChinhSachChoGoiBaoHiem`, {
      iD_GoiBaoHiem,
      iD_ChinhSach,
      ngayBatDau,
    });
  }
}

export default new ChiTietChinhSachService();
