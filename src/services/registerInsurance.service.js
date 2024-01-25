import axios from "axios";

const API_URL = `${process.env.REACT_APP_URL_API}/api/PhieuDangKi/`;

class RegisterInsuranceService {
  dangKyBaoHiem(requestData) {
    const url = `${API_URL}DangKyBaoHiem`;
    return axios.post(url, requestData);
  }
}

export default new RegisterInsuranceService();
