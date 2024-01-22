import axios from "axios";

const API_URL = "https://localhost:7202/api/ChinhSach/";

class PhatHanhCSService {
  getAll() {
    return axios.get(`${API_URL}GetAll`);
  }
  addChinhSach(newChinhSachData) {
    return axios.post(`${API_URL}ThemChinhSach`, newChinhSachData);
  }

  // And so on for delete, getById, etc.
}

export default new PhatHanhCSService();
