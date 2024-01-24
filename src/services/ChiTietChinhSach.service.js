import axios from "axios";

const API_URL = "https://localhost:7202/api/ChiTietChinhSach/";

class ChiTietChinhSachService {
  getByIdGoiBaoHiem(idGoiBaoHiem) {
    return axios.get(
      `${API_URL}GetByIdGoiBaoHiem?idGoiBaoHiem=${idGoiBaoHiem}`
    );
  }
}

export default new ChiTietChinhSachService();
