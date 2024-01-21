import axios from 'axios';

const API_URL = 'https://localhost:7202/api/SendEmail/SendMail';

class SendEmail {
    SendEmail(iD_KhachHang, chuDe, noiDung) {
        return axios.post(`${API_URL}?idKH=${iD_KhachHang}&chuDe=${chuDe}&noiDung=${noiDung}`);
    }
}

export default new SendEmail();
