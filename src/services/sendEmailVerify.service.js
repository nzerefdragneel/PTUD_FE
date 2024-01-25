import axios from "axios";

const API_URL = "https://localhost:7202/api/SendEmailVerify/";

class SendEmailVerifyService {
  SendEmail(iD_KhachHang, email) {
    return axios.post(`${API_URL}SendMail?email=${email}&idkh=${iD_KhachHang}`);
  }
}

export default new SendEmailVerifyService();
