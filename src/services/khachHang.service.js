import axios from 'axios';
//phonghoc@i91
// const API_URL = `${process.env.REACT_APP_SERVICE_URL}/api/GoiBaoHiem/GetAll`;
const LOCAL_JSON_URL = 'http://localhost:3001';
class KhachHangService {
    getById(id) {
        return axios.get(`${LOCAL_JSON_URL}?ID_TaiKhoan=${id}`);
    }
}

export default new KhachHangService();
