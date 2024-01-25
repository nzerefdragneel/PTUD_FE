import axios from "axios";

const API_URL =
  "https://localhost:7202/api/ChiTietChinhSach/GetAllChitietchinhsach/";

class ChinhSachService {
  getAll() {
    return axios.get(`https://localhost:7202/api/ChinhSach/GetAll`);
  }
  getChinhSach(id) {
    axios
      .get(`${API_URL}idGoiBaoHiem?idGoiBaoHiem=${id}`, {
        headers: {
          "Cache-Control": "no-cache",
          "Content-Type": "application/x-www-form-urlencoded",
          "Access-Control-Allow-Origin": "*",
        },
        mode: "no-cors",
      })
      .then((res) => {
        return res.data.TenChinhSach;
      })
      .catch((err) => {
        return "";
      });
  }
  getById(idGoiBaoHiem) {
    return axios.get(`${API_URL}?idGoiBaoHiem=${idGoiBaoHiem}`);
  }
  getByIdCS(id) {
    return axios.get(`https://localhost:7202/api/ChinhSach/GetById?id=${id}`);
  }
}

export default new ChinhSachService();
